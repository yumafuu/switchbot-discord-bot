import { SwitchBot } from "./switch-bot/switch-bot.ts";
import { DiscordBot } from "./discord/bot.ts";
import { Pay } from "./pay/pay.ts";
import { Pill } from "./pill/pill.ts";
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
const pill = new Pill(db);
const discordBot = new DiscordBot(
  switchBot,
  pay,
  pill,
  config.DiscordBotToken,
);

Deno.cron("Pill Morning", "0 23 * * *", async () => {
  await discordBot.NotifyMorningPillCheck();
});

Deno.cron("Pill Remind", "0 10 * * *", async () => {
  await discordBot.NotifyRemindPillCheck();
});

await discordBot.Run();
