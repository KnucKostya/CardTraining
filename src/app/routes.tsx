import { createHashRouter, createRoutesFromElements, Navigate, Route, useParams } from "react-router-dom";
import ErrorPage from "../common/error-page/ErrorPage";
import { Profile } from "features/profile/profile";
import { Login } from "features/login/login";
import { Register } from "features/auth/register/register";
import { CheckEmail } from "features/auth/checkEmail/checkEmail";
import { Learn } from "features/learn/Learn";
import React from "react";
import App from "./App";
import { Packs } from "features/packs/Packs";
import { Cards } from "features/cards";
import { FogotPassword } from "features/auth/forgotPassword/forgotPassword";
import { SetPassword } from "features/auth/setNewPassword/setNewPassword";

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
  LEARN = "/learn/:packId",
  CARDS = "/cards",
  CARDS_PACK_ID = "/cards/pack/:packId",
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
      <Route path={RouteNames.SET_NEW_PASSWORD} element={<SetPassword />} />
      <Route path={`${RouteNames.SET_NEW_PASSWORD}/:token`} element={<SetPassword />} />
      <Route path={RouteNames.FORGOT_PASSWORD} element={<FogotPassword />} />
      <Route path={RouteNames.PACKS} element={<Packs />} />
      <Route path={RouteNames.LEARN} element={<Learn />} />
      <Route path={RouteNames.CARDS} element={<Cards />} />
      <Route path={RouteNames.CARDS_PACK_ID} element={<Cards />} />
    </Route>
  )
);
