"use client";

import { useSocket } from "@/core/components/providers/socket-io-client";
import useSocketEvent from "@/core/hooks/use-socket-event";
import { ChatEvent } from "@/features/chat/constants/chat-events";
import chatSocketApi from "@/features/chat/services/chat-socket-api";
import React, { useState } from "react";

type ChatHeaderTitleProps = {
  conversationId: string;
};

export default function ChatHeaderTitle({ conversationId }: ChatHeaderTitleProps) {
  const isNewConversation = conversationId.toLowerCase().includes("new");
  const [participantName, setParticipantName] = useState<string>("");

  const { socket } = useSocket();

  useSocketEvent({
    event: ChatEvent.GetConverstaionParticipant,
    initial: async () => {
      if (isNewConversation) return;

      console.log(
        "[LOG] - chat-header-title.tsx:22 - ChatHeaderTitle - isNewConversation:",
        isNewConversation
      );
      console.log(
        "[LOG] - chat-header-title.tsx:14 - ChatHeaderTitle - conversationId:",
        conversationId
      );
      const response = await chatSocketApi.getConverstaionParticipant(socket, { conversationId });
      console.log("[LOG] - chat-header-title.tsx:26 - ChatHeaderTitle - response:", response);
    },
    onEvent: () => {}
  });

  return <span className="font-bold">{participantName}</span>;
}
