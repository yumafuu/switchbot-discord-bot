import { SwitchBot } from "./switch-bot.ts";
import { DiscordBot } from "./discord.ts";
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
const discordBot = new DiscordBot(
  switchBot,
  config.DiscordBotToken,
);

await discordBot.Run();
