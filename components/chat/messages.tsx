'use client'

import type { RefObject } from 'react'
import { CloudBubble } from './bubble'
import { GhostMascot, UserIcon } from './icons'
import type { ChatMessage, ChatSuggestion } from './types'

export function ChatMessages({
  messages,
  isLoading,
  error,
  suggestions,
  onSuggestionClick,
  messagesEndRef
}: {
  messages: ChatMessage[]
  isLoading: boolean
  error: string | null
  suggestions: ChatSuggestion[]
  onSuggestionClick: (text: string) => void
  messagesEndRef: RefObject<HTMLDivElement | null>
}) {
  if (messages.length === 0) {
    return (
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
              onClick={() => onSuggestionClick(suggestion.text)}
              className={`px-4 py-3 rounded-xl bg-[#faf6ef]/88 border border-border text-sm text-left hover:border-primary/30 transition-all card-hover shadow-sm stagger-${i + 1}`}
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      {messages.map((msg, i) => (
        <div key={i} className={`flex gap-3 message-enter ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
          {msg.role === 'user' ? (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary/18 to-accent/24 flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary" />
            </div>
          ) : (
            <div className="flex-shrink-0">
              <GhostMascot size="sm" />
            </div>
          )}

          <div className={`flex flex-col max-w-[86%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-xs text-muted-foreground mb-1 px-1">
              {msg.role === 'user' ? 'You' : 'Aether'}
            </span>
            <CloudBubble role={msg.role}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{msg.content}</p>
            </CloudBubble>
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
            <CloudBubble role="assistant">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce-1" />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce-2" />
                <span className="w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce-3" />
              </div>
            </CloudBubble>
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
  )
}
