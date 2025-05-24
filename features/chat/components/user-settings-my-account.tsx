"use client"

// core
import React from 'react'
import { type Session } from 'next-auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

// components
import { UserSettingsItem } from '@/features/chat/components/user-setting-item'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/core/components/ui/form'
import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import UserSettingsTitle from '@/features/chat/components/user-settings-title'
import UserSettingsContainer from '@/features/chat/components/user-settings-container'
import UserSettingsContent from '@/features/chat/components/user-settings-content'
import UserAvatar from '@/features/chat/components/user-avatar'

const updateAccountFormSchema = yup.object({
  username: yup
    .string()
    .min(1, "Username must be at least 1 character long")
});

type UpdateAccountFormValues = yup.InferType<typeof updateAccountFormSchema>;
type UserSettingsMyAccountProps = {
  user?: Session["user"];
}

export default function UserSettingsMyAccount({
  user,
}: UserSettingsMyAccountProps) {

  const formUpdateAccount = useForm<UpdateAccountFormValues>({
    defaultValues: {
      username: user?.username,
    },
    values: {
      username: user?.username,
    },
    resolver: yupResolver(updateAccountFormSchema),
  });

  const handleUpdateAccountSubmit = (values: UpdateAccountFormValues) => {
    console.log("[LOG] - user-settings-my-account.tsx:48 - handleUpdateAccountSubmit - values:", values)
  }

  return (
    <UserSettingsContainer>
      <UserSettingsTitle>My Account</UserSettingsTitle>
      <UserSettingsContent className='flex flex-col gap-8'>
        <section className='flex items-center gap-4'>
          <UserAvatar
            user={user}
            avatarProps={{ className: "h-20 w-20" }}
            avatarFallbackProps={{ className: "text-xl" }}
            hiddenUserStatus
          />
          <Form {...formUpdateAccount}>
            <form onSubmit={formUpdateAccount.handleSubmit(handleUpdateAccountSubmit)}>
              <FormField
                control={formUpdateAccount.control}
                name='username'
                render={({ field, formState: { isDirty } }) => (
                  <FormItem>
                    <FormLabel>Also known as</FormLabel>
                    <FormControl className='flex flex-col gap-2'>
                      <div className='flex flex-col'>
                        <div className='flex items-center gap-2'>
                          <Input
                            {...field}
                            placeholder='e.g. code_ninja123'
                            maxLength={32}
                          />
                          {isDirty && (
                            <div className='flex items-center gap-1'>
                              <Button>OK</Button>
                              <Button variant="outline" onClick={() => formUpdateAccount.resetField(field.name)}>Cancel</Button>
                            </div>
                          )}
                        </div>
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </section>
        <section>
          <UserSettingsTitle>Account security</UserSettingsTitle>
          <UserSettingsItem
            title='Password'
            description='Change your password to login to your account.'
          >
            <Button>Change password</Button>
          </UserSettingsItem>
        </section>
        <section>
          <UserSettingsTitle>Support</UserSettingsTitle>
          <UserSettingsItem
            title='Delete my account'
            description='Permanently delete the account and remove access from all workspaces.'
          >
            <Button variant="destructive">Delete my account</Button>
          </UserSettingsItem>
        </section>
      </UserSettingsContent>
    </UserSettingsContainer>
  )
}
