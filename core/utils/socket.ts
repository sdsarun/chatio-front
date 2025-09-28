// core
import { Socket } from "socket.io-client";

// types
import type { WSResponse } from "@/core/types/ws-response";

export function socketRequest<TRequest = any, TResponse = any>(
  socket: Socket,
  event: string,
  payload?: TRequest
): Promise<WSResponse<TResponse>> {
  return socket.emitWithAck(event, payload);
}
