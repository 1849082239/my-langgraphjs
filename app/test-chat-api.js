/**
 * 测试脚本：直接测试 /api/chat 接口
 * 使用方法：node test-chat-api.js
 */

const TEST_MESSAGE = '你好，请介绍一下自己'
const SESSION_ID = `test-${Date.now()}`

async function testChatAPI() {
  console.log('🧪 开始测试 /api/chat 接口')
  console.log('📝 测试消息:', TEST_MESSAGE)
  console.log('🆔 Session ID:', SESSION_ID)
  console.log('---\n')

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: TEST_MESSAGE, 
        sessionId: SESSION_ID 
      })
    })

    console.log('📥 Response status:', response.status)
    console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))
    console.log('---\n')

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ 请求失败:', response.status, errorText)
      return
    }

    if (!response.body) {
      console.error('❌ Response body is null')
      return
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    console.log('📖 开始读取流式响应...\n')

    let fullResponse = ''
    let chunkCount = 0

    while (true) {
      const { value, done } = await reader.read()
      
      if (done) {
        console.log('\n✅ 流式响应完成')
        break
      }

      const chunk = decoder.decode(value, { stream: true })
      chunkCount++
      
      console.log(`📦 [第 ${chunkCount} 个块] 原始数据:`, JSON.stringify(chunk))
      
      const events = chunk.split('\n\n').filter(Boolean)
      
      for (const event of events) {
        const data = event.replace('data: ', '').trim()
        console.log(`📨 解析后的数据:`, data)
        
        try {
          const parsed = JSON.parse(data)
          
          if (parsed.type === 'chunk') {
            fullResponse += parsed.content
            console.log(`💬 当前回复:`, fullResponse.substring(0, 100) + (fullResponse.length > 100 ? '...' : ''))
          } else if (parsed.type === 'error') {
            console.error('❌ 服务器错误:', parsed.message)
          } else if (parsed.type === 'end') {
            console.log('🏁 收到结束信号')
          }
        } catch (e) {
          console.error('❌ JSON 解析失败:', e)
        }
      }
    }

    console.log('\n=== 最终结果 ===')
    console.log('✅ 完整回复:', fullResponse || '(无内容)')
    console.log('==================\n')
    
  } catch (error) {
    console.error('❌ 测试失败:', error)
    if (error instanceof Error) {
      console.error('Stack:', error.stack)
    }
  }
}

// 运行测试
console.log('🚀 启动测试...\n')
testChatAPI()
