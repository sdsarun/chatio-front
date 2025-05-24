// core
import React from 'react'

// components
import Chat from '@/features/chat/components/chat'

type ChattingContentProps = React.ComponentProps<typeof Chat>;

export default function ChattingContent(props: ChattingContentProps) {

  return (
    <div className="flex flex-col px-4 py-2 flex-1">
      <Chat {...props} />
    </div>
  )
}
