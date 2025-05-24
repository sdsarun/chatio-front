"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/core/lib/utils"

export interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  containerClassName?: string;
  contentClassName?: string;
  align?: "left" | "center" | "right";
}

function Separator({
  className,
  containerClassName,
  contentClassName,
  orientation = "horizontal",
  decorative = true,
  align = "center",
  children,
  ...props
}: SeparatorProps) {
  const separatorElement = (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        { "flex-1": !!children },
        className
      )}
      {...props}
    />
  );

  if (children) {
    return (
      <div
        className={cn(
          "flex items-center",
          orientation === "vertical" ? "flex-col" : "flex-row",
          containerClassName
        )}
      >
        {(align === "right" || align === "center") && separatorElement}
        <div className={cn({
          "px-2": align === "center",
          "pl-2": align === "right",
          "pr-2": align === "left"
        }, contentClassName)}>{children}</div>
        {(align === "center" || align === "left") && separatorElement}
      </div>
    )
  }

  return separatorElement;
}

export { Separator }
