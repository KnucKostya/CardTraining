import { authReducer, authThunks } from "./authSlice";
import { ProfileType } from "./authApi";


describe("authReducer", () => {
  const initialState  = {
    profile: null as ProfileType | null,
    isAuth: false,
    email: "",
    password: ""
  };


  it("should login work correctly and return profile", () => {
    const data = {
      email: "safrondev1@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false,
    };

    const profile = {
      _id: "6435620aaf58963e887fb0f4",
      email: "safrondev1@gmail.com",
      rememberMe: false,
      isAdmin: false,
      name: "safrondev1@gmail.com",
      verified: false,
      publicCardPacksCount: 3,
      created: new Date("2023-04-11T13:35:06.046Z"),
      updated: new Date("2023-05-05T06:35:21.310Z"),
      __v: 0,
      token: "023f67e0-eb0f-11ed-b359-fbf835b5a380",
      tokenDeathTime: 1683279321310,
    };

    // 2. fulfilled takes 3 params:
    // 2.1. what thunk returns
    // 2.2. Await string. We would use "requestId" - like meta information
    // 2.3. what thunk takes

    const action = authThunks.login.fulfilled({ profile }, "requestId", data);

    const state = authReducer(initialState, action);

    expect(state.profile).toEqual(profile);
  });
});
