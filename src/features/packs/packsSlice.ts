import { createSlice } from "@reduxjs/toolkit";
import {
  AddPackPayloadType,
  CardPackType,
  GetPacksParamsType,
  packsApi,
  PacksResType,
  UpdatePackPayloadType,
} from "features/packs/packsApi";
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
export const addCardPackTC = createAppAsyncThunk<{pack: CardPackType}, AddPackPayloadType>(
  "packs/addPack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.addPack(arg);
      await dispatch(fetchCardPacksTC({}));
      // return { pack: res.data.newCardsPack}
    });
  }
);
export const deleteCardPackTC = createAppAsyncThunk<{packId: string}, string>(
  "packs/deletePack",
  async (id, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.deletePack(id);
      await dispatch(fetchCardPacksTC({}));
       // return {packId: res.data.deletedCardsPack._id}
    });
  }
);
export const updateCardPackTC = createAppAsyncThunk<{pack: CardPackType}, UpdatePackPayloadType>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.updatePack(arg);
      await dispatch(fetchCardPacksTC({}));
      // return {pack: res.data.updatedCardsPack}
    });
  }
);

//REDUCER =================================================================================================

const packsInitialState = {
  cardPacks: [] as CardPackType[],
  cardPacksTotalCount: null as number | null,
  maxCardsCount: 100 as number,
  minCardsCount: 0 as number,
  page: 1 as number,
  pageCount: 6 as number,
};

const slice = createSlice({
  name: "packs",
  initialState: packsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardPacksTC.fulfilled, (state, action) => {
      state.cardPacks = action.payload.packs.cardPacks;
      state.cardPacksTotalCount = action.payload.packs.cardPacksTotalCount;
      state.maxCardsCount = action.payload.packs.maxCardsCount;
      state.minCardsCount = action.payload.packs.minCardsCount;
      state.page = action.payload.packs.page;
      state.pageCount = action.payload.packs.pageCount;
    })
      // .addCase(addCardPackTC.fulfilled,(state, action)=> {
      //   state.cardPacks.unshift(action.payload.pack)
      // })
      // .addCase(deleteCardPackTC.fulfilled,(state, action)=> {
      //   const index=state.cardPacks.findIndex(p=> p._id===action.payload.packId)
      //   if (index!==-1) state.cardPacks.splice(index,1)
      // })
      // .addCase(updateCardPackTC.fulfilled,(state, action)=> {
      //   const index = state.cardPacks.findIndex(p => p._id === action.payload.pack._id)
      //   if (index !== -1) state.cardPacks[index] = action.payload.pack
      // })
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
