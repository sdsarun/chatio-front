// core
import { Socket } from "socket.io-client";

// constants
import { ChatEvent } from "@/features/chat/constants/chat-events";

// types
import type { SendMessageDTO } from "@/features/chat/types/send-message";
import type { GetMessagesDTO } from "@/features/chat/types/get-messages";

export function sendMessage(socket: Socket, dto: SendMessageDTO): Promise<any> {
  return socket.emitWithAck(ChatEvent.SendMessage, dto);
}

export function getMessages(socket: Socket, dto: GetMessagesDTO): Promise<any> {
  return socket.emitWithAck(ChatEvent.GetMessages, dto);
}