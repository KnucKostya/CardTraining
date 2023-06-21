import { createSlice } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  authApi,
  ForgotArgs,
  LogoutResType,
  ProfileType,
  RegisterResponse,
  SetNewPasswordArgs,
  UpdatedProfileType,
  UpdateProfilePayloadType,
} from "features/auth/authApi";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "common/utils/thunkTryCatch";

//THUNKS =================================================================================================

const register = createAppAsyncThunk<RegisterResponse, { email: string; password: string }>(
  "auth/register",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, () => {
      return authApi.register(arg.email, arg.password);
    });
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, () => {
    return authApi.login(arg).then((res) => {
      return { profile: res.data };
    });
  });
});
const sendResetPassword = createAppAsyncThunk("auth/resetPassword", async (arg: ForgotArgs, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await authApi.forgotPassword({ email: arg.email, from: arg.from, message: arg.message });
  });
});
const setNewPassword = createAppAsyncThunk("auth/newPassword", async (arg: SetNewPasswordArgs, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    return await authApi.setNewPassword({
      password: arg.password,
      resetPasswordToken: arg.resetPasswordToken,
    });
  });
});
const logoutTC = createAppAsyncThunk<LogoutResType>("auth/logout", async () => {
  const res = await authApi.logout();
  return res.data;
});
const updateUserTC = createAppAsyncThunk<{ profile: UpdatedProfileType }, UpdateProfilePayloadType>(
  "profile/updateUser",
  async (arg) => {
    const res = await authApi.updateUser(arg);
    return { profile: res.data };
  }
);
export const isAuthTC = createAppAsyncThunk<{ profile: ProfileType }>(
  "auth/isAuth",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.isAuth();
      return { profile: res.data };
    });
  }
);

//REDUCER =================================================================================================

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isAuth: false,
    email: "",
    password: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(logoutTC.fulfilled, (state) => {
        state.isAuth = false;
      })
      .addCase(isAuthTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(updateUserTC.fulfilled, (state, action) => {
        state.profile = action.payload.profile.updatedUser;
      })
      .addCase(sendResetPassword.fulfilled, (state, action) => {
        state.email = action.meta.arg.email;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.password = action.meta.arg.password;
      });
    //TODO
    // .addCase(isAuthTC.rejected, (state, action) => {
    //   console.log("isAuth ", action.payload);
    //   return action.payload;
    // })
  },
});

export const authReducer = slice.reducer;

// export const authActions = slice.actions;
export const authThunks = {
  updateUserTC,
  isAuthTC,
  logoutTC,
  login,
  sendResetPassword,
  setNewPassword,
  register,
};
