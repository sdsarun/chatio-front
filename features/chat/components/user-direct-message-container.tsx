"use client"

// core
import { use } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// components
import { Button } from '@/core/components/ui/button';
import { Separator } from '@/core/components/ui/separator';
import { MessageSquareText } from 'lucide-react';
import UserDirectMessageList from '@/features/chat/components/user-direct-message-list';

export type UserDirectMessageContainerProps = {
  directMessagesPromise: Promise<Record<string, any>[]>;
}

export default function UserDirectMessageContainer({
  directMessagesPromise,
}: UserDirectMessageContainerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const directMessages = use(directMessagesPromise);

  const handleNewChat = () => {
    if (pathname !== "/c/new") {
      router.push(`/c/new`);
    }
  }

  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-col gap-2'>
        <Button
          className='w-full flex items-center justify-start'
          variant="secondary"
          size="lg"
          onClick={handleNewChat}
        >
          <MessageSquareText />
          New Chat
        </Button>
        <Separator contentClassName='text-sm font-bold'>Direct Messages</Separator>
      </div>
      <UserDirectMessageList
        directMessages={directMessages}
        rootClassName='max-h-[calc(100dvh-260px)] overflow-y-auto overflow-x-hidden pr-1'
      />
    </section>
  )
}
