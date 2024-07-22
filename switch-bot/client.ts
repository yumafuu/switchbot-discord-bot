import * as crypto from "node:crypto";
import { Buffer } from "node:buffer";
import * as uuid from "jsr:@std/uuid";

type body = { [key: string]: string | number | boolean };
export interface SwitchBotClient {
  get(path: string): Promise<void>;
  post(path: string, data: body): Promise<void>;
  headers(): { [key: string]: string };
}

export class SwitchBotClient {
  private token: string;
  private secret: string;
  private baseUrl: string = "https://api.switch-bot.com";

  constructor(
    token: string,
    secret: string,
  ) {
    this.token = token;
    this.secret = secret;
  }

  async get(path: string) {
    const url = new URL(path, this.baseUrl);
    const res = await fetch(url, {
      method: "GET",
      headers: this.headers(),
    });
    return await res.json();
  }

  async post(path: string, data: body) {
    const url = new URL(path, this.baseUrl);

    const res = await fetch(url, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  headers(): { [key: string]: string } {
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
