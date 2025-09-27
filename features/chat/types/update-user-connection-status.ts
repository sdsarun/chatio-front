import { UserConnectionStatus } from "@/features/chat/constants/user-connection-status.constant";

export type UpdateUserConnectionStatusDTO = {
  userId: string;
  connectionStatus: UserConnectionStatus;
};
