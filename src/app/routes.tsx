import { createHashRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import ErrorPage from "../common/error-page/ErrorPage";
import { Profile } from "../features/profile/profile";
import { Login } from "../features/login/login";
import { Register } from "../features/auth/register/register";
import { CheckEmail } from "../features/auth/checkEmail/checkEmail";
import { SetNewPassword } from "../features/auth/setNewPassword/setNewPassword";
import { Learn } from "../features/learn/learn";
import React from "react";
import App from "./App";

import { Packs } from "../features/packs/Packs";
import { Cards } from "../features/cards/cards";
import { FogotPassword } from "../features/auth/forgotPassword/forgotPassword";

export enum RouteNames {
  START_PAGE = "/",
  ERROR_PAGE = "*",
  LOGIN = "/login",
  REGISTER = "/register",
  CHECK_EMAIL = "/check-email",
  SET_NEW_PASSWORD = "/set-new-password",
  FORGOT_PASSWORD = "/forgot-password",
  PROFILE = "/profile",
  PACKS = "/packs",
  LEARN = "/learn",
  CARDS = "/cards",
}
export const router = createHashRouter(
  createRoutesFromElements(
    <Route path={RouteNames.START_PAGE} element={<App />}>
      <Route path={RouteNames.START_PAGE} element={<Navigate to={RouteNames.PACKS} />} />
      <Route path={RouteNames.ERROR_PAGE} element={<ErrorPage />} />
      <Route path={RouteNames.PROFILE} element={<Profile />} />
      <Route path={RouteNames.LOGIN} element={<Login />} />
      <Route path={RouteNames.REGISTER} element={<Register />} />
      <Route path={RouteNames.CHECK_EMAIL} element={<CheckEmail />} />
      <Route path={RouteNames.SET_NEW_PASSWORD} element={<SetNewPassword />} />
      <Route path={`${RouteNames.SET_NEW_PASSWORD}/:token`} element={<SetNewPassword />} />
      <Route path={RouteNames.FORGOT_PASSWORD} element={<FogotPassword />} />
      <Route path={RouteNames.PACKS} element={<Packs />} />
      <Route path={RouteNames.LEARN} element={<Learn />} />
      <Route path={RouteNames.CARDS} element={<Cards />} />
    </Route>
  )
);
