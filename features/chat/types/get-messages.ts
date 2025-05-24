export type GetMessagesDTO = {
  messageId?: string;
  requesterId?: string;
  conversationId: string;
  offset?: number;
  limit?: number;
}

export type GetMessagesResponse = {

}