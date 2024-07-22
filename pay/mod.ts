export interface User {
  id: string;
  credit: number;
}

export interface Remittance {
  from: string;
  to: string;
  credit: number;
}

export interface dbSchema {
  remittances: Remittance[];
  users: User[];
}

export interface DB {
  data: dbSchema;
  read: () => Promise<void>;
  write: () => Promise<void>;
}
