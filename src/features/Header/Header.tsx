import React from "react";
import s from "features/Header/Header.module.scss";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useLocation } from "react-router-dom";
import { RouteNames } from "../../app/routes";
import { SuperButton } from "../../common/components/super-button/SuperButton";
import { ProgressBar } from "../app/ProgressBar/ProgressBar";
import ava from "../../assets/images/ava.png";
import { isLoading_Selector } from "../../app/appSelector";
import { userAvatar_Selector, userEmail_Selector, userId_Selector, userName_Selector } from "../auth/authSelector";

export const Header = () => {
  const isLoading = useAppSelector(isLoading_Selector);
  const userAvatar= useAppSelector(userAvatar_Selector);
  const userName= useAppSelector(userName_Selector);

  const location = useLocation();
  const profilePage = location.pathname === RouteNames.PROFILE;

  return (
    <>
      <div className={s.header} id="header">
        <div className={`container ${s.headerContainer}`}>
          <div>
            <h1>Cards</h1>
          </div>
          {!profilePage &&
            (<div className={s.actions}>
              <SuperButton name={"Sign In"} redirectPath={RouteNames.LOGIN} />
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
    </>
  );
};
