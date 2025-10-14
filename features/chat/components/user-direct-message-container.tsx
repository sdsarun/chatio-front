"use client";

// core
import { use } from "react";

// components
import UserDirectMessageList from "@/features/chat/components/user-direct-message-list";

export type UserDirectMessageContainerProps = {
  directMessagesPromise: Promise<Record<string, any>[]>;
};

export default function UserDirectMessageContainer({
  directMessagesPromise
}: UserDirectMessageContainerProps) {
  const directMessages = use(directMessagesPromise);

  return (
    <section className="flex flex-col gap-2">
      <UserDirectMessageList
        directMessages={directMessages}
        rootClassName="max-h-[calc(100dvh-260px)] overflow-y-auto overflow-x-hidden pr-1"
      />
    </section>
  );
}
