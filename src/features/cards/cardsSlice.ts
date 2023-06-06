import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";
import { cardsApi, GetCardsResponse } from "./cardsApi";

const getCards = createAppAsyncThunk<GetCardsResponse>("cards/get", async (arg, thunkAPI) => {
  const res = await cardsApi.getCards();
  return res.data;
});

const slice = createSlice({
  name: "cards",
  initialState: {
    cards: [] as GetCardsResponse | [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cards = action.payload;
    });
  },
});

export const cardsThunks = { getCards };
