// components
import UserFriend from '@/features/chat/components/user-friend';

// utils
import { cn } from '@/core/lib/utils';

export type UserFriendListProps = {
  rootClassName?: string;
  friends?: Record<string, any>[];
};

export default function UserFriendList({
  rootClassName,
  friends,
}: UserFriendListProps) {
  return (
    <div className={cn(rootClassName)}>
      {friends?.map((friend, index) => (
        <UserFriend
          key={index}
          friend={friend}
        />
      ))}
    </div>
  )
}
