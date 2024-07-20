import * as crypto from "node:crypto";
import { Buffer } from "node:buffer";
import * as uuid from "jsr:@std/uuid";

export class SwitchBot {
  private token: string;
  private secret: string;
  private baseUrl: string = "https://api.switch-bot.com";
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
    this.token = token;
    this.secret = secret;
    this.devices = devices;
  }

  async DevideList() {
    return await this.get("/v1.1/devices");
  }

  async DeviceStatus(deviceId: string) {
    return await this.get(`/v1.1/devices/${deviceId}/status`);
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
    return await this.post(`/v1.1/devices/${deviceId}/commands`, {
      commandType: "command",
      command: command,
      parameter: parameter,
    });
  }

  private async get(path: string) {
    const url = new URL(path, this.baseUrl);
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers(),
    });
    return await res.json();
  }

  private async post(path: string, data: any) {
    const url = new URL(path, this.baseUrl);

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  private headers(): { [key: string]: string } {
    const t = Date.now();
    const nonce = uuid.v1.generate();
    const data = `${this.token}${t}${nonce}`;
    const sign = crypto.createHmac("sha256", this.secret)
      .update(Buffer.from(data, "utf-8"))
      .digest()
      .toString("base64");

    return {
      "Authorization": this.token,
      "sign": sign,
      "nonce": nonce,
      "t": String(t),
      "Content-Type": "application/json",
    };
  }
}
