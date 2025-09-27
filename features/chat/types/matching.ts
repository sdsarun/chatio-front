import type { User } from "@/core/services/graphql/graphql";

export interface MatchingStrangerResponse {
  status: string;
  conversation: Conversation;
  participants: Participant[];
}

export interface Conversation {
  id: string;
  conversationTypeId: string;
  createdAt: Date;
  deletedAt: null;
}

export interface Participant {
  id: string;
  conversationId: string;
  userId: string;
  joinedAt: Date;
  leftAt: null;
}

export interface MessageRead {
  id: string;
  messageId: string | null;
  userId: string | null;
  readAt: string | null;
  message?: Message;
  user?: User;
}

export interface Message {
  id: string;
  senderId: string | null;
  conversationId: string | null;
  content: string;
  sentAt: string;
  updatedAt: string;
  deletedAt: string | null;
  sender?: User;
  conversation?: Conversation;
  messageReads?: MessageRead[];
}
