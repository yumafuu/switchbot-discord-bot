import { DB, User } from "../db/db.ts";
import config from "../config.ts";

export class Pay {
  private db: DB;
  private users = [
    config.DiscordUser1Id,
    config.DiscordUser2Id,
  ];

  constructor(db: DB) {
    this.db = db;
  }

  async SendCredit(from: string, to: string, credit: number) {
    await this.db.read();
    this.addRemittance(from, to, credit);
    this.exchangeCredits(from, to, credit);
    await this.db.write();
  }

  async GetUsers(): Promise<User[]> {
    await this.db.read();
    return this.db.data.users;
  }

  async Reset() {
    await this.db.read();
    this.db.data.users = this.db.data.users.map((user: User) => {
      user.credit = 0;
      return user;
    });
    await this.db.write();
  }

  GetPartner(id: string): string {
    return this.users.filter((user) => user !== id)[0];
  }

  GetMe(id: string): string {
    return this.users.filter((user) => user === id)[0];
  }

  private addRemittance(
    from: string,
    to: string,
    credit: number,
  ) {
    this.db.data.remittances.push({
      from,
      to,
      credit,
    });
  }

  private exchangeCredits(
    from: string,
    to: string,
    credit: number,
  ) {
    this.db.data.users.forEach((user: User) => {
      if (user.id === from) {
        user.credit -= credit;
      }
      if (user.id === to) {
        user.credit += credit;
      }
      return user;
    });
  }
}
