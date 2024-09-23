export interface User {
  id: string;
  credit: number;
}

export interface Remittance {
  from: string;
  to: string;
  credit: number;
}

export interface PillCheck {
  date: string;
  taken: boolean;
}

export interface dbSchema {
  remittances: Remittance[];
  users: User[];
  pillChecks: PillCheck[];
}
