import { instance, instanceHeroku } from "../../common/instance/instance";

export const authApi = {

  register: (email: string, password: string) => {
    return instanceHeroku.post<{ email: string; password: string }, RegisterResponse>("/auth/register", {
      email,
      password,
    });
  },

  logout: () => {
    return instance.delete<LogoutResType>("auth/me");
  },

  isAuth: () => {
    return instance.post<ProfileType>("auth/me");
  },

  updateUser: (data: UpdateProfilePayloadType) => {
    return instance.put<UpdatedProfileType>("auth/me", data);
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
export type ProfileType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  // количество колод
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;
  error?: string;
};
export type UpdatedProfileType = {
  updatedUser: ProfileType;
  error?: string;
};
export type UpdateProfilePayloadType = {
  name?: string;
  avatar?: string;
};
export type LogoutResType = {
  info: string;
  error: string;
};