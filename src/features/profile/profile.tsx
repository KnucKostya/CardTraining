import React from "react";
import s from "./Profile.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ava from "assets/images/defaultAva.png";
import { IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { authThunks } from "features/auth/authSlice";
import { SuperButton } from "common/components/super-button/SuperButton";
import { EditableSpan } from "common/components/EditableSpan/EditableSpan";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";
import {
  userAvatar_auth_Selector,
  userEmail_auth_Selector,
  userId_auth_Selector,
  userName_auth_Selector,
} from "../auth/authSelector";

export const Profile = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(userId_auth_Selector);
  const userAvatar = useAppSelector(userAvatar_auth_Selector);
  const userName = useAppSelector(userName_auth_Selector);
  const userEmail = useAppSelector(userEmail_auth_Selector);

  const onClickLogoutHandler = () => {
    dispatch(authThunks.logoutTC());
  };
  const onChangeNameHandler = (name: string) => {
    dispatch(authThunks.updateUserTC({ name }));
  };

  return (
    <div className={s.profileBlock} id="profile">
      <div className={s.headActions}>
        <SuperButton
          name={"Back to Packs"}
          redirectPath={"/packs"}
          startIcon={<ArrowBackIcon />}
          color={"primary"}
        />
      </div>
      <div className={`container ${s.profileContainer}`}>
        <div className={s.profile}>
          <h3>Profile</h3>
          <div className={s.info}>
            <div className={s.avatarBlock}>
              <img className={s.avatar} src={userId && userAvatar ? userAvatar : ava} alt="avatar" />
              <IconButton className={s.photoIcon} aria-label="change photo">
                <AddAPhotoIcon />
              </IconButton>
            </div>
            <EditableSpan
              value={userId && userName ? userName : "Change name input (not Logged in)"}
              onChange={onChangeNameHandler}
              // disabled={props.taskEntityStatus === 'loading'}
              disabled={false}
            />
            <span className={s.email}>{userId ? userEmail : "Your email here"}</span>
          </div>
          <SuperButton
            onClickCallBack={onClickLogoutHandler}
            name={"Logout"}
            startIcon={<LogoutIcon />}
            width={"127px"}
            height={"36px"}
            borderRadius={"10px"}
            color={"primary"}
          />
        </div>
      </div>
    </div>
  );
};
