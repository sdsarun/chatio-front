import { AppLogo } from '@/core/components/ui/app-logo'
import { ThemeSwitcher } from '@/core/components/ui/theme-switcher'
import React from 'react'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div
      className='min-h-dvh flex flex-col bg-gradient-to-bl from-white to-gray-300 dark:bg-gradient-to-bl dark:from-gray-800 dark:to-black'
    >
      <header className='flex items-center justify-between p-4'>
        <AppLogo />
        <ThemeSwitcher />
      </header>
      {children}
    </div>
  )
}
