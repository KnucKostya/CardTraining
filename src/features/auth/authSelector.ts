import { RootState } from "app/store";

export const isAuth_auth_Selector = (state: RootState) => state.auth.isAuth;
export const userId_auth_Selector = (state: RootState) => state.auth.profile?._id;
export const userAvatar_auth_Selector = (state: RootState) => state.auth.profile?.avatar;
export const userName_auth_Selector = (state: RootState) => state.auth.profile?.name;
export const userEmail_auth_Selector = (state: RootState) => state.auth.profile?.name;
