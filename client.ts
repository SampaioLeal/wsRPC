import { parseMessage, sendMessage } from "./messages.ts";
import { RPCClientOptions, RPCReply, RPCService } from "./types.ts";

export async function initializeClient<
  Contracts extends Record<string, RPCService>,
>(
  options: RPCClientOptions,
): Promise<Contracts> {
  const ws = new WebSocket(options.host);
  const call = (service: string, ...args: never[]) => {
    return new Promise<RPCReply>((resolve) => {
      const controller = new AbortController();
      const messageId = crypto.randomUUID();

      sendMessage(ws, {
        id: messageId,
        service,
        args,
      });

      ws.addEventListener("message", (event) => {
        const data = event.data as string;
        const message = parseMessage(data) as RPCReply;
        if (message.id !== messageId) return;

        controller.abort();
        resolve(message);
      }, { signal: controller.signal });
    });
  };
  const callService = (service: string) => {
    return (...args: never[]) => {
      return call(service, ...args);
    };
  };
  const proxyHandler: ProxyHandler<Record<string, RPCService>> = {
    get: (target, name: string) => {
      if (name === "then") {
        return target[name];
      }

      return Object.prototype.hasOwnProperty.call(target, name)
        ? target[name]
        : callService(name);
    },
  };
  // deno-lint-ignore no-explicit-any
  const proxy = new Proxy({ call } as any, proxyHandler);

  await new Promise<void>((resolve) => {
    ws.onopen = (_ev) => {
      resolve();
    };
  });

  return proxy as Contracts;
}
