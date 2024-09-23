import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { dbSchema } from "./type.ts";

export class DB {
  private db: Low<dbSchema>;

  constructor() {
    this.db = new Low<dbSchema>(
      new JSONFile<dbSchema>("./db.json"),
      { remittances: [], users: [], pillChecks: [] },
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
