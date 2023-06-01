import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
import { appReducer } from "app/appSlice";
import thunkMiddleware from "redux-thunk";
import { registerReducer } from "../redux/registrationSlice";
import {authReducer} from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    register: registerReducer,
    auth: authReducer,
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
