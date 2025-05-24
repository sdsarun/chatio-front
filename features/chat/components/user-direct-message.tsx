"use client"

// components
import { Badge } from '@/core/components/ui/badge';
import UserProfileLite from '@/features/chat/components/user-profile-lite';

// utils
import { cn } from '@/core/lib/utils';

export type UserDirectMessageProps = {
  rootClassName?: string;
  directMessage?: Record<string, any>;
}

export default function UserDirectMessage({
  rootClassName,
  directMessage = {},
}: UserDirectMessageProps) {

  return (
    <div 
      className={cn("flex items-center justify-between", rootClassName)}
    >
      <UserProfileLite
        user={directMessage as any}
      >
        <Badge
          className='rounded-full'
          variant="destructive"
        >1</Badge>
      </UserProfileLite>
    </div>
  )
}
