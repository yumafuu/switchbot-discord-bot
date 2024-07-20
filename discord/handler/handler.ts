import { Context } from "../bot.ts";
import { SwitchBotHandler } from "./switch-bot.ts";
import { PayHandler } from "./pay.ts";

export class Handler {
  ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  async Handle() {
    const switchBotHandler = new SwitchBotHandler(this.ctx);
    const payHandler = new PayHandler(this.ctx);

    Promise.all([
      switchBotHandler.Handle(),
      payHandler.Handle(),
    ]);
  }
}
