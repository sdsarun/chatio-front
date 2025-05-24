// components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/core/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/core/components/ui/tooltip';
import UserProfileLite from '@/features/chat/components/user-profile-lite';
import { EllipsisVertical, MessageCircle } from 'lucide-react';

// utils
import { buttonVariants } from '@/core/components/ui/button';
import { cn } from '@/core/lib/utils';

export type UserFriendProps = {
  rootClassName?: string;
  friend?: Record<string, any>;
  onRemoveFriend?: () => void;
  onMessage?: () => void;
  onRow?: () => void;
};

export default function UserFriend({
  rootClassName,
  friend,
}: UserFriendProps) {
  return (
    <div className={cn("flex items-center justify-between", rootClassName)}>
      <UserProfileLite
        user={friend as any}
      >
        <div className='flex items-center justify-end'>
          <Tooltip>
            <TooltipTrigger>
              <div className={buttonVariants({ size: "icon-sm", variant: "ghost" })}>
                <MessageCircle className='' />
              </div>
            </TooltipTrigger>
            <TooltipContent>Message</TooltipContent>
          </Tooltip>
          <Tooltip>
            <DropdownMenu>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger>
                  <div className={buttonVariants({ size: "icon-sm", variant: "ghost" })}>
                    <EllipsisVertical />
                  </div>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <DropdownMenuContent align='start' className='sm:min-w-48'>
                <DropdownMenuItem className='text-destructive cursor-pointer'>Remove Friend</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <TooltipContent>More</TooltipContent>
          </Tooltip>
        </div>
      </UserProfileLite>
    </div>
  )
}