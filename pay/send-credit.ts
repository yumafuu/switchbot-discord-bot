import { DB, User } from "./db.ts";

export const SendCredit = async (from: string, to: string, credit: number) => {
  await addRemittance(from, to, credit);
  await exchangeCredits(from, to, credit);
};

const addRemittance = async (
  from: string,
  to: string,
  credit: number,
) => {
  DB.data.remittances.push({
    from: from,
    to: to,
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
      user.credits -= credit;
    }
    if (user.id === to) {
      user.credits += credit;
    }
    return user;
  });
};
