// core
import { verifySession } from '@/core/lib/dal'

// components
import UserProfileLite from '@/features/chat/components/user-profile-lite';
import { Button } from '@/core/components/ui/button';
import { SidebarFooter } from '@/core/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/core/components/ui/tooltip';
import { Settings, Volume2 } from 'lucide-react';
import { UserSettingsDrawerDialog } from '@/features/chat/components/user-settings';
import UserProfilePopover from '@/features/chat/components/user-profile-popover';

export default async function ChatSidebarFooter() {
  const session = await verifySession();
  return (
    <SidebarFooter>
      <div className='flex items-center justify-between'>
        <UserProfilePopover>
          <UserProfileLite user={session?.user} />
        </UserProfilePopover>
        <div className='flex items-center'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Volume2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Notification Sound</TooltipContent>
            {/* <VolumeX /> */}
          </Tooltip>
          <Tooltip>
            <UserSettingsDrawerDialog user={session?.user}>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings />
                </Button>
              </TooltipTrigger>
            </UserSettingsDrawerDialog>
            <TooltipContent>User Settings</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </SidebarFooter >
  )
}


