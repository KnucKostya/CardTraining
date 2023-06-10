import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";
import { cardsApi, GetCardsResponse } from "./cardsApi";

const getCards = createAppAsyncThunk<GetCardsResponse, { packId: string }>(
  "cards/get",
  async (arg, thunkAPI) => {
    const res = await cardsApi.getCards(arg.packId);
    return res.data;
  }
);
const removeCard = createAppAsyncThunk<any, { cardId: string }>(
  "cards/delete",
  async (arg, thunkAPI) => {
    const res = await cardsApi.removeCard(arg.cardId);
    return res.data;
  }
);
const addNewCard = createAppAsyncThunk<any, { packId: string }>(
  "cards/add",
  async (arg, thunkAPI) => {
    const res = await cardsApi.addCard(arg.packId);
    return res.data;
  }
);

const slice = createSlice({
  name: "cards",
  initialState: {
    cards: {} as GetCardsResponse,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCards.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(removeCard.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase(addNewCard.fulfilled, (state, action) => {
        state.cards = action.payload;
      });
  },
});
export const cardsReducer = slice.reducer;
export const cardsThunks = { getCards, removeCard, addNewCard };
