import React from "react";
import s from "features/Header/Header.module.scss";
import { useAppSelector } from "common/hooks/useAppSelector";
import { Link, useLocation } from "react-router-dom";
import { RouteNames } from "app/routes";
import { SuperButton } from "common/components/super-button/SuperButton";
import { ProgressBar } from "../app/ProgressBar/ProgressBar";
import ava from "assets/images/defaultAva.png";
import logo from "assets/images/cardsLogo.png";
import { isLoading_Selector } from "app/appSelector";
import { userAvatar_auth_Selector, userName_auth_Selector } from "../auth/authSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { authThunks } from "features/auth/authSlice";

export const Header = () => {
  const isLoading = useAppSelector(isLoading_Selector);
  const userAvatar = useAppSelector(userAvatar_auth_Selector);
  const userName = useAppSelector(userName_auth_Selector);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const profilePage = location.pathname === RouteNames.PROFILE;
  const logoutHandler = () => {
    dispatch(authThunks.logoutTC());
  };

  return (
    <div className={s.header} id="header">
      <div className={`container ${s.headerContainer}`}>
        <div className={s.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={s.links}>
          <Link to={RouteNames.PROFILE} style={{ textDecoration: "none", color: "rgb(154 145 200)" }}>
            <h1 className={s.profileLink}>
              {<FontAwesomeIcon icon={faUser} className={s.profileLogo} />}Profile
            </h1>
          </Link>
          <Link to={RouteNames.PACKS} style={{ textDecoration: "none", color: "rgb(154 145 200)" }}>
            <h1 className={s.profileLink}>
              {<FontAwesomeIcon icon={faAddressCard} className={s.profileLogo} />}Pack List
            </h1>
          </Link>
          <span style={{ color: "rgb(154 145 200)", cursor: "pointer" }} onClick={logoutHandler}>
            <h1 className={s.profileLink}>
              {<FontAwesomeIcon icon={faRightFromBracket} className={s.profileLogo} />}Logout
            </h1>
          </span>
        </div>
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
