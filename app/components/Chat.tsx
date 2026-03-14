'use client'

import { useState, useEffect, useRef } from 'react'

export default function Chat() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    const storedId = localStorage.getItem('session_id') || (crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(36).substring(2)}`)
    localStorage.setItem('session_id', storedId)
    setSessionId(storedId)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    console.log('🚀 [Frontend] Sending message:', input)
    console.log('🆔 [Frontend] Session ID:', sessionId)

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      console.log('📡 [Frontend] Fetching /api/chat...')
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId })
      })

      console.log('📥 [Frontend] Response status:', response.status, response.ok)

      if (!response.ok || !response.body) {
        const errorText = await response.text()
        console.error('❌ [Frontend] Response error:', errorText)
        throw new Error(`Streaming failed: ${response.status} ${errorText}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''
      let isNewMessage = true

      console.log('📖 [Frontend] Starting to read stream...')

      while (true) {
        const { value, done } = await reader.read()
        
        if (done) {
          console.log('✅ [Frontend] Stream completed')
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        console.log('📦 [Frontend] Received chunk:', chunk)
        
        const events = chunk.split('\n\n').filter(Boolean)

        for (const event of events) {
          const data = event.replace('data: ', '').trim()
          console.log('📨 [Frontend] Parsing event:', data)
          
          try {
            const parsed = JSON.parse(data)
            console.log('✅ [Frontend] Parsed data:', parsed)
            const { type, content, message } = parsed

            if (type === 'chunk') {
              if (isNewMessage) {
                setMessages(prev => [...prev, { role: 'assistant', content: '' }])
                isNewMessage = false
              }
              assistantMessage += content
              setMessages(prev => {
                const newMessages = [...prev]
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantMessage
                }
                return newMessages
              })
              console.log('💬 [Frontend] Updated assistant message:', assistantMessage)
            }

            if (type === 'error') {
              console.error('❌ [Frontend] Error from server:', message)
              throw new Error(message || 'Stream error')
            }
          } catch (e) {
            console.error('❌ [Frontend] Event parsing error:', e)
            console.error('❌ [Frontend] Raw data:', data)
          }
        }
      }
    } catch (err) {
      console.error('❌ [Frontend] Overall error:', err)
      setError('Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
      console.log('🏁 [Frontend] Request finished')
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] message-enter ${
              msg.role === 'user' ? 'ml-auto bg-blue-500 text-white' : 'bg-gray-100'
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="p-3 rounded-lg bg-gray-100 inline-block">
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-1"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-2"></span>
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-3"></span>
            </div>
          </div>
        )}
        {error && (
          <div className="p-3 rounded-lg bg-red-50 text-red-700 animate-shake">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="border-t pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex space-x-1">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce-1"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce-2"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce-3"></span>
              </div>
            ) : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
}