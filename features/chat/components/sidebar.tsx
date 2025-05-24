// components
import { Sidebar } from '@/core/components/ui/sidebar';
import ChatSidebarContent from '@/features/chat/components/sidebar-content';
import ChatSidebarFooter from '@/features/chat/components/sidebar-footer';
import ChatSidebarHeader from '@/features/chat/components/sidebar-header';

export type SidebarProps = any;

export default function ChatSidebar({

}: SidebarProps) {
  return (
    <Sidebar variant="inset">
      <ChatSidebarHeader />
      <ChatSidebarContent />
      <ChatSidebarFooter />
    </Sidebar >
  )
}
