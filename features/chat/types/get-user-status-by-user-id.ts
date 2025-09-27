import type { UserConnectionStatus } from "@/features/chat/constants/user-connection-status.constant";

export type GetUserStatusByUserIdDTO = {
  userId: string;
};

export type UserConnections = Record<
  string,
  {
    clientId: string;
    userId: string;
    username: string;
    connectionStatus: UserConnectionStatus;
  }
>;

export type UserConnection = UserConnections[string];