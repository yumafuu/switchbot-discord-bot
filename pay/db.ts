import { Low } from "npm:lowdb";
import { JSONFile } from "npm:lowdb/node";

export interface User {
  id: string;
  credit: number;
}

export interface dbSchema {
  remittances: Array<{ from: string; to: string; credit: number }>;
  users: User[];
}

const adapter = new JSONFile<dbSchema>("./db.json");
export const DB = new Low<dbSchema>(adapter, { remittances: [], users: [] });
