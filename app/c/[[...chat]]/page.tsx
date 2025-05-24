// core
import { redirect, RedirectType } from "next/navigation";
import { verifySession } from "@/core/lib/dal";

// components
import ChattingContent from "@/features/chat/components/chatting-content";
import NewChatContent from "@/features/chat/components/new-chat-content";

// types
import type { PageProps } from '@/core/types/next';

export type ChatParams = { chat: string[] };

type ChattingPageProps = PageProps<ChatParams>;

export default async function ChatingPage({
  params
}: ChattingPageProps) {
  const [{ chat }, session] = await Promise.all([params, verifySession()]);

  if (!chat || chat.length === 0) {
    redirect("/c/new", RedirectType.replace);
  }

  if (chat.includes("new")) {
    return <NewChatContent />
  }

  const [conversationId] = chat;

  return (
    <ChattingContent
      user={session?.user}
      conversationId={conversationId}
    />
  )
}
