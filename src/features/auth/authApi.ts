import { instance } from "../../common/instance/instance";

export const authApi = {
  register: (email: string, password: string) => {
    return instance.post<{ email: string; password: string }, RegisterResponse>("/auth/register", {
      email,
      password,
    });
  },
};

export type RegisterResponse = {
  addedUser: RegisterResponseAddedUser;
};
export type RegisterResponseAddedUser = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
};
