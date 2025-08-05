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

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type GetUserResponse = {
  message: string;
  user: User | null;
};
