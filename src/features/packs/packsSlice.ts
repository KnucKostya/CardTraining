import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createAppAsyncThunk, thunkTryCatch } from "common/utils"
import {
  AddPackPayloadType,
  CardPackType,
  GetPacksParamsType,
  packsApi,
  PacksResType,
  UpdatePackPayloadType,
} from "features/packs/packsApi";
import { toast } from "react-toastify";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "../../common/utils/thunkTryCatch";

//THUNKS =================================================================================================

export const fetchCardPacksTC = createAppAsyncThunk<{ packs: PacksResType }, GetPacksParamsType>(
  "packs/getPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks(arg);
      return { packs: res.data };
    });
  }
);
export const addCardPackTC = createAppAsyncThunk(
  "packs/addPack",
  async (arg: AddPackPayloadType, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.addPack(arg); //добавляем пак
      await dispatch(fetchCardPacksTC({})); //фетчим по новой
    });
  }
);
export const deleteCardPackTC = createAppAsyncThunk(
  "packs/deletePack",
  async (arg: string, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.deletePack(arg);
      await dispatch(fetchCardPacksTC({}));
    });
  }
);
export const updateCardPackTC = createAppAsyncThunk(
  "packs/deletePack",
  async (arg: UpdatePackPayloadType, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.updatePack(arg);
      await dispatch(fetchCardPacksTC({}));
    });
  }
);

//REDUCER =================================================================================================

const packsInitialState = {
  cardPacks: [] as CardPackType[],
  cardPacksTotalCount: null as number | null,
  maxCardsCount: 100 as number,
  minCardsCount: 0 as number,
  page: 1 as number, // выбранная страница
  pageCount: 6 as number, // количество элементов на странице
};

const slice = createSlice({
  name: "packs",
  initialState: packsInitialState,
  reducers: {
    // setMinMaxCardsCount: (state, action: PayloadAction<number[]>) => {
    //   state.minCardsCount = action.payload[0];
    //   state.maxCardsCount = action.payload[1];
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCardPacksTC.fulfilled, (state, action) => {
      state.cardPacks = action.payload.packs.cardPacks;
      state.cardPacksTotalCount = action.payload.packs.cardPacksTotalCount;
      state.maxCardsCount = action.payload.packs.maxCardsCount;
      state.minCardsCount = action.payload.packs.minCardsCount;
      state.page = action.payload.packs.page;
      state.pageCount = action.payload.packs.pageCount;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = {
  fetchCardPacksTC,
  addCardPackTC,
  deleteCardPackTC,
  updateCardPackTC,
};
