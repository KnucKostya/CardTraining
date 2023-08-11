import { RootState } from "app/store";

export const cards_Selector = (state: RootState) => state.cards.cards.cards;
export const cardUserIdSelector = (state: RootState) => state.auth.profile?._id;
export const pack_Name_Selector = (state: RootState) => state.cards?.cards?.packName;
export const pack_UserId_Selector = (state: RootState) => state.cards?.cards?.packUserId;
export const cards_Count_Selector = (state: RootState) => state.cards?.cards?.cardsTotalCount;
