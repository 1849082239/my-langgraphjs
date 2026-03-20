'use client'

import { type ReactNode } from 'react'

export function CloudBubble({
  role,
  children,
  className
}: {
  role: 'user' | 'assistant'
  children: ReactNode
  className?: string
}) {
  const isUser = role === 'user'
  const bubbleTone = isUser
    ? 'bg-[#f1ebf7]/88 border-[#d9cdea]/80'
    : 'bg-[#fbf7f0]/94 border-[#e5dccf]/92'
  const puffTone = isUser
    ? 'bg-[#f7f2fb]/88 border-[#dccfe9]/70'
    : 'bg-[#fffdf8]/92 border-[#e9e0d5]/86'

  return (
    <div className={`relative w-fit max-w-full ${className ?? ''}`}>
      <div
        className={`absolute -top-3 ${isUser ? 'right-7' : 'left-7'} h-8 w-8 rounded-full border ${puffTone} shadow-sm`}
      />
      <div
        className={`absolute -top-5 ${isUser ? 'right-12' : 'left-12'} h-10 w-10 rounded-full border ${puffTone} shadow-sm`}
      />
      <div
        className={`absolute -top-1 ${isUser ? 'right-1' : 'left-1'} h-6 w-6 rounded-full border ${puffTone} shadow-sm`}
      />
      <div
        className={`relative z-10 rounded-[30px] border px-4 py-4 pt-7 shadow-sm ${bubbleTone} ${
          isUser ? 'rounded-br-[14px]' : 'rounded-bl-[14px]'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
