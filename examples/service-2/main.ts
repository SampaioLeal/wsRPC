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
  port: 3002,
  services,
});

const service1 = await initializeClient({
  host: "ws://localhost:3001",
});

const service3 = await initializeClient({
  host: "ws://localhost:3003",
});

console.log("Connected to servers!");

const helloResponse1 = await service1.hello("service-2");
console.log(helloResponse1);

const helloResponse3 = await service3.hello("service-2");
console.log(helloResponse3);
