import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-1 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-white text-gray-900 [&>svg]:text-gray-500 *:data-[slot=alert-description]:text-gray-700",
        destructive: "border-red-500 bg-red-50 text-red-900 [&>svg]:text-red-700 *:data-[slot=alert-description]:text-red-800",
        warning: "border-yellow-400 bg-yellow-50 text-yellow-900 [&>svg]:text-yellow-700 *:data-[slot=alert-description]:text-yellow-800",
        info: "border-blue-400 bg-blue-50 text-blue-900 [&>svg]:text-blue-700 *:data-[slot=alert-description]:text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
