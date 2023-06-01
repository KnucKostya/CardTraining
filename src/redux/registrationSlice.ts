import { createSlice } from "@reduxjs/toolkit";
import { authApi, RegisterResponse } from "../features/auth/authApi";
import { createAppAsyncThunk } from "../common/utils/createAppAsyncThunk";
import {appActions} from "app/appSlice";

const register = createAppAsyncThunk<RegisterResponse, { email: string; password: string }>(
  "auth/register",
  async (arg, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      dispatch(appActions.setIsLoading({ isLoading: true }));
      return await authApi.register(arg.email, arg.password);
    } catch (e: any) {
      dispatch(appActions.setError({ error: e }));
      return rejectWithValue(e.response.data.error);
    } finally {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }
  }
);

const slice = createSlice({
  name: "registration",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, () => {
      // state.error = action.payload;
    });
  },
});

export const registerThunks = { register };

export const registerReducer = slice.reducer;
export const registerActions = slice.actions;
