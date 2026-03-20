'use client'

import type { FormEvent, RefObject, KeyboardEvent } from 'react'
import { AttachIcon, MicIcon, SendIcon } from './icons'

export function ChatInputBar({
  input,
  isLoading,
  textareaRef,
  onInputChange,
  onSubmit,
  onKeyDown
}: {
  input: string
  isLoading: boolean
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onInputChange: (value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <div className="relative z-10 h-20 frosted-divider-t panel-surface px-4 flex-shrink-0 border-t border-border/40">
      <form onSubmit={onSubmit} className="w-full max-w-5xl mx-auto h-full flex items-center">
        <div className="flex w-full items-center gap-2 bg-[#faf6ef]/90 rounded-2xl border border-border/50 px-2 py-1.5 input-focus transition-all shadow-sm">
          <button type="button" className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <MicIcon className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <AttachIcon className="w-5 h-5" />
          </button>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-2 text-sm leading-6 text-foreground placeholder:text-muted-foreground focus:outline-none max-h-[150px]"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-10 items-center gap-1.5 px-4 rounded-xl bg-primary text-primary-foreground text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors soft-glow shadow-sm"
          >
            Send
            <SendIcon className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

