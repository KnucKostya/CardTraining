// import React from "react";
import { RootState } from "app/store";

export const cardsSelector = (state: RootState) => state.cards?.cards?.cards;
export const cards_Selector = (state: RootState) => state.cards.cards.cards;
export const cardUserIdSelector = (state: RootState) => state.auth.profile?._id;
export const packNameSelector = (state: RootState) => state.cards?.cards?.packName;
export const packUserIdSelector = (state: RootState) => state.cards?.cards?.packUserId;
export const cardsCountSelector = (state: RootState) => state.cards?.cards?.cardsTotalCount;
