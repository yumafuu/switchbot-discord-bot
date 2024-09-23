import { Context } from "../bot.ts";

export class PillHandler {
  Handle(ctx: Context) {
    const message = ctx.Payload.Message;

    if (message === "のんだ" || message === "飲んだ") {
      ctx.Pill.Take()
      ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "ナイスです！");
    }
  }
}
