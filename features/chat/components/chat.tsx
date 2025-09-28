"use client";

// core
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// components
import ChatInput from "@/features/chat/components/chat-input";
import UserAvatar from "@/features/chat/components/user-avatar";
import { Button } from "@/core/components/ui/button";
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
import type { MatchingStrangerResponse, Message } from "@/features/chat/types/matching";
import type { MatchingStatus } from "@/features/chat/components/matching-chat";

type ChatProps = {
  rootClassName?: string;
  user?: Session["user"];
  conversationId?: string;
};

export default function Chat({ rootClassName, user, conversationId }: ChatProps) {
  const router = useRouter();
  const { socket } = useSocket();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [buttonState, setButtonState] = useState<"start" | "skip" | "confirm">("start");
  const [matchingStatus, setMatchingStatus] = useState<MatchingStatus>("idle");
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
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight
      });
    }
  });

  useSocketEvent({
    event: ChatEvent.MatchedStranger,
    onEvent: ({ status, conversation }: MatchingStrangerResponse) => {
      setMatchingStatus(status as MatchingStatus);
      router.replace(`/c/${conversation.id}`);
    }
  });

  return (
    <section className={cn("flex flex-col flex-1", rootClassName)}>
      <section
        ref={chatContainerRef}
        className="flex flex-col-reverse h-[calc(100dvh-137px)] overflow-y-auto"
      >
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
        <Button
          isLoading={matchingStatus === "matching"}
          variant={buttonState === "confirm" ? "destructive" : "default"}
          onClick={async () => {
            if (buttonState === "start") {
              setMatchingStatus("matching");
              const response = await chatSocketApi.matchingStranger(socket);
              setMatchingStatus(response?.data?.status as MatchingStatus);
              return;
            }

            if (buttonState === "skip") {
              setButtonState("confirm");
              return;
            }

            if (buttonState === "confirm") {
              try {
                await chatSocketApi.skipStranger(socket, {
                  conversationId,
                  userId: user?.id
                });

                setMessages([]);
                setButtonState("start");
                toast("Chat skipped. Start a new chat.");
              } catch (err: any) {
                toast(err?.message || "Failed to skip chat");
                setButtonState("start");
              }
            }
          }}
        >
          {buttonState === "start" ? "Start" : buttonState === "skip" ? "Skip" : "Confirm"}
        </Button>
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
