import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages'
import { Annotation } from '@langchain/langgraph'

// 千问 API 配置 (DashScope OpenAI 兼容)
const model = new ChatOpenAI({
  modelName: 'qwen-flash',
  apiKey: process.env.DASHSCOPE_API_KEY,
  configuration: {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1'
  },
  streaming: true,
  temperature: 0.7
})

// 定义状态注解
const ChatStateAnnotation = Annotation.Root({
  sessionId: Annotation<string>,
  inputMessage: Annotation<string>,
  conversation: Annotation<Array<{role: 'user' | 'assistant', content: string}>>,
  response: Annotation<string>,
  fullResponse: Annotation<string>
})

interface ChatState {
  sessionId: string
  inputMessage: string
  conversation: Array<{role: 'user' | 'assistant', content: string}>
  response: string
  fullResponse: string
}

const SYSTEM_PROMPT = `You are a helpful AI assistant. Please answer user questions concisely and friendly.`

async function appendMessage(state: ChatState) {
  return {
    ...state,
    conversation: [...state.conversation, { role: 'user', content: state.inputMessage }],
    response: '',
    fullResponse: ''
  }
}

async function generateResponse(state: ChatState): Promise<Partial<ChatState>> {
  // Build messages for API
  const messages: Array<SystemMessage | HumanMessage | AIMessage> = [
    new SystemMessage(SYSTEM_PROMPT)
  ]
  
  // Add conversation history
  for (const msg of state.conversation) {
    if (msg.role === 'user') {
      messages.push(new HumanMessage(msg.content))
    } else {
      messages.push(new AIMessage(msg.content))
    }
  }

  // Add current message
  messages.push(new HumanMessage(state.inputMessage))

  // Call Qwen API with streaming
  const stream = await model.stream(messages)

  let fullResponse = ''

  for await (const chunk of stream) {
    const content = typeof chunk.content === 'string' ? chunk.content : (chunk.content?.[0]?.text || '')
    if (content) {
      fullResponse += content
    }
  }

  return {
    ...state,
    response: fullResponse,
    fullResponse: fullResponse
  }
}

async function processResponseChunks(state: ChatState): Promise<Partial<ChatState>> {
  return generateResponse(state)
}

async function saveResponse(state: ChatState) {
  return {
    ...state,
    conversation: [...state.conversation, { role: 'assistant', content: state.fullResponse }],
    response: '',
    inputMessage: ''
  }
}

const { StateGraph } = await import('@langchain/langgraph')

const workflow = new StateGraph(ChatStateAnnotation)
  .addNode('appendMessage', appendMessage)
  .addNode('processResponseChunks', processResponseChunks)
  .addNode('saveResponse', saveResponse)
  .addEdge('__start__', 'appendMessage')
  .addEdge('appendMessage', 'processResponseChunks')
  .addEdge('processResponseChunks', 'saveResponse')

const app = workflow.compile()

export async function POST(req: Request) {
  console.log('📥 [API] Received chat request')
  
  let requestBody
  try {
    requestBody = await req.json()
    console.log('📝 [API] Request body:', JSON.stringify(requestBody, null, 2))
  } catch (error) {
    console.error('❌ [API] Failed to parse request body:', error)
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { message, sessionId } = requestBody

  console.log('💬 [API] Message:', message)
  console.log('🆔 [API] Session ID:', sessionId)

  if (!message) {
    console.error('❌ [API] No message provided')
    return new Response(
      JSON.stringify({ error: 'No message provided' }), 
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const initialState: ChatState = {
    sessionId,
    inputMessage: message,
    conversation: [],
    response: '',
    fullResponse: ''
  }

  console.log('🚀 [API] Starting LangGraph workflow...')

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        console.log('⏳ [API] Calling app.invoke()...')
        const result: any = await app.invoke(initialState)
        console.log('✅ [API] Got result from LangGraph:', JSON.stringify(result, null, 2))
        
        // 直接使用最终结果中的 response
        if (result?.fullResponse) {
          console.log('📤 [API] Sending fullResponse chunk:', result.fullResponse)
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'chunk',
              content: result.fullResponse
            })}\n\n`)
          )
        } else {
          console.warn('⚠️ [API] No response in result')
        }

        console.log('🏁 [API] Sending end signal')
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'end' })}\n\n`)
        )
      } catch (error) {
        console.error('❌ [API] Error during workflow execution:', error)
        if (error instanceof Error) {
          console.error('❌ [API] Error stack:', error.stack)
        }
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to generate response'
          })}\n\n`)
        )
      } finally {
        console.log('🔒 [API] Closing stream')
        controller.close()
      }
    }
  })

  console.log('📡 [API] Returning stream response')
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
