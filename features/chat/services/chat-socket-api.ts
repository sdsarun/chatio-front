// core
import { Socket } from "socket.io-client";
import { socketRequest } from "@/core/utils/socket";

// constants
import { ChatEvent } from "@/features/chat/constants/chat-events";
import { UserEvent } from "@/features/chat/constants/user-events.constant";

// types
import type { SendMessageDTO } from "@/features/chat/types/send-message";
import type { GetMessagesDTO } from "@/features/chat/types/get-messages";
import type { Message } from "@/features/chat/types/matching";
import type {
  GetUserStatusByUserIdDTO,
  UserConnection
} from "@/features/chat/types/get-user-status-by-user-id";
import type { UpdateUserConnectionStatusDTO } from "@/features/chat/types/update-user-connection-status";

const chatSocketApi = {
  sendMessage: (socket: Socket, dto: SendMessageDTO) =>
    socketRequest<SendMessageDTO>(socket, ChatEvent.SendMessage, dto),
  getMessages: (socket: Socket, dto: GetMessagesDTO) =>
    socketRequest<GetMessagesDTO, Message[]>(socket, ChatEvent.GetMessages, dto),
  getUserStatusByUserId: (socket: Socket, dto: GetUserStatusByUserIdDTO) =>
    socketRequest<GetUserStatusByUserIdDTO, UserConnection>(
      socket,
      UserEvent.GetUserStatusByUserId,
      dto
    ),
  updateUserConnectionStatus: (socket: Socket, dto: UpdateUserConnectionStatusDTO) =>
    socketRequest<UpdateUserConnectionStatusDTO, UserConnection>(
      socket,
      UserEvent.UpdateUserConnectionStatus,
      dto
    ),
  skipStranger: (socket: Socket, dto: any) => socketRequest(socket, ChatEvent.SkipStranger, dto)
} as const;

export default chatSocketApi;
