"use client"

// core
import React, { useEffect, useRef, useState } from 'react'
import { useSocket } from '@/core/components/providers/socket-io-client';

// components
import ChatInput from '@/features/chat/components/chat-input';
import UserAvatar from '@/features/chat/components/user-avatar';
import { ChatMessage, ChatMessageHeader } from '@/features/chat/components/chat-message';

// utils
import { cn } from '@/core/lib/utils';
import { getMessages, sendMessage } from '@/features/chat/utils/chat-actions';

// constants
import { ChatEvent } from '@/features/chat/constants/chat-events';

// types
import type { Session } from 'next-auth';
import type { SendMessageDTO } from '@/features/chat/types/send-message';

type ChatProps = {
  rootClassName?: string;
  user?: Session["user"];
  conversationId?: string;
};

export default function Chat({
  rootClassName,
  user,
  conversationId,
}: ChatProps) {
  const { socket } = useSocket();

  const [messages, setMessages] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    async function initial() {
      if (conversationId) {
        const response = await getMessages(socket, { conversationId });
        setMessages(response);
        setInitialLoading(false);
      }
    }

    function onGetMessages(newMessage: any) {
      setMessages((prevMessages) => [...newMessage, ...prevMessages])
    }

    function attachEvents() {
      socket.on(ChatEvent.GetMessages, onGetMessages)
    }

    function detachEvents() {
      socket.off(ChatEvent.GetMessages, onGetMessages);
    }

    attachEvents();
    initial()
    return () => detachEvents()
  }, [conversationId, socket]);

  return (
    <section className={cn("flex flex-col flex-1", rootClassName)}>
      <section className='flex flex-col-reverse h-[calc(100dvh-137px)] overflow-y-auto'>
        {messages?.map?.((message) => (
          <div key={message?.id} className="flex gap-4 mt-4" >
            <div>
              <UserAvatar
              />
            </div>
            <div className="flex flex-col flex-1">
              <ChatMessageHeader
                aka={message?.sender?.aka}
                timestamp={new Date(message?.sentAt).toLocaleString()}
              />

              <ChatMessage
                message={message?.content}
              />
            </div>
          </div>
        ))}
      </section>
      <div className='flex items-center gap-2'>
        <ChatInput
          onSubmit={async ({ content }, form) => {
            const sendMessageDTO: SendMessageDTO = {
              content,
              conversationId: conversationId || "",
              senderId: user?.id || "",
            }

            form.reset();
            const newMessage = await sendMessage(socket, sendMessageDTO);
            setMessages((prevMessages) => [...newMessage, ...prevMessages])
          }}
        />
      </div>
    </section>
  );
}
