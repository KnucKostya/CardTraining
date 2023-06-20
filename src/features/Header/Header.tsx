import React from "react";
import s from "features/Header/Header.module.scss";
import { useAppSelector } from "common/hooks/useAppSelector";
import { Link, useLocation } from "react-router-dom";
import { RouteNames } from "app/routes";
import { SuperButton } from "common/components/super-button/SuperButton";
import { ProgressBar } from "../app/ProgressBar/ProgressBar";
import ava from "../../assets/images/ava.png";
import { isLoading_Selector } from "app/appSelector";
import { userAvatar_auth_Selector, userName_auth_Selector } from "../auth/authSelector";

export const Header = () => {
  const isLoading = useAppSelector(isLoading_Selector);
  const userAvatar = useAppSelector(userAvatar_auth_Selector);
  const userName = useAppSelector(userName_auth_Selector);

  const location = useLocation();
  const profilePage = location.pathname === RouteNames.PROFILE;

  return (
    <div className={s.header} id="header">
      <div className={`container ${s.headerContainer}`}>
        <div>
          <h1>Cards</h1>
        </div>
        <Link to={RouteNames.PROFILE} style={{ textDecoration: "none", color: "rgb(154 145 200)" }}>
          <h1>Go to Profile</h1>
        </Link>
        {!profilePage && (
          <div className={s.actions}>
            <SuperButton
              name={"Sign In"}
              redirectPath={RouteNames.LOGIN}
              height={"36px"}
              borderRadius={"30px"}
              variant={"contained"}
            />
          </div>
        )}
        {profilePage && (
          <div className={s.actions}>
            <div className={s.userName}>{userName ? userName : "user"}</div>
            <div className={s.avatar}>
              <img src={userAvatar ? userAvatar : ava} alt="userAva" />
            </div>
          </div>
        )}
      </div>
      {isLoading && <ProgressBar />}
    </div>
  );
};
