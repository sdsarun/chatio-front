"use client";

// core
import React, { useState } from "react";

// components
import ChatInput from "@/features/chat/components/chat-input";
import UserAvatar from "@/features/chat/components/user-avatar";
import { ChatMessage, ChatMessageHeader } from "@/features/chat/components/chat-message";
import { UserChatingSkeleton } from "@/features/chat/components/skeleton";

// utils
import { cn } from "@/core/lib/utils";

// constants
import { ChatEvent } from "@/features/chat/constants/chat-events";

// hooks
import { useSocket } from "@/core/components/providers/socket-io-client";
import useSocketEvent from "@/core/hooks/use-socket-event";

// service
import chatSocketApi from "@/features/chat/services/chat-socket-api";

// types
import type { Session } from "next-auth";
import type { SendMessageDTO } from "@/features/chat/types/send-message";
import type { Message } from "@/features/chat/types/matching";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ChatProps = {
  rootClassName?: string;
  user?: Session["user"];
  conversationId?: string;
};

export default function Chat({ rootClassName, user, conversationId }: ChatProps) {
  const router = useRouter();
  const { socket } = useSocket();

  const [messages, setMessages] = useState<Message[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useSocketEvent({
    event: ChatEvent.GetMessages,
    initial: async () => {
      if (conversationId) {
        try {
          const { data, error } = await chatSocketApi.getMessages(socket, {
            conversationId,
            requesterId: user?.id
          });

          if (error && error.statusCode === 403) {
            toast(error.message);
            router.replace("/c/new");
          } else {
            setMessages(data!);
          }

          setInitialLoading(false);
        } catch {}
      }
    },
    onEvent: (newMessages: Message[]) => {
      setMessages((prevMessages) => [...newMessages, ...prevMessages]);
    }
  });

  return (
    <section className={cn("flex flex-col flex-1", rootClassName)}>
      <section className="flex flex-col-reverse h-[calc(100dvh-137px)] overflow-y-auto">
        {initialLoading ? (
          <UserChatingSkeleton />
        ) : (
          <>
            {messages?.map?.((message) => (
              <div key={message?.id} className="flex gap-4 mt-4">
                <div>
                  <UserAvatar user={message?.sender} />
                </div>
                <div className="flex flex-col flex-1">
                  <ChatMessageHeader
                    aka={message?.sender?.aka}
                    timestamp={new Date(message?.sentAt).toLocaleString()}
                  />
                  <ChatMessage message={message?.content} />
                </div>
              </div>
            ))}
          </>
        )}
      </section>
      <div className="flex items-center gap-2">
        <ChatInput
          onSubmit={async ({ content }, form) => {
            const sendMessageDTO: SendMessageDTO = {
              content,
              conversationId: conversationId || "",
              senderId: user?.id || ""
            };

            form.reset();
            chatSocketApi.sendMessage(socket, sendMessageDTO);
          }}
        />
      </div>
    </section>
  );
}
