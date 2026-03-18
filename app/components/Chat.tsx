'use client'

import { useState, useEffect, useRef } from 'react'

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
    </svg>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
    </svg>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user' as const, content: input }
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
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantMessage
                }
                return newMessages
              })
            }

            if (type === 'error') {
              throw new Error(message || 'Stream error')
            }
          } catch (e) {
            // Skip parsing errors
          }
        }
      }
    } catch (err) {
      setError('Failed to get response. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const suggestions = [
    { icon: '/', text: 'Explain quantum computing' },
    { icon: '/', text: 'Write a poem about nature' },
    { icon: '/', text: 'Help me debug code' },
    { icon: '/', text: 'Summarize a topic' }
  ]

  return (
    <div className="flex h-screen animated-bg relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern pointer-events-none" />
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Floating orbs */}
      <div className="orb orb-1 -top-48 -left-48" />
      <div className="orb orb-2 top-1/3 -right-32" />
      <div className="orb orb-3 bottom-20 left-1/4" />

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-border/50 glass-strong relative z-10">
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center gap-2 w-full px-4 py-3.5 rounded-xl bg-primary text-primary-foreground font-medium btn-shine glow-primary-subtle hover:glow-primary transition-all duration-300"
          >
            <PlusIcon className="w-5 h-5" />
            <span>New Chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-3">
          <div className="py-2">
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent
            </p>
            {messages.length > 0 && (
              <div className="px-3 py-3 rounded-xl glass card-hover text-sm truncate cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-foreground/90">{messages[0]?.content.slice(0, 28)}...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
              <UserIcon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-foreground">User</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border/50 glass">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center breathe border border-primary/30">
                <SparkleIcon className="w-5 h-5 text-primary animate-sparkle" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-primary/20 pulse-ring" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground flex items-center gap-2">
                AI Assistant
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Online
                </span>
              </h1>
              <p className="text-xs text-muted-foreground">Powered by Qwen</p>
            </div>
          </div>
          
          <button
            onClick={handleNewChat}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl glass hover:bg-secondary/80 transition-all duration-300 border border-border/50"
          >
            <PlusIcon className="w-5 h-5 text-foreground" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto relative scan-line">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4">
              {/* Hero Icon */}
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center breathe border border-primary/20">
                  <SparkleIcon className="w-10 h-10 text-primary animate-sparkle" />
                </div>
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl" />
                {/* Floating stars */}
                <StarIcon className="absolute -top-2 -right-2 w-4 h-4 text-primary/60 animate-pulse" />
                <StarIcon className="absolute -bottom-1 -left-3 w-3 h-3 text-accent/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <StarIcon className="absolute top-1/2 -right-4 w-2 h-2 text-primary/40 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-3 text-center">
                How can I <span className="gradient-text">help</span> you today?
              </h2>
              <p className="text-muted-foreground text-center max-w-md mb-10">
                Ask me anything. I'm here to help with questions, creative tasks, analysis, and more.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={suggestion.text}
                    onClick={() => setInput(suggestion.text)}
                    className={`group flex items-center gap-3 px-4 py-4 rounded-2xl glass card-hover text-left stagger-${i + 1}`}
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <span className="text-primary font-mono text-sm">{suggestion.icon}</span>
                    </div>
                    <span className="text-sm text-foreground/90">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-4 message-enter ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'bg-gradient-to-br from-secondary to-secondary/80 border border-border/50'
                  }`}>
                    {msg.role === 'user' ? (
                      <UserIcon className="w-4 h-4" />
                    ) : (
                      <SparkleIcon className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  
                  <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block px-5 py-3.5 rounded-2xl max-w-[85%] text-left ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md shadow-lg shadow-primary/10'
                          : 'glass rounded-bl-md shimmer'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-4 message-enter">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 border border-border/50 flex items-center justify-center">
                    <SparkleIcon className="w-4 h-4 text-primary animate-sparkle" />
                  </div>
                  <div className="glass rounded-2xl rounded-bl-md px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce-1" />
                      <span className="w-2.5 h-2.5 bg-primary/70 rounded-full animate-bounce-2" />
                      <span className="w-2.5 h-2.5 bg-primary/40 rounded-full animate-bounce-3" />
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm message-enter">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border/50 glass p-4 md:p-6">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-3 rounded-2xl border border-border/50 bg-input/50 p-2 input-glow transition-all duration-300">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message AI Assistant..."
                rows={1}
                className="flex-1 resize-none bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none max-h-[200px]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed btn-shine hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <SendIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-2">
              <kbd className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-mono">Enter</kbd>
              <span>to send</span>
              <span className="text-border">|</span>
              <kbd className="px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-xs font-mono">Shift + Enter</kbd>
              <span>for new line</span>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}
