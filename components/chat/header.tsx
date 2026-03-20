'use client'

import { GhostMascot, SettingsIcon, UserIcon } from './icons'

export function ChatHeader({
  sidebarOpen,
  onOpenSidebar
}: {
  sidebarOpen: boolean
  onOpenSidebar: () => void
}) {
  return (
    <header className="relative z-10 flex items-center justify-between h-14 px-4 frosted-divider-b panel-surface flex-shrink-0 border-b border-border/40">
      <div className="flex items-center gap-2">
        {!sidebarOpen && (
          <button
            onClick={onOpenSidebar}
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
  )
}
