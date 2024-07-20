import { Context } from "../bot.ts";
import {
  GetPartner,
  GetMe,
  SendCredit,
  ShowCredit,
} from "../../pay/index.ts";

export class PayHandler {
  ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  async Handle() {
    const message = this.ctx.Payload.Message;
    const messageSender = this.ctx.Payload.UserId;

    const payMatch = message.match(/(\d+)円送る/);
    const payGet = message.match(/(\d+)円もらう/);

    if (payMatch) {
      const credit = Number(payMatch[1]);
      const from = GetMe(messageSender);
      const to = GetPartner(messageSender);

      await SendCredit(from, to, credit);
      this.ctx.DiscordBot.sendMessage(
        this.ctx.Payload.Channel,
        `${credit}円送りました`
      );
    }

    if (payGet) {
      const credit = Number(payGet[1]);
      const from = GetPartner(messageSender);
      const to = GetMe(messageSender);
      await SendCredit(from, to, credit);

      this.ctx.DiscordBot.sendMessage(
        this.ctx.Payload.Channel,
        `${credit}円受け取りました`,
      );
    }

    if (message === "残高確認") {
      const users = await ShowCredit();

      this.ctx.DiscordBot.sendMessage(
        this.ctx.Payload.Channel,
        users.map((user) => `${user.id}: ${user.credit}円`).join("\n"),
      )
    }
  }
}
