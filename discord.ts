import {
  Bot,
  createBot,
  Intents,
  Message,
  startBot,
  User,
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { SwitchBot } from "./switch-bot.ts";
import { MessageHandler } from "./events.ts";
import config from "./config.ts";

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

  private eventHander() {
    return {
      ready: (_bot: Bot, payload: { user: User }) => {
        console.log(`${payload.user.username} is ready!`);
      },
      messageCreate: async (bot: Bot, message: Message) => {
        const handler = MessageHandler[message.content];
        if (handler) {
          Promise.all(handler.methods.map((method) => {
            return this.switchBot[method.method](...method.args);
          }));
          bot.helpers.sendMessage(message.channelId, {
            content: handler.message,
          });
        }

        if (message.content === "Botヘルプ") {
          bot.helpers.sendMessage(message.channelId, {
            content: Object.keys(MessageHandler).join("\n"),
          });
        }
      },
    };
  }
}
