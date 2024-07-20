import { DB, User } from "./db.ts";

export const SendCredit = async (from: string, to: string, credit: number) => {
  await DB.read();
  await addRemittance(from, to, credit);
  await exchangeCredits(from, to, credit);
  await DB.write();
};

const addRemittance = async (
  from: string,
  to: string,
  credit: number,
) => {
  DB.data.remittances.push({
    from,
    to,
    credit,
  });
};

const exchangeCredits = async (
  from: string,
  to: string,
  credit: number,
) => {
  DB.data.users = DB.data.users.map((user: User) => {
    if (user.id === from) {
      user.credit -= credit;
    }
    if (user.id === to) {
      user.credit += credit;
    }
    return user;
  });
};
