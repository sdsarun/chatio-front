// core
import React from 'react'
import { type Session } from 'next-auth'

// components
import { ThemeSwitcher } from '@/core/components/ui/theme-switcher'
import UserSettingsTitle from '@/features/chat/components/user-settings-title'
import UserSettingsContainer from '@/features/chat/components/user-settings-container'
import UserSettingsContent from '@/features/chat/components/user-settings-content'

type UserSettingsMyAccountProps = {
  user?: Session["user"];
}

export default function UserSettingsPreferences({
  user,
}: UserSettingsMyAccountProps) {
  console.log("[LOG] - user-settings-preferences.tsx:18 - user:", user)
  return (
    <UserSettingsContainer>
      <UserSettingsTitle>Preferences</UserSettingsTitle>
      <UserSettingsContent>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-sm font-semibold'>Appearance</h2>
            <p className='text-xs text-muted-foreground'>Customize how ChatIO looks on your device.</p>
          </div>
          <div className='self-center'>
            <ThemeSwitcher />
          </div>
        </div>
      </UserSettingsContent>
    </UserSettingsContainer>
  )
}
