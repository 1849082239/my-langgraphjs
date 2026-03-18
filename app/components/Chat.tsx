'use client'

import { useState, useEffect, useRef } from 'react'

// Cute ghost mascot component
function GhostMascot({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  }
  
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ghost body */}
        <path
          d="M50 10C28 10 15 28 15 50V85C15 87 17 88 19 87L28 80C30 78 33 78 35 80L42 87C44 89 47 89 50 87C53 89 56 89 58 87L65 80C67 78 70 78 72 80L81 87C83 88 85 87 85 85V50C85 28 72 10 50 10Z"
          fill="url(#ghost-gradient)"
          stroke="#d4c4e8"
          strokeWidth="2"
        />
        {/* Blush */}
        <ellipse cx="30" cy="52" rx="6" ry="4" fill="#f5d0e0" opacity="0.6" />
        <ellipse cx="70" cy="52" rx="6" ry="4" fill="#f5d0e0" opacity="0.6" />
        {/* Eyes */}
        <ellipse cx="35" cy="42" rx="5" ry="6" fill="#4a4a6a" />
        <ellipse cx="65" cy="42" rx="5" ry="6" fill="#4a4a6a" />
        {/* Eye highlights */}
        <circle cx="37" cy="40" r="2" fill="white" />
        <circle cx="67" cy="40" r="2" fill="white" />
        {/* Smile */}
        <path
          d="M42 55C42 55 46 60 50 60C54 60 58 55 58 55"
          stroke="#4a4a6a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Sparkles */}
        <circle cx="25" cy="25" r="2" fill="#c9a7eb" className="twinkle" />
        <circle cx="78" cy="30" r="1.5" fill="#9b7ec9" className="twinkle-delay-1" />
        <circle cx="82" cy="60" r="2" fill="#d4c4e8" className="twinkle-delay-2" />
        <defs>
          <linearGradient id="ghost-gradient" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f8f5fc" />
            <stop offset="1" stopColor="#ebe4f5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Decorative flower component
function FlowerDecoration({ className, variant = 1 }: { className?: string; variant?: 1 | 2 | 3 }) {
  const colors = {
    1: { petal: '#d4c4e8', center: '#9b7ec9' },
    2: { petal: '#e8d4f0', center: '#c9a7eb' },
    3: { petal: '#c9b8e0', center: '#8b6eb8' }
  }
  
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="12" r="6" fill={colors[variant].petal} opacity="0.7" />
      <circle cx="12" cy="20" r="6" fill={colors[variant].petal} opacity="0.7" />
      <circle cx="28" cy="20" r="6" fill={colors[variant].petal} opacity="0.7" />
      <circle cx="20" cy="28" r="6" fill={colors[variant].petal} opacity="0.7" />
      <circle cx="20" cy="20" r="5" fill={colors[variant].center} />
    </svg>
  )
}

// Small star decoration
function StarDecoration({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L13.5 9H20L14.5 13L16 20L12 16L8 20L9.5 13L4 9H10.5L12 2Z"
        fill="currentColor"
        opacity="0.6"
      />
    </svg>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}

function AttachIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

export default function Chat() {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string>('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const suggestions = [
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

  return (
    <div className="flex h-screen soft-bg relative overflow-hidden">
      {/* Subtle decorations */}
      <div className="absolute top-20 left-10 opacity-30 float-gentle">
        <FlowerDecoration className="w-16 h-16" variant={1} />
      </div>
      <div className="absolute bottom-32 right-20 opacity-25 float-gentle" style={{ animationDelay: '1s' }}>
        <FlowerDecoration className="w-12 h-12" variant={2} />
      </div>
      <div className="absolute top-1/3 right-10 opacity-20">
        <StarDecoration className="w-6 h-6 text-primary twinkle" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 opacity-20">
        <StarDecoration className="w-5 h-5 text-accent twinkle-delay-1" />
      </div>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 hidden md:flex flex-col border-r border-border bg-white/60 backdrop-blur-sm relative z-10 overflow-hidden`}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <GhostMascot size="sm" className="float-gentle" />
            <span className="font-semibold text-foreground">Aether AI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {recentChats.map((chat, i) => (
            <button
              key={i}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-left hover:bg-secondary/80 transition-colors text-foreground/80"
            >
              <ChatIcon className="w-4 h-4 text-muted-foreground" />
              {chat}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-foreground/80 text-sm font-medium"
          >
            <PlusIcon className="w-4 h-4" />
            New Chat
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="hidden md:flex p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
            <GhostMascot size="sm" className="md:hidden float-gentle" />
            <span className="font-semibold text-foreground md:hidden">Aether AI</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <SettingsIcon className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 py-8">
              <div className="relative mb-6">
                <GhostMascot size="lg" className="float-gentle gentle-pulse" />
              </div>
              
              <h2 className="text-xl font-semibold text-foreground mb-2 text-center">
                Hello! How can I help you today?
              </h2>
              <p className="text-muted-foreground text-center text-sm max-w-sm mb-8">
                I can help with creative ideas, answer questions, or just have a friendly chat.
              </p>
              
              <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={suggestion.text}
                    onClick={() => setInput(suggestion.text)}
                    className={`px-4 py-3 rounded-xl bg-white/80 border border-border text-sm text-left hover:border-primary/40 hover:bg-white transition-all card-hover stagger-${i + 1}`}
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 message-enter ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'user' ? (
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <GhostMascot size="sm" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-muted-foreground mb-1 px-1">
                      {msg.role === 'user' ? 'You' : 'Aether'}
                    </span>
                    <div
                      className={`px-4 py-3 rounded-2xl max-w-[85%] ${
                        msg.role === 'user'
                          ? 'bg-primary/10 border border-primary/20 rounded-br-md'
                          : 'bg-white border border-border rounded-bl-md shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 message-enter">
                  <div className="flex-shrink-0">
                    <GhostMascot size="sm" className="float-gentle" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-muted-foreground mb-1 px-1">Aether</span>
                    <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce-1" />
                        <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce-2" />
                        <span className="w-2 h-2 bg-primary/20 rounded-full animate-bounce-3" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm message-enter">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="border-t border-border bg-white/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex items-end gap-2 bg-white rounded-2xl border border-border p-2 input-focus transition-all">
              <button
                type="button"
                className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
              >
                <MicIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl hover:bg-secondary transition-colors text-muted-foreground"
              >
                <AttachIcon className="w-5 h-5" />
              </button>
              
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 resize-none bg-transparent px-2 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none max-h-[150px]"
                disabled={isLoading}
              />
              
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors soft-glow"
              >
                Send
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
