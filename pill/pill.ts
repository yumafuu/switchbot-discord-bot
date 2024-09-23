import { DB } from "../db/db.ts";
import { PillCheck } from "../db/type.ts";

export class Pill {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async Take() {
    const now = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    })
    const today = now.split(' ')[0];

    await this.db.read();
    this.db.data.pillChecks.push({
      date: today,
      taken: true,
    });
    await this.db.write();
  }

  async IsTakenToday() {
    const now = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    })
    const today = now.split(' ')[0];

    await this.db.read();
    return this.db.data.pillChecks.some((pill: PillCheck) => {
      return pill.date === today && pill.taken
    });
  }
}
