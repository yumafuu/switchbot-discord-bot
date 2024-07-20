import {
  Bot,
  createBot,
  Intents,
  Message,
  startBot,
  User,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { SwitchBot } from "../switch-bot/switch-bot.ts";
import { Handler } from "./handler/handler.ts";

export type Context = {
  DiscordBot: DiscordBot;
  SwitchBot: SwitchBot;
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

  constructor(switchBot: SwitchBot, token: string) {
    this.switchBot = switchBot;
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
        console.log(`${payload.user.username} is ready!`);
      },
      messageCreate: async (bot: Bot, message: Message) => {
        const ctx: Context = {
          DiscordBot: this,
          SwitchBot: this.switchBot,
          Payload: {
            bot,
            UserId: message.member.id,
            Message: message.content,
            Channel: message.channelId,
          },
        };

        console.log({ ctx });

        if (message.isFromBot) return;

        console.info(
          JSON.stringify({
            timestamp: new Date().toISOString(),
            id: Number(message.member.id),
            username: message.tag,
            content: message.content,
          }),
        );
        const handler = new Handler(ctx);
        await handler.Handle();
      },
    };
  }
}
