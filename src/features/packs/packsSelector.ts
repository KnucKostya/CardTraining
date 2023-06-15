import { RootState } from "app/store";

export const packs_Selector = (state: RootState) => state.packs.cardPacks;
export const minCardsCount_Selector = (state: RootState) => state.packs.minCardsCount;
export const maxCardsCount_Selector = (state: RootState) => state.packs.maxCardsCount;
export const packsCount_Selector = (state: RootState) => state.packs.cardPacksTotalCount;
