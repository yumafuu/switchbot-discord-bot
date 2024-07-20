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

  console.log(DB.data);
  DB.data.remittances.push({
    from, to, credit,
  });
  console.log(DB.data);
};

const exchangeCredits = async (
  from: string,
  to: string,
  credit: number,
) => {
  DB.data.users = DB.data.users.map((user: User) => {
    console.log({ user, from, to })
    if (user.id === from) {
      user.credit -= credit;
    }
    if (user.id === to) {
      user.credit += credit;
    }
    return user;
  });
};
