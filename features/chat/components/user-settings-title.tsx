// core
import React from 'react'

// utils
import { cn } from '@/core/lib/utils';
import { Separator } from '@/core/components/ui/separator';

export type UserSettingsTitleProps = React.ComponentProps<"h1">;

export default function UserSettingsTitle({ children, className, ...props }: UserSettingsTitleProps) {
  return (
    <>
      <h1 className={cn('text-base font-bold', className)} {...props}>{children}</h1>
      <Separator className='my-3' />
    </>
  )
}
