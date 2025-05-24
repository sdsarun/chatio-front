"use client"

// components
import UserDirectMessage from '@/features/chat/components/user-direct-message';

// utils
import { cn } from '@/core/lib/utils';

type UserDirectMessageListProps = {
  directMessages: Record<string, any>[];
  rootClassName?: string;
}

export default function UserDirectMessageList({
  directMessages,
  rootClassName,
}: UserDirectMessageListProps) {
  return (
    <div
      className={cn(rootClassName)}
    >
      {directMessages?.map((directMessage) => (
        <UserDirectMessage
          key={directMessage.id}
          directMessage={directMessage}
        />
      ))}
    </div>
  )
}
