import { AppDispatch, RootState } from "app/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "../../app/appSlice";

export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  logic: Function,
  showGlobalError?: boolean
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setIsLoading({ isLoading: true }));
    return await logic();
  } catch (error) {
    return rejectWithValue({ error: error, showGlobalError: true });
  } finally {
    dispatch(appActions.setIsLoading({ isLoading: false }));
  }
};
