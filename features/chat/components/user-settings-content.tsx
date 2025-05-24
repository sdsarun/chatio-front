// core
import React from 'react'

// utils
import { cn } from '@/core/lib/utils';

export type UserSettingsContentProps = React.ComponentProps<"div">;

export default function UserSettingsContent({ children, className, ...props }: UserSettingsContentProps) {
  return (
    <div className={cn('flex flex-col', className)} {...props}>{children}</div>
  )
}
