export type ChatMessageRole = 'user' | 'assistant'

export interface ChatMessage {
  role: ChatMessageRole
  content: string
}

export interface ChatSuggestion {
  text: string
}

