import { createSlice } from "@reduxjs/toolkit";
import {
  AddPackPayloadType,
  CardPackType,
  GetPacksParamsType,
  packsApi,
  PacksResType,
  UpdatePackPayloadType,
} from "features/packs/packsApi";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

//THUNKS =================================================================================================

export const fetchPacks = createAppAsyncThunk<{ packs: PacksResType }, GetPacksParamsType>(
  "packs/getPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks(arg);
      return { packs: res.data };
    });
  }
);
export const addPack = createAppAsyncThunk<{ pack: CardPackType }, AddPackPayloadType>(
  "packs/addPack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.addPack(arg);
      await dispatch(fetchPacks({}));
      // return { pack: res.data.newCardsPack}
    });
  }
);
export const removePack = createAppAsyncThunk<{ packId: string }, string>(
  "packs/deletePack",
  async (id, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      await packsApi.removePack(id);
      await dispatch(fetchPacks({}));
      // return {packId: res.data.deletedCardsPack._id}
    });
  }
);
export const updatePack = createAppAsyncThunk<{ pack: CardPackType }, UpdatePackPayloadType>(
  "packs/updatePack",
  async (arg, thunkAPI) => {
    const { dispatch } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      dispatch(packsActions.savePackName(arg.name));
      await packsApi.updatePack(arg);
      await dispatch(fetchPacks({}));
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
  reducers: {
    savePackName: (state, action) => {
      let packName = state.cardPacks.find((f) => f.name);
      packName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPacks.fulfilled, (state, action) => {
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
  fetchPacks,
  addPack,
  removePack,
  updatePack,
};

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
