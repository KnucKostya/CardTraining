import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import thunkMiddleware from "redux-thunk";
import { registerReducer } from "../features/auth/registrationSlice";
import { authReducer } from "features/auth/authSlice";
import { packsReducer } from "../features/packs/packsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    register: registerReducer,
    auth: authReducer,
    packs: packsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
