import React, { createContext, use } from 'react'

export type ChatContextValues = {
  
}

export const ChatContext = createContext<ChatContextValues | null>(null)
export const useChat = () => {
  const contextValue = use(ChatContext)
  if (!contextValue) throw new Error("useChat should use inside ChatContext.");
  return contextValue;
};

export function ChatProvider({ children }: React.PropsWithChildren) {
  return (
    <ChatContext value={{}}>{children}</ChatContext>
  )
}
