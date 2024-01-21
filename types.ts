export interface RPCMessage {
  id: string;
  service: string;
  args: never[];
}

export interface RPCReply<T = unknown> {
  id: string;
  ok: boolean;
  payload: T;
}

export type RPCService = (...args: never[]) => Promise<RPCReply>;

export interface RPCServerOptions extends Deno.ServeOptions {
  port: number;
  services: Map<string, RPCService>;
}

export interface RPCClientOptions {
  host: string;
}

export type RPCClient<T extends Record<string, unknown>> = T & {
  call: (service: string, ...args: unknown[]) => null;
};
