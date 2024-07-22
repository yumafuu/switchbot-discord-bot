import { Low } from "https://esm.sh/lowdb@7.0.1";
import { JSONFile } from "https://esm.sh/lowdb@7.0.1/node";
import { dbSchema } from "./type.ts";

export class DB {
  private db: Low<dbSchema>;

  constructor() {
    this.db = new Low<dbSchema>(
      new JSONFile<dbSchema>("./db.json"),
      { remittances: [], users: [] },
    );
  }

  async read() {
    await this.db.read();
  }

  async write() {
    await this.db.write();
  }

  get data() {
    return this.db.data;
  }
}
