import { SwitchBotClient } from "./client.ts";

export class SwitchBot {
  private client: SwitchBotClient;
  private devices: {
    airConditioner: string;
    livingRoomLight: string;
    standLightTop: string;
    standLightBottom: string;
  };

  constructor(
    token: string,
    secret: string,
    devices: {
      airConditioner: string;
      livingRoomLight: string;
      standLightTop: string;
      standLightBottom: string;
    },
  ) {
    this.client = new SwitchBotClient(token, secret);
    this.devices = devices;
  }

  async DevideList() {
    return await this.client.get("/v1.1/devices");
  }

  async DeviceStatus(deviceId: string) {
    return await this.client.get(`/v1.1/devices/${deviceId}/status`);
  }

  async LivingRoomLightActive(on: boolean) {
    let s = "turnOff";
    if (on) s = "turnOn";

    return await this.command(
      this.devices.livingRoomLight,
      s,
      "default",
    );
  }

  async AirConditionerActive(option: {
    active: boolean;
    temperature: number;
    mode: "auto" | "cool" | "dry" | "fan" | "heat";
    speed: "auto" | "low" | "medium" | "high";
  }) {
    let activeStr = "off";
    if (option.active) activeStr = "on";

    const modeMap = { auto: "0", cool: "2", dry: "3", fan: "4", heat: "5" };
    const speedMap = { auto: "1", low: "2", medium: "3", high: "4" };
    const modeStr = modeMap[option.mode];
    const speedStr = speedMap[option.speed];

    // {temperature},{mode},{fan speed},{power state}
    const parameter =
      `${option.temperature},${modeStr},${speedStr},${activeStr}`;

    return await this.command(
      this.devices.airConditioner,
      "setAll",
      parameter,
    );
  }

  async StandLightActive(on: boolean) {
    let s = "turnOff";
    if (on) s = "turnOn";

    return Promise.all([
      this.command(this.devices.standLightTop, s, "default"),
      this.command(this.devices.standLightBottom, s, "default"),
    ]);
  }

  private async command(deviceId: string, command: string, parameter: string) {
    return await this.client.post(`/v1.1/devices/${deviceId}/commands`, {
      commandType: "command",
      command: command,
      parameter: parameter,
    });
  }
}
