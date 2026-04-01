'use client'

import { ChatIcon, GhostMascot, PlusIcon } from './icons'

export function ChatSidebar({
  isOpen,
  recentChats,
  onClose,
  onNewChat
}: {
  isOpen: boolean
  recentChats: string[]
  onClose: () => void
  onNewChat: () => void
}) {
  return (
    <aside className={`${isOpen ? 'w-60' : 'w-0'} flex-shrink-0 transition-all duration-300 hidden md:flex flex-col min-h-0 panel-surface relative z-10 overflow-hidden border-r border-border/35`}>
      <div className="flex items-center justify-between h-14 px-4 frosted-divider-b">
        <div className="flex items-center gap-2">
          <GhostMascot size="sm" className="float-gentle" />
          <span className="font-medium text-foreground text-sm">Aether AI</span>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-1">
        {recentChats.map((chat, i) => (
          <button
            key={i}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-left hover:bg-secondary transition-colors text-foreground/80"
          >
            <ChatIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">{chat}</span>
          </button>
        ))}
      </div>

      <div className="h-20 px-4 frosted-divider-t flex items-center">
        <button
          onClick={onNewChat}
          className="flex items-center justify-center gap-2 w-full h-11 px-4 rounded-xl bg-secondary/85 hover:bg-secondary transition-colors text-foreground/80 text-sm shadow-sm"
        >
          <PlusIcon className="w-4 h-4" />
          New Chat
        </button>
      </div>
    </aside>
  )
}
