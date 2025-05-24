// core
import React from 'react'
import type { Session } from 'next-auth';

// components
import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/ui/avatar';
import { UserStatusIndicator } from '@/features/chat/components/user-status-indicator';

// utils
import { cn } from '@/core/lib/utils';

type UserAvatarProps = {
  user?: Session["user"];
  userStatus?: React.ComponentProps<typeof UserStatusIndicator>["status"];
  avatarProps?: React.ComponentProps<typeof Avatar>;
  avatarImageProps?: React.ComponentProps<typeof AvatarImage>;
  avatarFallbackProps?: React.ComponentProps<typeof AvatarFallback>;
  dotProps?: Omit<React.ComponentProps<typeof UserStatusIndicator>, "status">;
  rootProps?: React.ComponentProps<"div">;
  hiddenUserStatus?: boolean;
  hiddenAvatar?: boolean;
};

export default function UserAvatar({
  user,
  avatarFallbackProps,
  avatarImageProps,
  avatarProps,
  dotProps,
  userStatus,
  rootProps,
  hiddenAvatar,
  hiddenUserStatus,
}: UserAvatarProps) {
  return (
    <div {...rootProps} className={cn('relative inline-block', rootProps?.className)} >
      {!hiddenAvatar && (
        <Avatar {...avatarProps}>
          <AvatarImage
            {...avatarImageProps}
            src={avatarImageProps?.src || "#"}
          />
          <AvatarFallback
            {...avatarFallbackProps}
            className={cn('text-xs bg-foreground border-2 border-foreground text-background font-semibold', avatarFallbackProps?.className)}
          >{user?.aka?.slice(0, 2)?.toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      {!hiddenUserStatus && (
        <UserStatusIndicator
          {...dotProps}
          placement={dotProps?.placement || "bottom-right"}
          status={userStatus}
        />
      )}
    </div>
  )
}
