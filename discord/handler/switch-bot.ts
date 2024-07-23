import { Context } from "../bot.ts";

export class SwitchBotHandler {
  async Handle(ctx: Context) {
    const message = ctx.Payload.Message;
    switch (message) {
      case "電気けして":
        await Promise.all([
          ctx.SwitchBot.StandLightActive(false),
          ctx.SwitchBot.LivingRoomLightActive(false),
        ]);
        ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "けしたよ");
        break;
      case "リラックスモード":
        await Promise.all([
          ctx.SwitchBot.StandLightActive(true),
          ctx.SwitchBot.LivingRoomLightActive(false),
        ]);
        ctx.DiscordBot.sendMessage(
          ctx.Payload.Channel,
          "リラックスしてね",
        );
        break;
      case "スタンドけして":
        await Promise.all([
          ctx.SwitchBot.StandLightActive(false),
        ]);
        ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "けしたよ");
        break;
      case "リビングけして":
        await Promise.all([
          ctx.SwitchBot.LivingRoomLightActive(false),
        ]);
        ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "けしたよ");
        break;
      case "リビングつけて":
        await Promise.all([
          ctx.SwitchBot.LivingRoomLightActive(true),
        ]);
        ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "あいよ");
        break;
      case "ドライつけて":
        await Promise.all([
          ctx.SwitchBot.AirConditionerActive({
            active: true,
            temperature: 25,
            mode: "dry",
            speed: "medium",
          }),
        ]);
        ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "あいよ");
        break;
      case "冷房つけて":
        await Promise.all([
          ctx.SwitchBot.AirConditionerActive({
            active: true,
            temperature: 25,
            mode: "cool",
            speed: "auto",
          }),
        ]);
        ctx.DiscordBot.sendMessage(ctx.Payload.Channel, "あいよ");
        break;
      case "エアコンけして":
        await Promise.all([
          ctx.SwitchBot.AirConditionerActive({
            active: false,
            temperature: 25,
            mode: "cool",
            speed: "auto",
          }),
        ]);
        break;
    }
  }
}
