// core
import React from 'react'

// components
import { Button } from '@/core/components/ui/button'
import { History } from 'lucide-react'
import ButtonToggleChatSidebar from '@/features/chat/components/button-toggle-sidebar'

// types
import type { ChatParams } from '@/app/c/[[...chat]]/page'

type ChatMainHeaderProps = {
  chatParams?: ChatParams;
}

export default function ChatMainHeader({
  chatParams
}: ChatMainHeaderProps) {
  const headerTitle: string = chatParams?.chat?.includes("new") ? "New chat": chatParams?.chat?.[0] || "";
  return (
    <div className='px-4 py-2 flex items-center justify-between border-b'>
      <div className='flex items-center gap-1'>
        <ButtonToggleChatSidebar hiddenWhen="open" />
        <span className='font-bold'>{headerTitle}</span>
      </div>
      <div>
        <Button variant="outline" size="icon">
          <History />
        </Button>
      </div>
    </div>
  )
}
