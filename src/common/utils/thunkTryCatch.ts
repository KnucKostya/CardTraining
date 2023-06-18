import { AppDispatch, RootState } from "app/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { appActions } from "../../app/appSlice";
import { AxiosError } from "axios";


/**
 * If the logic function completes without errors, thunkTryCatch returns the result of executing this function.
 * If the logic function fails, thunkTryCatch returns an object with two properties:
 * errorMessage - the error message that was thrown by logic.
 * showGlobalError - a boolean value indicating whether to show a global error message. By default, this value is false.
 *
 * @param thunkAPI - object BaseThunkAPI, from redux for handling async actions
 * @param afterResolveFoo - func, to do into try-catch for error handling
 * @param showGlobalError  - not required param, which specifies whether to show a global error message. The default value is false.
 */
export const thunkTryCatch = async (
  thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
  afterResolveFoo: Function,
  showGlobalError?: boolean
) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setIsLoading({ isLoading: true }));
    return await afterResolveFoo();
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage=err?.response?.data.error
    return rejectWithValue({ errorMessage, showGlobalError });
  } finally {
    dispatch(appActions.setIsLoading({ isLoading: false }));
  }
};
