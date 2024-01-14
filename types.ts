export interface RPCMessage {
  id: string;
  service: string;
  args: unknown[];
}

export interface RPCReply {
  id: string;
  ok: boolean;
  payload: unknown;
}

export type RPCService = <T extends RPCReply>(...args: unknown[]) => Promise<T>;

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
