// components
import { AppLogo } from '@/core/components/ui/app-logo';
import { SidebarHeader } from '@/core/components/ui/sidebar';
import ButtonToggleChatSidebar from '@/features/chat/components/button-toggle-sidebar';

export type ChatSidebarHeaderProps = any;

export default function ChatSidebarHeader({ }: ChatSidebarHeaderProps) {
  return (
    <SidebarHeader>
      <div className='flex items-center justify-between h-9'>
        <AppLogo
          textProps={{ className: "text-base" }}
          iconProps={{ size: 20 }}
        />
        <ButtonToggleChatSidebar />
      </div>
    </SidebarHeader>
  );
}

