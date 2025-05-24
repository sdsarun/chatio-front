// components
import { SidebarContent } from '@/core/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { MessageCircleQuestion, UsersRound } from 'lucide-react';
import SidebarChatTab from '@/features/chat/components/sidebar-chat-tab';
import SidebarFriendsTab from '@/features/chat/components/sidebar-friends-tab';

export type SidebarContentProps = any;

export default function ChatSidebarContent({ }: SidebarContentProps) {
  return (
    <SidebarContent>
      <Tabs defaultValue="chat">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className='cursor-pointer' value="chat">
            <MessageCircleQuestion />
            Chat
          </TabsTrigger>
          <TabsTrigger className='cursor-pointer' value="friends">
            <UsersRound />
            Friends
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chat">
          <SidebarChatTab />
        </TabsContent>
        <TabsContent value="friends">
          <SidebarFriendsTab />
        </TabsContent>
      </Tabs>
    </SidebarContent>
  )
}