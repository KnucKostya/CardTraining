import React, { useEffect } from "react";
import s from "./Profile.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RootState } from "app/store";
import ava from "../../assets/images/ava.png";
import { Navigate, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {authThunks} from "features/auth/authSlice";
import {SuperButton} from "common/components/super-button/SuperButton";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { profile, isAuth } = useAppSelector((state: RootState) => state.auth)

  const onClickLogoutHandler = () => {
    dispatch(authThunks.logoutTC());
  };
  const onChangeNameHandler = (name: string) => {
    dispatch(authThunks.updateUserTC({ name }));
  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) navigate("/login");
  // }, [isAuth]);

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
          <h2>Personal Information</h2>
          <div className={s.info}>
            <div className={s.avatarBlock}>
              <img
                className={s.avatar}
                src={profile && profile.avatar ? profile.avatar : ava}
                alt="userAva"
              />
              <IconButton className={s.photoIcon} aria-label="change photo">
                <AddAPhotoIcon />
              </IconButton>
            </div>
            <EditableSpan
              value={profile ? profile.name : "User name"}
              onChange={onChangeNameHandler}
              // disabled={props.taskEntityStatus === 'loading'}
              disabled={false}
            />
            <span style={{ opacity: 0.5 }}>{profile ? profile.email : "example@mail.com"}</span>
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
