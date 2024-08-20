import { Context } from "../bot.ts";

export class PayHandler {
  async Handle(ctx: Context) {
    const message = ctx.Payload.Message;
    const messageSender = ctx.Payload.UserId;

    const payMatch = message.match(/(\d+)円(送る|おくる|払う)/);
    const payGet = message.match(/(\d+)円もらう/);

    if (payMatch) {
      const credit = Number(payMatch[1]);
      const from = ctx.Pay.GetMe(messageSender);
      const to = ctx.Pay.GetPartner(messageSender);

      await ctx.Pay.SendCredit(from, to, credit);
      ctx.DiscordBot.sendMessage(
        ctx.Payload.Channel,
        `${credit}円送りました`,
      );
      await this.notifyCurrentStatus(ctx);
    }

    if (payGet) {
      const credit = Number(payGet[1]);
      const from = ctx.Pay.GetPartner(messageSender);
      const to = ctx.Pay.GetMe(messageSender);
      await ctx.Pay.SendCredit(from, to, credit);

      ctx.DiscordBot.sendMessage(
        ctx.Payload.Channel,
        `${credit}円受け取りました`,
      );
      await this.notifyCurrentStatus(ctx);
    }

    if (message === "支払い確認") {
      await this.notifyCurrentStatus(ctx);
    }

    if (message === "支払いリセット") {
      ctx.Pay.Reset();
      ctx.DiscordBot.sendMessage(
        ctx.Payload.Channel,
        "支払いをリセットしました",
      );

      await this.notifyCurrentStatus(ctx);
    }
  }

  async notifyCurrentStatus(ctx: Context) {
    const users = await ctx.Pay.GetUsers();
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

    ctx.DiscordBot.sendMessage(
      ctx.Payload.Channel,
      message,
    );
  }
}
