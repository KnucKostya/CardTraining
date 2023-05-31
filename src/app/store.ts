import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
import { appReducer } from "../features/appSlice";
import thunkMiddleware from "redux-thunk";
import { registerReducer } from "../redux/registrationSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    app: appReducer,
    register: registerReducer,
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
