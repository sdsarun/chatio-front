// core
import React from 'react';
import { verifySession } from '@/core/lib/dal';

// components
import { Button } from '@/core/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/core/components/ui/popover';
import { UserSettingsDrawerDialog } from '@/features/chat/components/user-settings';
import CopyButton from '@/core/components/ui/copy-button';
import UserAvatar from '@/features/chat/components/user-avatar';

export type UserProfilePopoverProps = React.PropsWithChildren;

export default async function UserProfilePopover({
  children,
}: UserProfilePopoverProps) {
  const { user } = await verifySession() || {};
  return (
    <Popover>
      {children && <PopoverTrigger>{children}</PopoverTrigger>}
      <PopoverContent className='max-w-64 flex flex-col bg-accent dark:bg-background'>
        <div className='pt-16' />
        <div className='bg-background rounded-lg flex flex-col gap-2 relative dark:bg-accent p-3'>
          <div className='pt-7' />
          <UserAvatar
            rootProps={{ className: "absolute -top-10" }}
            avatarProps={{ className: "h-20 w-20" }}
            avatarFallbackProps={{ className: "text-xl" }}
            dotProps={{ offset: [-10, 0], size: "lg" }}
            user={user}
          />
          <div className='flex items-center gap-2'>
            <h3 className='font-bold'>{user?.username}</h3>
            <CopyButton value={user?.username} />
          </div>
          <UserSettingsDrawerDialog activeTabKey='MyAccount' user={user}>
            <Button>Edit Profile</Button>
          </UserSettingsDrawerDialog>
        </div>
      </PopoverContent>
    </Popover >
  )
}
