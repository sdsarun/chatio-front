"use client"

import React from "react"

// components
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/core/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerOverlay,
  DrawerPortal,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/core/components/ui/drawer"

// hooks
import { useIsMobile } from "@/core/hooks/use-mobile"

export function DrawerDialog(props: React.ComponentProps<typeof Dialog>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Drawer {...props} />
  }

  return <Dialog {...props} />
}

export function DrawerDialogTrigger(props: React.ComponentProps<typeof DialogTrigger>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerTrigger {...props} />
  }

  return <DialogTrigger {...props} />
}

export function DrawerDialogContent(props: React.ComponentProps<typeof DialogContent>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerContent {...props} />
  }

  return <DialogContent {...props} />
}

export function DrawerDialogOverlay(props: React.ComponentProps<typeof DialogOverlay>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerOverlay {...props} />
  }

  return <DialogOverlay {...props} />
}

export function DrawerDialogPortal(props: React.ComponentProps<typeof DialogPortal>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerPortal {...props} />
  }

  return <DialogPortal {...props} />
}

export function DrawerDialogHeader(props: React.ComponentProps<"div">) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerHeader {...props} />
  }

  return <DialogHeader {...props} />
}

export function DrawerDialogTitle(props: React.ComponentProps<typeof DialogTitle>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerTitle {...props} />
  }

  return <DialogTitle {...props} />
}

export function DrawerDialogDescription(props: React.ComponentProps<typeof DialogDescription>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerDescription {...props} />
  }

  return <DialogDescription {...props} />
}

export function DrawerDialogFooter(props: React.ComponentProps<"div">) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerFooter {...props} />
  }

  return <DialogFooter {...props} />
}

export function DrawerDialogClose(props: React.ComponentProps<typeof DialogClose>) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DrawerClose {...props} />
  }

  return <DialogClose {...props} />
}
