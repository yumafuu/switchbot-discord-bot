import { DB, User } from "./db.ts";

export const ShowCredit = async (): Promise<User[]> => {
  await DB.read();
  return DB.data.users;
};
