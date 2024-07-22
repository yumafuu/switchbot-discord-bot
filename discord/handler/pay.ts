import { Context } from "../bot.ts";

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
      const from = this.ctx.Pay.GetMe(messageSender);
      const to = this.ctx.Pay.GetPartner(messageSender);

      await this.ctx.Pay.SendCredit(from, to, credit);
      this.ctx.DiscordBot.sendMessage(
        this.ctx.Payload.Channel,
        `${credit}円送りました`,
      );
    }

    if (payGet) {
      const credit = Number(payGet[1]);
      const from = this.ctx.Pay.GetPartner(messageSender);
      const to = this.ctx.Pay.GetMe(messageSender);
      await this.ctx.Pay.SendCredit(from, to, credit);

      this.ctx.DiscordBot.sendMessage(
        this.ctx.Payload.Channel,
        `${credit}円受け取りました`,
      );
    }

    if (message === "支払い確認") {
      const users = await this.ctx.Pay.GetUsers();

      const credits = users.map((user) => `${user.id}: ${user.credit}円`).join(
        "\n",
      );
      const negativeUser = users.find((user) => user.credit < 0);
      const message = `現在
\`\`\`
${credits}
\`\`\`

${
        negativeUser
          ? `${negativeUser.id}が${-negativeUser.credit}円払ってください`
          : ""
      }
`;

      this.ctx.DiscordBot.sendMessage(
        this.ctx.Payload.Channel,
        message,
      );
    }

    if (message === "支払いリセット") {
      this.ctx.Pay.Reset();
      this.ctx.DiscordBot.sendMessage(
        this.ctx.Payload.Channel,
        "支払いをリセットしました",
      );
    }
  }
}
