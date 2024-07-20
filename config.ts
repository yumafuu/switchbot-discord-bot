const env = Deno.env.toObject();

type Config = {
  SwitchBotAccessToken: string;
  SwitchBotClientSecret: string;
  SwitchBotDeviceAirConditioner: string;
  SwitchBotDeviceLivingRoomLight: string;
  SwitchBotDeviceStandLightTop: string;
  SwitchBotDeviceStandLightBottom: string;
  DiscordBotToken: string;
  DiscordUser1Id: string;
  DiscordUser2Id: string;
};

const config: Config = {
  SwitchBotAccessToken: env.SWITCHBOT_ACCESS_TOKEN,
  SwitchBotClientSecret: env.SWITCHBOT_CLIENT_SECRET,
  SwitchBotDeviceAirConditioner: env.SWITCHBOT_DEVICE_AIR_CONDITIONER,
  SwitchBotDeviceLivingRoomLight: env.SWITCHBOT_DEVICE_LIVING_ROOM_LIGHT,
  SwitchBotDeviceStandLightTop: env.SWITCHBOT_DEVICE_STAND_LIGHT_TOP,
  SwitchBotDeviceStandLightBottom: env.SWITCHBOT_DEVICE_STAND_LIGHT_BOTTOM,
  DiscordBotToken: env.DISCORD_BOT_TOKEN,
  DiscordUser1Id: env.DISCORD_USER_1_ID,
  DiscordUser2Id: env.DISCORD_USER_2_ID,
};

Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
});

export default config;
