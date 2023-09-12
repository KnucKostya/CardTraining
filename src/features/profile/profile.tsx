import React, { useEffect, useState } from "react";
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
  isAuth_auth_Selector,
  userAvatar_auth_Selector,
  userEmail_auth_Selector,
  userId_auth_Selector,
  userName_auth_Selector,
} from "../auth/authSelector";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(userId_auth_Selector);
  const userAvatar = useAppSelector(userAvatar_auth_Selector);
  const userName = useAppSelector(userName_auth_Selector);
  const userEmail = useAppSelector(userEmail_auth_Selector);
  const isAuth = useAppSelector(isAuth_auth_Selector);
  const navigate = useNavigate();
  const [fileFinal, setFile] = useState("");

  if (!isAuth) {
    toast.warning("you are not signed in yet");
    navigate("/login");
  }

  const uploadHandler = (e: any) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setFile(file64);
        });
      } else {
        toast.error("File is to big, chose another file");
      }
    }
  };

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      callBack(file64);
    };
    reader.readAsDataURL(file);
  };

  const onChangeNameHandler = (name: string) => {
    dispatch(authThunks.updateUserTC({ name }));
  };

  const onClickLogoutHandler = () => {
    dispatch(authThunks.logoutTC());
  };

  useEffect(() => {
    if (fileFinal) {
      dispatch(authThunks.updateUserTC({ avatar: fileFinal }));
    }
  }, [fileFinal]);

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

              <label htmlFor="fileInput">
                <input
                  type="file"
                  id="fileInput"
                  style={{ opacity: 0, position: "absolute", zIndex: 999 }}
                  onChange={uploadHandler}
                />
                <IconButton color="primary" aria-label="Загрузить файл" component="span">
                  <AddAPhotoIcon />
                </IconButton>
              </label>
            </div>
            <EditableSpan
              value={userId && userName ? userName : "Change name input (not Logged in)"}
              onChange={onChangeNameHandler}
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
