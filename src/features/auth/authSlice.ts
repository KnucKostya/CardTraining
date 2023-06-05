import { createSlice } from "@reduxjs/toolkit";
import {
  authApi,
  LogoutResType,
  ProfileType,
  UpdatedProfileType,
  UpdateProfilePayloadType,
} from "features/auth/authApi";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "../../common/utils/thunkTryCatch";

//THUNKS =================================================================================================

// const registerTC = createAppAsyncThunk("auth/register", async (arg: RegPayloadType, thunkAPI) => {
//   const res = await authApi.register(arg);
// });

const logoutTC = createAppAsyncThunk<LogoutResType>("auth/logout", async (arg) => {
  const res = await authApi.logout();
  return res.data;
});
const updateUserTC = createAppAsyncThunk<{ profile: UpdatedProfileType }, UpdateProfilePayloadType>(
  "profile/updateUser",
  async (arg, thunkAPI) => {
    const res = await authApi.updateUser(arg);
    return { profile: res.data };
  }
);
export const isAuthTC = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/isAuth",
  async (arg, thunkAPI) => {
    // const { rejectWithValue } = thunkAPI;
    // try {
    //   const res = await authApi.isAuth();
    //   return { profile: res.data };
    // } catch (e) {
    //   return rejectWithValue(errorUtils(e as AxiosError<{ error: string }>));
    // }
    // }
    return thunkTryCatch(
      thunkAPI,
      async () => {
        const res = await authApi.isAuth();
        return { profile: res.data };
      },
      false
    );
  }
);

//REDUCER =================================================================================================

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isAuth: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(loginTC.fulfilled, (state, action) => {
      //   state.profile = action.payload.profile;
      //   state.isAuth = true;
      // })
      .addCase(logoutTC.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(isAuthTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(updateUserTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile.updatedUser;
      });
  },
});

export const authReducer = slice.reducer;

// export const authActions = slice.actions;

export const authThunks = {
  // registerTC,
  // loginTC,
  updateUserTC,
  isAuthTC,
  logoutTC,
};
