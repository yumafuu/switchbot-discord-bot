import { Context } from "../bot.ts";

type EventFunc = (ctx: Context) => Promise<void>;

export class SwitchBotHandler {
  LightOff = async (ctx: Context) => {
    await Promise.all([
      ctx.SwitchBot.StandLightActive(false),
      ctx.SwitchBot.LivingRoomLightActive(false),
    ]);
    ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "けしたよ");
  };

  RelaxMode = async (ctx: Context) => {
    await Promise.all([
      ctx.SwitchBot.StandLightActive(true),
      ctx.SwitchBot.LivingRoomLightActive(false),
    ]);
    ctx.DiscordBot.sendMessage(
      ctx.Payload.Channel,
      "リラックスしてね",
    );
  };

  CoolerOn = async (ctx: Context) => {
    await Promise.all([
      ctx.SwitchBot.AirConditionerActive({
        active: true,
        temperature: 25,
        mode: "cool",
        speed: "auto",
      }),
    ]);
    ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "あいよ");
  };

  BotHelp = async (ctx: Context) => {
    const message = Object.keys(this.events).join("\n");
    await ctx.DiscordBot.sendMessage(ctx.Payload.Channel, message);
  };

  AirConditionerOff = async (ctx: Context) => {
    await Promise.all([
      ctx.SwitchBot.AirConditionerActive({
        active: false,
        temperature: 25,
        mode: "cool",
        speed: "auto",
      }),
    ]);
    ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "あいよ");
  };

  DryOn = async (ctx: Context) => {
    await Promise.all([
      ctx.SwitchBot.AirConditionerActive({
        active: true,
        temperature: 25,
        mode: "dry",
        speed: "high",
      }),
    ]);
    ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "あいよ");
  }

  events: { [key: string]: EventFunc } = {
    "電気けして": this.LightOff,
    "電気消して": this.LightOff,
    "おやすみ": this.LightOff,
    "リラックスモード": this.RelaxMode,
    "リラックス": this.RelaxMode,
    "冷房つけて": this.CoolerOn,
    "クーラーつけて": this.CoolerOn,
    "冷房とめて": this.AirConditionerOff,
    "エアコンとめて": this.AirConditionerOff,
    "クーラーとめて": this.AirConditionerOff,
    "冷房止めて": this.AirConditionerOff,
    "エアコン止めて": this.AirConditionerOff,
    "クーラー止めて": this.AirConditionerOff,
    "Botヘルプ": this.BotHelp,
    "botヘルプ": this.BotHelp,
  };

  async Handle(ctx: Context) {
    const message = ctx.Payload.Message;
    const func = this.events[message];
    if (!func) {
      return;
    }

    await func(ctx);
  }
}
