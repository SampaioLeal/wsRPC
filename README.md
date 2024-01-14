# wsRPC

A JavaScript library that allows servers to communicate via WebSockets

## Usage

You can start a wsRPC server with some services:

```ts
// Service 1
import { initializeServer } from "https://deno.land/x/wsrpc@0.0.1/mod.ts";

function helloService(clientName: string) {
  console.log(`${clientName} says hello!`);
}

const services = new Map();

services.set("hello", helloService);

initializeServer({
  port: 3000,
  services,
});
```

And initialize a client on another service and call the hello method:

```ts
import { initializeClient } from "https://deno.land/x/wsrpc@0.0.1/mod.ts";

const service1 = await initializeClient({
  host: "ws://localhost:3000",
});

const helloResponse = await service1.hello("service-2");
console.log(helloResponse);
```
