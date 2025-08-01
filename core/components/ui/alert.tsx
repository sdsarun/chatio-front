import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-2 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "border-gray-300 bg-white text-gray-900 [&>svg]:text-gray-500 *:data-[slot=alert-description]:text-gray-700",
        destructive: "border-destructive bg-red-50 text-destructive [&>svg]:text-destructive *:data-[slot=alert-description]:text-red-800",
        warning: "border-yellow-400 bg-yellow-50 text-yellow-900 [&>svg]:text-yellow-700 *:data-[slot=alert-description]:text-yellow-800",
        info: "border-blue-400 bg-blue-50 text-blue-900 [&>svg]:text-blue-700 *:data-[slot=alert-description]:text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-bold leading-none tracking-normal", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }