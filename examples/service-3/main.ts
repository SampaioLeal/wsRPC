import { initializeClient, initializeServer } from "../../mod.ts";
import Service1Contracts from "../contracts/service1.ts";
import Service2Contracts from "../contracts/service2.ts";

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
  port: 3003,
  services,
});

const service1 = await initializeClient<Service1Contracts>({
  host: "ws://localhost:3001",
});

const service2 = await initializeClient<Service2Contracts>({
  host: "ws://localhost:3002",
});

console.log("Connected to servers!");

console.time("request 1");
const helloResponse1 = await service1.hello("service-3");
console.timeEnd("request 1");
console.log(helloResponse1);

console.time("request 2");
const helloResponse2 = await service2.hello("service-3");
console.timeEnd("request 2");
console.log(helloResponse2);
