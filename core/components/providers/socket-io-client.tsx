"use client"

import socket from '@/core/lib/socket-io-client';
import { signOut, useSession } from 'next-auth/react';
// core
import React, { createContext, use, useEffect } from 'react'
import { Socket as SocketClient } from 'socket.io-client'

export type SocketIOClientContextValues = {
  socket: SocketClient;
}

const SocketIOClientContext = createContext({ socket } as SocketIOClientContextValues);
export const useSocket = () => {
  const context = use(SocketIOClientContext)
  if (!context) {
    throw new Error("useSocket must use inside SocketIOClientContext");
  }
  return context;
};

export default function SocketIOClientProvider({ children }: React.PropsWithChildren) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    function estabishConnection() {
      if (session?.token?.accessToken) {
        socket.auth = { token: session?.token?.accessToken };
        socket.connect()
      }
    }

    function onConnect() {
    }

    async function onDisconnect(reason: any) {
      if (!socket.active) {
        console.error("[LOG] - socket-io-client.tsx:35 - onDisconnect - reason:", reason)
        await signOut()
      }
    }

    function attachEvents() {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
    }

    function detachEvents() {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }

    attachEvents();
    estabishConnection();
    return () => detachEvents();
  }, [session?.token?.accessToken, status]);

  return (
    <SocketIOClientContext
      value={{ socket }}
    >{children}</SocketIOClientContext>
  )
}
