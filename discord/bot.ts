import {
  Bot,
  createBot,
  Intents,
  Message,
  startBot,
  User,
} from "discordeno";
import { SwitchBot } from "../switch-bot/switch-bot.ts";
import { Pay } from "../pay/pay.ts";
import { PayHandler, SwitchBotHandler } from "./handler/index.ts";
import { Logger } from "../logger/logger.ts";

export type Context = {
  DiscordBot: DiscordBot;
  SwitchBot: SwitchBot;
  Pay: Pay;
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
  private pay: Pay;

  constructor(switchBot: SwitchBot, pay: Pay, token: string) {
    this.switchBot = switchBot;
    this.pay = pay;
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
          }),
        );
        const switchBotHandler = new SwitchBotHandler(ctx);
        const payHandler = new PayHandler(ctx);

        Promise.all([
          switchBotHandler.Handle(),
          payHandler.Handle(),
        ]);
      },
    };
  }
}
