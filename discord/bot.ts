import { Bot, createBot, Intents, Message, startBot, User } from "discordeno";
import { SwitchBot } from "../switch-bot/switch-bot.ts";
import { Pay } from "../pay/pay.ts";
import { Pill } from "../pill/pill.ts";
import { PayHandler, SwitchBotHandler, PillHandler } from "./handler/index.ts";
import { Logger } from "../logger/logger.ts";

export type Context = {
  DiscordBot: DiscordBot;
  SwitchBot: SwitchBot;
  Pay: Pay;
  Pill: Pill;
  Payload: {
    bot: Bot;
    UserId: string;
    Message: string;
    Channel: string;
  };
};

export class DiscordBot {
  private switchBot: SwitchBot;
  private bot: Bot;
  private pill: Pill;
  private pay: Pay;

  private pillCheckChannelID = String(1285366592095387710n);
  private dietChannelID = String(1264845973889482806n);

  constructor(switchBot: SwitchBot, pay: Pay, pill: Pill, token: string) {
    this.switchBot = switchBot;
    this.pay = pay;
    this.pill = pill;
    this.bot = createBot({
      token,
      intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
      events: this.eventHander(),
    });
  }

  async Run() {
    await startBot(this.bot);
  }

  async sendMessage(channelId: string, message: string) {
    await this.bot.helpers.sendMessage(channelId, {
      content: message,
    });
  }

  private eventHander() {
    return {
      ready: (_bot: Bot, payload: { user: User }) => {
        Logger.debug(`${payload.user.username} is ready!`);
      },
      messageCreate: (bot: Bot, message: Message) => {
        const ctx: Context = {
          DiscordBot: this,
          SwitchBot: this.switchBot,
          Pay: this.pay,
          Pill: this.pill,
          Payload: {
            bot,
            UserId: message.tag,
            Message: message.content,
            Channel: String(message.channelId),
          },
        };

        if (message.isFromBot) return;

        Logger.info(
          JSON.stringify({
            timestamp: new Date().toISOString(),
            username: message.tag,
            content: message.content,
            channel: String(message.channelId),
          }),
        );
        const switchBotHandler = new SwitchBotHandler();
        const payHandler = new PayHandler();
        const pillHandler = new PillHandler();

        Promise.all([
          switchBotHandler.Handle(ctx),
          payHandler.Handle(ctx),
          pillHandler.Handle(ctx),
        ]);
      },
    };
  }

  async NotifyMorningPillCheck() {
    const taken = await this.pill.IsTakenToday();

    let message = "今日もピル飲んでね！";
    if (taken) {
      message = "もう飲んでてえらい！"
    }
    await this.sendMessage(this.pillCheckChannelID, message);
  }

  async NotifyRemindPillCheck() {
    const taken = await this.pill.IsTakenToday();

    if (!taken) {
      const message = `まだ飲んでないよ\n忘れずに飲んでね`;
      await this.sendMessage(this.pillCheckChannelID, message);
    }
  }

  async NotifyDiet() {
    const message = "今日もダイエット頑張ろう！";
    await this.sendMessage(this.dietChannelID, message);
  }
}
