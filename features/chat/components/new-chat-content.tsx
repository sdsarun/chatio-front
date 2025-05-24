// core
import React from 'react'

// components
import { AppLogo } from '@/core/components/ui/app-logo'
import MatchingChat from '@/features/chat/components/matching-chat'

export default function NewChatContent() {
  return (
    <div className="w-full h-full px-4 py-2 flex flex-col justify-between items-center  ">
      <div className="flex-1 w-full flex items-center justify-center">
        <AppLogo />
      </div>
      <MatchingChat />
    </div>
  )
}
