import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "features/auth/authSlice";
import { packsReducer } from "features/packs/packsSlice";
import { cardsReducer } from "features/cards/cardsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducer,
    cards: cardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(thunkMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
