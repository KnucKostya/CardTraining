import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getErrorMessage } from "../common/utils/getErrorMessage";

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
          state.isLoading = false;
          const error = action.payload?.error;

          if (!error) return;

          const errorMessage = getErrorMessage(error);
          if (error.message === null) return;
          toast.error(errorMessage);
        }
      );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
