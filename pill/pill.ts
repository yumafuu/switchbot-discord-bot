import { DB } from "../db/db.ts";
import { PillCheck } from "../db/type.ts";

export class Pill {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  Take() {
    const now = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    })
    const today = now.split(' ')[0];

    this.db.data.pillChecks.push({
      date: today,
      taken: true,
    });
  }

  IsTakenToday() {
    const now = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    })
    const today = now.split(' ')[0];

    return this.db.data.pillChecks.some((pill: PillCheck) => {
      return pill.date === today && pill.taken
    });
  }
}
