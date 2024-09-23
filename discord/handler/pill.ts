import { Context } from "../bot.ts";

export class PillHandler {
  async Handle(ctx: Context) {
    const message = ctx.Payload.Message;

    if (message === "のんだ" || message === "飲んだ") {
      await ctx.Pill.Take()
      await ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "ナイスです！");
    }

    if (message === "今日ピル飲んだ？") {
      const isTaken = await ctx.Pill.IsTakenToday()
      const message = isTaken ? "飲んだよ" : "まだ飲んでないよ"

      await ctx.DiscordBot.sendMessage(ctx.Payload.Channel, message);
    }
  }
}
