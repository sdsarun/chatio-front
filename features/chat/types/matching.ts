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