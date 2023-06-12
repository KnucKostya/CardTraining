import { createSlice } from "@reduxjs/toolkit";
import {
  ArgLoginType,
  authApi, ForgotArgs,
  LogoutResType,
  ProfileType, SetNewPasswordArgs,
  UpdatedProfileType,
  UpdateProfilePayloadType
} from "features/auth/authApi";
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "../../common/utils/thunkTryCatch";

//THUNKS =================================================================================================

// const registerTC = createAppAsyncThunk("auth/register", async (arg: RegPayloadType, thunkAPI) => {
//   const res = await authApi.register(arg);
// });
const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", (arg, thunkAPI) => {
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
      resetPasswordToken: arg.resetPasswordToken
    });
  });
});
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
    email: "",
    password: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuth = true;
      })
      .addCase(logoutTC.fulfilled, (state, action) => {
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
        console.log(action);
        state.email = action.meta.arg.email;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.password = action.meta.arg.password;
      })
      .addCase(isAuthTC.rejected, (state, action) => {
        console.log("isAuth ", action.payload);
        return action.payload;
      })

  }
});

export const authReducer = slice.reducer;

// export const authActions = slice.actions;
export const authThunks = {
  updateUserTC,
  isAuthTC,
  logoutTC,
  login,
  sendResetPassword,
  setNewPassword
};
