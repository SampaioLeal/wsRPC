import { RPCMessage, RPCReply } from "./types.ts";

export function sendMessage(socket: WebSocket, message: RPCMessage | RPCReply) {
  socket.send(JSON.stringify(message));
}

export function parseMessage(message: string) {
  return JSON.parse(message) as RPCMessage | RPCReply;
}
