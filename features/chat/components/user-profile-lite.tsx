"use client"

// core
import React from 'react'

// components
import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/ui/avatar'
import { buttonVariants } from '@/core/components/ui/button'
import { UserStatusIndicator } from '@/features/chat/components/user-status-indicator'
import UserAvatar from '@/features/chat/components/user-avatar'

// utils
import { cn } from '@/core/lib/utils'

// types
import type { Session } from 'next-auth'
import type { VariantProps } from 'class-variance-authority'

export type UserProfileLiteProps = React.PropsWithChildren<{
  user?: Session["user"];
  hiddenRole?: boolean;
  hiddenUsername?: boolean;
  hiddenUserStatus?: boolean;
  hiddenAvatar?: boolean;
  userStatus?: React.ComponentProps<typeof UserStatusIndicator>["status"];
  avatarProps?: React.ComponentProps<typeof Avatar>;
  avatarImageProps?: React.ComponentProps<typeof AvatarImage>;
  avatarFallbackProps?: React.ComponentProps<typeof AvatarFallback>;
  dotProps?: Omit<React.ComponentProps<typeof UserStatusIndicator>, "status">;
  rootProps?: React.ComponentProps<"div"> & VariantProps<typeof buttonVariants>;
}>

export default function UserProfileLite({
  children,
  user,
  hiddenRole,
  hiddenUsername,
  rootProps,
  ...props
}: UserProfileLiteProps) {
  return (
    <div
      {...rootProps}
      className={cn(
        'gap-3 px-2 py-6 justify-start text-left flex-1',
        buttonVariants({
          className: rootProps?.className,
          variant: rootProps?.variant || "ghost",
          size: rootProps?.size || "sm",
        }),
      )}
    >
      <UserAvatar {...props} user={user} />
      {(!hiddenUsername || !hiddenRole) && (
        <div className='flex flex-col w-full'>
          {!hiddenUsername && <span className='text-sm w-[90px] truncate' title={user?.username}>{user?.username}</span>}
          {!hiddenRole && <span className='text-xs w-[90px] truncate' title={user?.userRole?.name}>{user?.userRole?.name}</span>}
        </div>
      )}
      {children}
    </div>
  )
}
