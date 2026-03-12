import { ChatOpenAI } from '@langchain/openai'
import { StringOutputParser } from '@langchain/core/output_parsers'

// 千问 API 配置 (DashScope OpenAI 兼容)
const model = new ChatOpenAI({
  model: 'qwen-plus',
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  streaming: true,
  temperature: 0.7
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
    response: ''
  }
}

async function* generateResponse(state: ChatState) {
  // Build messages for API
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT }
  ]
  
  // Add conversation history
  for (const msg of state.conversation) {
    messages.push({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    })
  }

  // Add current message
  messages.push({ role: 'user', content: state.inputMessage })

  // Call Qwen API with streaming
  const stream = await model.bind({ }).stream(messages)

  let fullResponse = ''

  for await (const chunk of stream) {
    const content = chunk.content || ''
    if (content) {
      fullResponse += content
      yield {
        ...state,
        response: fullResponse,
        fullResponse: fullResponse
      }
    }
  }
}

async function processResponseChunks(state: ChatState) {
  for await (const chunk of generateResponse(state)) {
    yield chunk
  }
}

async function saveResponse(state: ChatState) {
  return {
    ...state,
    conversation: [...state.conversation, { role: 'assistant', content: state.fullResponse }]
  }
}

const workflow = new (await import('@langchain/langgraph')).StateGraph<ChatState>()
  .addNode('appendMessage', appendMessage)
  .addNode('processResponseChunks', processResponseChunks)
  .addNode('saveResponse', saveResponse)
  .addEdge('__start__', 'appendMessage')
  .addEdge('appendMessage', 'processResponseChunks')
  .addEdge('processResponseChunks', 'saveResponse')

const app = workflow.compile()

export async function POST(req: Request) {
  const { message, sessionId } = await req.json()

  const initialState: ChatState = {
    sessionId,
    inputMessage: message,
    conversation: [],
    response: '',
    fullResponse: ''
  }

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of app.stream(initialState)) {
          if (event.processResponseChunks?.response) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({
                type: 'chunk',
                content: event.processResponseChunks.response
              })}\n\n`)
            )
          }
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: 'end' })}\n\n`)
        )
      } catch (error) {
        console.error('Error:', error)
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({
            type: 'error',
            message: error instanceof Error ? error.message : 'Failed to generate response'
          })}\n\n`)
        )
      } finally {
        controller.close()
      }
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}
