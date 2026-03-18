'use client'

import { useState, useEffect, useRef } from 'react'

// Cute ghost mascot component
function GhostMascot({ className, size = 'md' }: { className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  }
  
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 10C28 10 15 28 15 50V85C15 87 17 88 19 87L28 80C30 78 33 78 35 80L42 87C44 89 47 89 50 87C53 89 56 89 58 87L65 80C67 78 70 78 72 80L81 87C83 88 85 87 85 85V50C85 28 72 10 50 10Z"
          fill="url(#ghost-gradient)"
          stroke="#e0d6ec"
          strokeWidth="2"
        />
        <ellipse cx="30" cy="52" rx="5" ry="3" fill="#f5d0e0" opacity="0.5" />
        <ellipse cx="70" cy="52" rx="5" ry="3" fill="#f5d0e0" opacity="0.5" />
        <ellipse cx="35" cy="42" rx="4" ry="5" fill="#4a4a6a" />
        <ellipse cx="65" cy="42" rx="4" ry="5" fill="#4a4a6a" />
        <circle cx="37" cy="40" r="1.5" fill="white" />
        <circle cx="67" cy="40" r="1.5" fill="white" />
        <path
          d="M43 55C43 55 46 59 50 59C54 59 57 55 57 55"
          stroke="#4a4a6a"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="ghost-gradient" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#faf8fc" />
            <stop offset="1" stopColor="#f0ebf7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Violet flower decoration
function VioletFlower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 80V45" stroke="#7a9c65" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 55C20 50 18 45 22 42" stroke="#7a9c65" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="30" cy="25" rx="8" ry="12" fill="#c4b5dc" opacity="0.8" transform="rotate(-30 30 25)" />
      <ellipse cx="30" cy="25" rx="8" ry="12" fill="#c4b5dc" opacity="0.8" transform="rotate(30 30 25)" />
      <ellipse cx="30" cy="25" rx="8" ry="12" fill="#d4c4e8" opacity="0.8" transform="rotate(-60 30 25)" />
      <ellipse cx="30" cy="25" rx="8" ry="12" fill="#d4c4e8" opacity="0.8" transform="rotate(60 30 25)" />
      <ellipse cx="30" cy="25" rx="8" ry="12" fill="#e0d6ec" opacity="0.7" />
      <circle cx="30" cy="25" r="4" fill="#f0e68c" opacity="0.8" />
    </svg>
  )
}

// Dandelion decoration - using static SVG to avoid hydration mismatch
function Dandelion({ className, withSeeds = false }: { className?: string; withSeeds?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 100V50" stroke="#9cb88b" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="35" r="15" fill="#f5f2e8" opacity="0.6" />
      {/* Pre-rendered lines for dandelion */}
      <line x1="40" y1="35" x2="58" y2="35" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="56" y2="44" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="49" y2="51" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="40" y2="53" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="31" y2="51" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="24" y2="44" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="22" y2="35" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="24" y2="26" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="31" y2="19" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="40" y2="17" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="49" y2="19" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      <line x1="40" y1="35" x2="56" y2="26" stroke="#e8e4d8" strokeWidth="1" strokeLinecap="round" />
      {/* Pre-rendered circles for dandelion tips */}
      <circle cx="58" cy="35" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="56" cy="44" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="49" cy="51" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="40" cy="53" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="31" cy="51" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="24" cy="44" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="22" cy="35" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="24" cy="26" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="31" cy="19" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="40" cy="17" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="49" cy="19" r="3" fill="#faf8f2" opacity="0.7" />
      <circle cx="56" cy="26" r="3" fill="#faf8f2" opacity="0.7" />
      {withSeeds && (
        <>
          <circle cx="55" cy="20" r="2" fill="#f0ebe0" className="dandelion-seed" opacity="0.5" />
          <circle cx="60" cy="30" r="1.5" fill="#f0ebe0" className="dandelion-seed-2" opacity="0.4" />
          <circle cx="52" cy="15" r="1.5" fill="#f0ebe0" className="dandelion-seed-3" opacity="0.45" />
        </>
      )}
    </svg>
  )
}

// Small lavender sprig
function LavenderSprig({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 30 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 70V25" stroke="#8fa87a" strokeWidth="1.5" strokeLinecap="round" />
      {[0, 8, 16, 24, 32].map((y, i) => (
        <g key={i}>
          <ellipse cx="12" cy={25 + y / 1.5} rx="3" ry="4" fill="#c4b5dc" opacity={0.7 - i * 0.1} />
          <ellipse cx="18" cy={28 + y / 1.5} rx="3" ry="4" fill="#d4c4e8" opacity={0.7 - i * 0.1} />
        </g>
      ))}
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
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-8 opacity-25 sway pointer-events-none">
        <VioletFlower className="w-16 h-24" />
      </div>
      <div className="absolute bottom-0 left-20 opacity-20 sway pointer-events-none" style={{ animationDelay: '0.5s' }}>
        <LavenderSprig className="w-8 h-20" />
      </div>
      <div className="absolute bottom-0 right-12 opacity-20 sway pointer-events-none" style={{ animationDelay: '1s' }}>
        <Dandelion className="w-20 h-28" withSeeds />
      </div>
      <div className="absolute bottom-0 right-32 opacity-15 sway pointer-events-none" style={{ animationDelay: '1.5s' }}>
        <VioletFlower className="w-12 h-18" />
      </div>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-0'} flex-shrink-0 transition-all duration-300 hidden md:flex flex-col border-r border-border bg-white/70 backdrop-blur-sm relative z-10 overflow-hidden`}>
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <GhostMascot size="sm" className="float-gentle" />
            <span className="font-medium text-foreground text-sm">Aether AI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
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
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-left hover:bg-secondary transition-colors text-foreground/80"
            >
              <ChatIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="truncate">{chat}</span>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-border">
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-foreground/80 text-sm"
          >
            <PlusIcon className="w-4 h-4" />
            New Chat
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-white/60 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center gap-2">
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
            <span className="font-medium text-foreground text-sm md:hidden">Aether AI</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <SettingsIcon className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary" />
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-4 py-8">
              <div className="mb-6">
                <GhostMascot size="lg" className="float-gentle gentle-pulse" />
              </div>
              
              <h2 className="text-lg font-medium text-foreground mb-1 text-center">
                Hello! How can I help you today?
              </h2>
              <p className="text-muted-foreground text-center text-sm max-w-sm mb-8">
                I can help with creative ideas, answer questions, or have a friendly chat.
              </p>
              
              <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                {suggestions.map((suggestion, i) => (
                  <button
                    key={suggestion.text}
                    onClick={() => setInput(suggestion.text)}
                    className={`px-4 py-3 rounded-xl bg-white border border-border text-sm text-left hover:border-primary/30 transition-all card-hover stagger-${i + 1}`}
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 message-enter ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'user' ? (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-primary" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <GhostMascot size="sm" />
                    </div>
                  )}
                  
                  <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-xs text-muted-foreground mb-1 px-1">
                      {msg.role === 'user' ? 'You' : 'Aether'}
                    </span>
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-primary/8 border border-primary/15 rounded-br-md'
                          : 'bg-white border border-border rounded-bl-md'
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
                    <div className="bg-white border border-border rounded-2xl rounded-bl-md px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce-1" />
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce-2" />
                        <span className="w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce-3" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-destructive/5 border border-destructive/15 text-destructive text-sm message-enter">
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
        <div className="border-t border-border bg-white/60 backdrop-blur-sm p-4 flex-shrink-0">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="flex items-end gap-2 bg-white rounded-xl border border-border p-2 input-focus transition-all">
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
              >
                <MicIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
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
                className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none max-h-[150px]"
                disabled={isLoading}
              />
              
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors soft-glow"
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
