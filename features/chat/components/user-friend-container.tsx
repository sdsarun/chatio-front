"use client"

// core
import React, { use, useState } from 'react'

// components
import { ButtonSelectGroup } from '@/core/components/ui/button-select-group'
import { SidebarInput } from '@/core/components/ui/sidebar'
import UserFriendList from '@/features/chat/components/user-friend-list';

export type UserFriendContainerProps = {
  friendsPromise: Promise<Record<string, any>[]>;
}

export default function UserFriendContainer({
  friendsPromise,
}: UserFriendContainerProps) {
  const friends = use(friendsPromise);

  const [friendFilterType, setFriendFilterType] = useState<string>("");
  console.log("[LOG] - user-friend-container.tsx:21 - friendFilterType:", friendFilterType)

  return (
    <section className='flex flex-col gap-2'>
      <ButtonSelectGroup
        rootClassName='flex items-center gap-2 overflow-auto'
        defaultValue={["online"]}
        items={[
          {
            label: "Online",
            value: "online"
          },
          {
            label: "All",
            value: "all"
          },
          {
            label: "Pending",
            value: "pending"
          },
        ]}
        requireSelection
        onChange={([filterSelected]) => setFriendFilterType(filterSelected.toString())}
      />
      <SidebarInput
        placeholder='Search Friends'
        className='h-9'
      />
      <UserFriendList
        rootClassName='max-h-[calc(100dvh-260px)] overflow-y-auto overflow-x-hidden pr-1'
        friends={friends}
      />
    </section>
  )
}
