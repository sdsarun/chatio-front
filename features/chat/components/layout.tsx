// core
import { cookies } from 'next/headers';

// components
import { SidebarInset, SidebarProvider } from '@/core/components/ui/sidebar';
import ChatSidebar from '@/features/chat/components/sidebar';

// types
import type { LayoutProps } from '@/core/types/next';

export type ChatLayoutProps = LayoutProps;

export default async function ChatRootLayout({ children }: ChatLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <ChatSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
