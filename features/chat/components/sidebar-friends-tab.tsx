// core
import { cache, Suspense } from 'react';

// components
import UserFriendContainer from '@/features/chat/components/user-friend-container';
import { UserFriendContainerSkeleton } from '@/features/chat/components/skeleton';

const fetchMockFriends = cache(async () => {
  const response = await fetch("http://localhost:3300/api/mock/friend");
  return response.json();
});

export default function SidebarFriendsTab() {
  const friendsPromise = fetchMockFriends();
  return (
    <Suspense fallback={<UserFriendContainerSkeleton />}>
      <UserFriendContainer
        friendsPromise={friendsPromise}
      />
    </Suspense>
  )
}
