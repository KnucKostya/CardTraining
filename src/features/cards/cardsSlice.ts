import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";
import { cardsApi, GetCardsResponse } from "./cardsApi";
import { thunkTryCatch } from "../../common/utils/thunkTryCatch";

const getCards = createAppAsyncThunk<GetCardsResponse, { packId: string }>(
  "cards/get",
  async (arg, thunkAPI) => {
    // const res = await cardsApi.getCards(arg.packId);
    // return res.data;
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await cardsApi.getCards(arg.packId);
        return res.data;
      },
      false
    );
  }
);
const removeCard = createAppAsyncThunk<any, { cardId: string }>(
  "cards/delete",
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await cardsApi.removeCard(arg.cardId);
        return res.data;
      },
      false
    );
  }
);
const addNewCard = createAppAsyncThunk<any, { packId: string }>(
  "cards/add",
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await cardsApi.addCard(arg.packId);
        return res.data;
      },
      false
    );
  }
);
const editCard = createAppAsyncThunk<any, { cardId: string; question: string }>(
  "cards/edit",
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await cardsApi.editCard(arg.cardId, arg.question);
        return res.data;
      },
      false
    );
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
      })
      .addCase(editCard.fulfilled, (state, action) => {
        state.cards = action.payload;
      })
      .addCase((getCards || removeCard || addNewCard || editCard).rejected, (state, action) => {
        return action.payload;
      });
  },
});
export const cardsReducer = slice.reducer;
export const cardsThunks = { getCards, removeCard, addNewCard, editCard };
