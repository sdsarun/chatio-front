// core
import React from 'react'
import { notFound } from 'next/navigation';

// components
import ChatMainHeader from '@/features/chat/components/main-header';

// types
import type { LayoutProps } from '@/core/types/next'
import type { ChatParams } from '@/app/c/[[...chat]]/page'

type ChatLayoutProps = LayoutProps<ChatParams>;

export default async function ChatLayout({ children, params }: ChatLayoutProps) {
  const chatParams = await params;

  if (chatParams.chat?.length > 1) {
    notFound();
  }

  return (
    <>
      <ChatMainHeader chatParams={chatParams} />
      {children}
    </>
  )
}
