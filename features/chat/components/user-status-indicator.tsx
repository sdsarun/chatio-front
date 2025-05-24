"use client"

// core
import React from 'react'
import { cva, type VariantProps } from "class-variance-authority";

// utils
import { cn } from '@/core/lib/utils';

const userStatusIndicatorVariants = cva(
  "absolute rounded-full ring-[2px] ring-gray-200 dark:ring-zinc-700",
  {
    variants: {
      size: {
        sm: "h-1 w-1",
        md: "h-2 w-2",
        lg: "h-3 w-3",
      },
      status: {
        online: "bg-green-500",
        afk: "bg-amber-500",
        busy: "bg-red-500",
        offline: "bg-gray-400",
      },
      placement: {
        "top-left": "top-0 left-0",
        "top-right": "top-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "bottom-right": "bottom-0 right-0",
      },
    },
    defaultVariants: {
      size: "md",
      status: "online",
      placement: "top-right"
    },
  }
);

type UserStatusIndicatorProps = React.ComponentProps<"div"> & VariantProps<typeof userStatusIndicatorVariants> & {
  offset?: [number, number];
};

function UserStatusIndicator({
  className,
  size,
  status,
  placement,
  offset,
  style,
  ...props
}: UserStatusIndicatorProps) {

  const offsetStyle: React.CSSProperties | undefined = offset
    ? {
      transform: `translate(${offset[0]}px, ${offset[1]}px)`,
      ...style,
    }
    : style;

  return (
    <div
      aria-label="status-dot"
      aria-valuetext={status as string | undefined}
      className={cn(userStatusIndicatorVariants({ size, status, placement }), className)}
      style={offsetStyle}
      {...props}
    />
  )
}

export { UserStatusIndicator }
