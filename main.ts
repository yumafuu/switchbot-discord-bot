import { SwitchBot } from "./switch-bot/switch-bot.ts";
import { DiscordBot } from "./discord/bot.ts";
import { Pay } from "./pay/pay.ts";
import { DB } from "./db/db.ts";
import config from "./config.ts";

const switchBot = new SwitchBot(
  config.SwitchBotAccessToken,
  config.SwitchBotClientSecret,
  {
    airConditioner: config.SwitchBotDeviceAirConditioner,
    livingRoomLight: config.SwitchBotDeviceLivingRoomLight,
    standLightTop: config.SwitchBotDeviceStandLightTop,
    standLightBottom: config.SwitchBotDeviceStandLightBottom,
  },
);

const db = new DB();
const pay = new Pay(db);
const discordBot = new DiscordBot(
  switchBot,
  pay,
  config.DiscordBotToken,
);

await discordBot.Run();
