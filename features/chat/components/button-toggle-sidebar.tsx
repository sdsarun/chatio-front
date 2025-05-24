"use client"

// core
import React from 'react'

// components
import { Button } from '@/core/components/ui/button'
import { PanelLeft } from 'lucide-react'

// hooks
import { useSidebar } from '@/core/components/ui/sidebar'

export type ButtonToggleChatSidebarProps = {
  hiddenWhen?: "open" | "close" | "none";
}

export default function ButtonToggleChatSidebar({
  hiddenWhen
}: ButtonToggleChatSidebarProps) {
  const { open, isMobile, toggleSidebar } = useSidebar();

  if (
    !isMobile && 
    ((hiddenWhen === "open" && (open)) || (hiddenWhen === "close" && (!open)))
  ) {
    return null;
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
      <PanelLeft />
    </Button>
  )
}
