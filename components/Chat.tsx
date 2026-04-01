'use client'

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { BotanicalBackdrop } from './chat/decorations'
import { ChatHeader } from './chat/header'
import { ChatInputBar } from './chat/input-bar'
import { ChatMessages } from './chat/messages'
import { ChatSidebar } from './chat/sidebar'
import type { ChatMessage, ChatSuggestion } from './chat/types'

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const suggestions: ChatSuggestion[] = [
    { text: 'Help with creative ideas' },
    { text: 'Explain a complex topic' },
    { text: 'Write something for me' },
    { text: 'Answer my questions' }
  ]

  const recentChats = [
    'Project Nova Ideas',
    'v0 Design Feedback',
    'Trip to Tokyo Chat',
    'Writing Prompts'
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedId = localStorage.getItem('session_id') || (crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(36).substring(2)}`)
    localStorage.setItem('session_id', storedId)
    setSessionId(storedId)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }, [input])

  const handleNewChat = () => {
    setMessages([])
    setInput('')
    setError(null)
    const newId = crypto.randomUUID ? crypto.randomUUID() : `session-${Date.now()}-${Math.random().toString(36).substring(2)}`
    localStorage.setItem('session_id', newId)
    setSessionId(newId)
  }

  const submitMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId })
      })

      if (!response.ok || !response.body) {
        const errorText = await response.text()
        throw new Error(`Streaming failed: ${response.status} ${errorText}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''
      let isNewMessage = true

      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const events = chunk.split('\n\n').filter(Boolean)

        for (const event of events) {
          const data = event.replace('data: ', '').trim()
          try {
            const parsed = JSON.parse(data)
            const { type, content, message } = parsed

            if (type === 'chunk') {
              if (isNewMessage) {
                setMessages(prev => [...prev, { role: 'assistant', content: '' }])
                isNewMessage = false
              }
              assistantMessage += content
              setMessages(prev => {
                const newMessages = [...prev]
                newMessages[newMessages.length - 1] = { role: 'assistant', content: assistantMessage }
                return newMessages
              })
            }

            if (type === 'error') {
              throw new Error(message || 'Stream error')
            }
          } catch {
            // Skip parsing errors
          }
        }
      }
    } catch {
      setError('Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void submitMessage()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void submitMessage()
    }
  }

  return (
    <div className="flex h-screen botanical-bg relative overflow-hidden">
      <ChatSidebar
        isOpen={sidebarOpen}
        recentChats={recentChats}
        onClose={() => setSidebarOpen(false)}
        onNewChat={handleNewChat}
      />

      <main className="flex-1 flex min-h-0 flex-col min-w-0 relative z-10">
        <BotanicalBackdrop />

        <ChatHeader
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <div className="relative z-10 flex-1 min-h-0 overflow-y-auto">
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            error={error}
            suggestions={suggestions}
            onSuggestionClick={setInput}
            messagesEndRef={messagesEndRef}
          />
        </div>

        <ChatInputBar
          input={input}
          isLoading={isLoading}
          textareaRef={textareaRef}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        />
      </main>
    </div>
  )
}
