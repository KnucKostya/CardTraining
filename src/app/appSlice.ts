import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ErrorType = string | null | undefined;

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as ErrorType,
    isLoading: false as boolean,
    isAppInitialized: false,
  },
  reducers: {
    setError: (state, action: PayloadAction<{ error: ErrorType }>) => {
      state.error = action.payload.error;
    },
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: (builder) => {
    builder
        .addMatcher(
            (action) => {
              return action.type.endsWith("/pending");
            },
            (state, action) => {
              state.isLoading = true;
            }
        )
        .addMatcher(
            (action) => {
              return action.type.endsWith("/fulfilled");
            },
            (state, action) => {
              state.isLoading = false;
            }
        )
        .addMatcher(
            (action) => {
              return action.type.endsWith("/rejected"); // любой экшн с реджектом
            },
            (state, action) => {
              state.isLoading = false; // убираем лоадер
              state.error = action.payload; // передаем значение ошибки в снакбар
            }
        );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
