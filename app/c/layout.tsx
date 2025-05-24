// core
import React from 'react'

// components
import ChatLayout from '@/features/chat/components/layout'

// types
import type { LayoutProps } from '@/core/types/next'
import type { ChatParams } from '@/app/c/[[...chat]]/page'

export default function Layout(props: LayoutProps<ChatParams>) {
  return <ChatLayout {...props} />
}
