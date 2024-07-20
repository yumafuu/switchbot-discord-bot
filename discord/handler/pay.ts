import { Context } from "../bot.ts";
import { GetPartner, SendCredit } from "../../pay/index.ts";

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
    if (!payMatch && !payGet) return;

    if (payMatch) {
      const credit = Number(payMatch[1]);
      const from = messageSender;
      const to = GetPartner(messageSender);
      SendCredit(from, to, credit);
    }

    if (payGet) {
      const credit = Number(payGet[1]);
      const from = GetPartner(messageSender);
      const to = messageSender;
      SendCredit(from, to, credit);
    }
  }
}
