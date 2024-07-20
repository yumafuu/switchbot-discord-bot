import { Context } from "../bot.ts";

export class SwitchBotHandler {
  ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  async Handle() {
    const message = this.ctx.Payload.Message;
    switch (message) {
      case "電気けして":
        Promise.all([
          this.ctx.SwitchBot.StandLightActive(false),
          this.ctx.SwitchBot.LivingRoomLightActive(false),
        ]);
        this.ctx.DiscordBot.sendMessage(this.ctx.Payload.Channel, "けしたよ");
        break;
      case "リラックスモード":
        Promise.all([
          this.ctx.SwitchBot.StandLightActive(true),
          this.ctx.SwitchBot.LivingRoomLightActive(false),
        ]);
        this.ctx.DiscordBot.sendMessage(
          this.ctx.Payload.Channel,
          "リラックスしてね",
        );
        break;
      case "スタンドけして":
        Promise.all([
          this.ctx.SwitchBot.StandLightActive(false),
        ]);
        this.ctx.DiscordBot.sendMessage(this.ctx.Payload.Channel, "けしたよ");
        break;
      case "リビングけして":
        Promise.all([
          this.ctx.SwitchBot.LivingRoomLightActive(false),
        ]);
        this.ctx.DiscordBot.sendMessage(this.ctx.Payload.Channel, "けしたよ");
        break;
      case "リビングつけて":
        Promise.all([
          this.ctx.SwitchBot.LivingRoomLightActive(true),
        ]);
        this.ctx.DiscordBot.sendMessage(this.ctx.Payload.Channel, "あいよ");
        break;
      case "ドライつけて":
        Promise.all([
          this.ctx.SwitchBot.AirConditionerActive({
            active: true,
            temperature: 25,
            mode: "dry",
            speed: "medium",
          }),
        ]);
        this.ctx.DiscordBot.sendMessage(this.ctx.Payload.Channel, "あいよ");
        break;
      case "冷房つけて":
        Promise.all([
          this.ctx.SwitchBot.AirConditionerActive({
            active: true,
            temperature: 25,
            mode: "cool",
            speed: "auto",
          }),
        ]);
        this.ctx.DiscordBot.sendMessage(this.ctx.Payload.Channel, "あいよ");
        break;
      case "エアコンけして":
        Promise.all([
          this.ctx.SwitchBot.AirConditionerActive({
            active: false,
            temperature: 25,
            mode: "cool",
            speed: "auto",
          }),
        ]);
        this.ctx.DiscordBot.sendMessage(this.ctx.Payload.Channel, "あいよ");
        break;
    }
  }
}
