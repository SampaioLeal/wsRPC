import { initializeClient, initializeServer } from "../../mod.ts";

/**
 * Services
 */

const services = new Map();

function helloService(clientName: string) {
  console.log(`${clientName} says hello!`);
}
services.set("hello", helloService);

/**
 * Server Initialization
 */

initializeServer({
  port: 3001,
  services,
});

const service2 = await initializeClient({
  host: "ws://localhost:3002",
});

const service3 = await initializeClient({
  host: "ws://localhost:3003",
});

console.log("Connected to servers!");

const helloResponse2 = await service2.hello("service-1");
console.log(helloResponse2);

const helloResponse3 = await service3.hello("service-1");
console.log(helloResponse3);
