import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, RegisterResponse } from "../common/api/authApi";
import { createAppAsyncThunk } from "../common/utils/createAppAsyncThunk";

const register = createAppAsyncThunk<RegisterResponse, { email: string; password: string }>(
  "auth/register",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await authApi.register(arg.email, arg.password);
    } catch (e: any) {
      return rejectWithValue(e.response.data.error);
    }
  }
);

const slice = createSlice({
  name: "registration",
  initialState: {
    error: null as null | string,
  },
  reducers: {
    setError: (state, action: PayloadAction<{ error: string }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, () => {
        // state = action.payload.
      })
      .addCase(register.rejected, (state, action) => {
        debugger;
        console.log(action.payload);
        state.error = action.payload;
      });
  },
});

export const registerThunks = { register };

export const registerReducer = slice.reducer;
export const registerActions = slice.actions;
