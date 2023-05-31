import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as null | string,
    isLoading: false,
    isAppInitialized: false,
  },
  reducers: {
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      console.log(action.payload);
      state.error = action.payload.error;
    },
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => {
        return action.type.endsWith("/rejected");
      },
      (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
      }
    );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
