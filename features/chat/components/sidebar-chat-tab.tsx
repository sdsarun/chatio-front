// core
import { cache, Suspense } from 'react';

// components
import UserDirectMessageContainer from '@/features/chat/components/user-direct-message-container';
import { UserDirectMessageContainerSkeleton } from '@/features/chat/components/skeleton';

const fetchMockDirectMessages = cache(async () => {
  const response = await fetch("http://localhost:3300/api/mock/chat");
  return response.json();
});

export default async function SidebarChatTab() {
  const directMessagesPromise = fetchMockDirectMessages();
  return (
    <Suspense fallback={<UserDirectMessageContainerSkeleton />}>
      <UserDirectMessageContainer 
        directMessagesPromise={directMessagesPromise}
      />
    </Suspense>
  )
}
