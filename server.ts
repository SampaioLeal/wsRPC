import { sendMessage } from "./messages.ts";
import { parseMessage } from "./messages.ts";
import { RPCMessage, RPCServerOptions } from "./types.ts";

export function initializeServer(options: RPCServerOptions) {
  console.log("Initializing WebSocket Server");

  const server = Deno.serve({
    hostname: "0.0.0.0",
    ...options,
  }, (req) => {
    if (req.headers.get("upgrade") != "websocket") {
      return new Response(null, { status: 501 });
    }

    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.addEventListener("message", async (event) => {
      const message = parseMessage(event.data) as RPCMessage;
      const service = options.services.get(message.service);

      if (!service) {
        return sendMessage(socket, {
          id: message.id,
          payload: `Service ${message.service} not found!`,
          ok: false,
        });
      }

      try {
        const response = await service(...message.args);

        sendMessage(socket, { id: message.id, payload: response, ok: true });
      } catch (error) {
        sendMessage(socket, {
          id: message.id,
          payload: error.message || "Unknown Error",
          ok: false,
        });
      }
    });

    return response;
  });

  return server;
}
