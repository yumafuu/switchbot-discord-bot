import { Client } from "./switch-bot.ts";

const devices = await Client("/v1.1/devices").get();
console.log(JSON.stringify(devices));
