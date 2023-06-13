import { RootState } from "../../app/store";

export const isAuth_Selector= (state: RootState) => state.auth.isAuth
export const userId_Selector= (state: RootState) => state.auth.profile?._id
export const userAvatar_Selector= (state: RootState) => state.auth.profile?.avatar
export const userName_Selector= (state: RootState) => state.auth.profile?.name
export const userEmail_Selector= (state: RootState) => state.auth.profile?.name
