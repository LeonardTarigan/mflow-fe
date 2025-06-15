// lib/socket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

    if (!wsUrl) {
      throw new Error("Websocket URL is not defined in the environment");
    }

    socket = io(wsUrl, {
      transports: ["websocket"],
    });
  }

  return socket;
}
