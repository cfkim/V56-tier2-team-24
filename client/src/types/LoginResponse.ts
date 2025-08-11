import type { Role } from "./Role";

export type User = {
  _id: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  __v: number;
  password?: string;
};
