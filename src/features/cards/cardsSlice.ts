import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { cardsApi, EditGradePayloadType, EditGradeResType, GetCardsResponse } from "./cardsApi";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

const getCards = createAppAsyncThunk<
  GetCardsResponse,
  { packId: string; page?: number; pageCount?: number; cardQuestion?: string }
>("cards/get", async (arg, thunkAPI) => {
  return thunkTryCatch(
    thunkAPI,
    async () => {
      const res = await cardsApi.getCards(arg.packId, arg.page, arg.pageCount, arg.cardQuestion);
      return res.data;
    },
    false
  );
});

const removeCard = createAppAsyncThunk<any, { cardId: string }>("cards/delete", async (arg, thunkAPI) => {
  return thunkTryCatch(
    thunkAPI,
    async () => {
      const res = await cardsApi.removeCard(arg.cardId);
      return res.data;
    },
    false
  );
});
const addNewCard = createAppAsyncThunk<
  any,
  { packId: string; question?: string; answer?: string; answerImg?: string; questionImg?: string }
>("cards/add", async (arg, thunkAPI) => {
  return thunkTryCatch(
    thunkAPI,
    async () => {
      const res = await cardsApi.addCard({
        packId: arg.packId,
        question: arg.question,
        answer: arg.answer,
        answerImg: arg.answerImg,
        questionImg: arg.questionImg,
      });
      return res.data;
    },
    false
  );
});
const editCard = createAppAsyncThunk<any, { cardId: string; question: string; answer: string }>(
  "cards/edit",
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await cardsApi.editCard(arg.cardId, arg.question, arg.answer);
        return res.data;
      },
      false
    );
  }
);

const updateGrade = createAppAsyncThunk<EditGradeResType, EditGradePayloadType>(
  "cards/grade",
  async (arg, thunkAPI) => {
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await cardsApi.editGrade({ ...arg });
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
  reducers: {
    addPackName: (state, action) => {
      state.cards.packName = action.payload;
    },
  },
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
      });
    // .addCase(updateGrade.fulfilled, (state, action) => {
    //   const index = state.cards.cards.findIndex((card) => card._id === action.payload.updatedGrade.card_id);
    //   if (index !== -1) {
    //     state.cards.cards[index].grade = action.payload.updatedGrade.grade;
    //   }
    // })
    // .addCase((getCards || removeCard || addNewCard || editCard).rejected, (state, action) => {
    //   return action.payload;
    //TODO wrong reject case , why here?? app slice for it - > add Matcher
    // }
    // );
  },
});
export const cardsReducer = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = { getCards, removeCard, addNewCard, editCard, updateGrade };
