import React from "react";
import s from "../forgotPassword/resetPassword.module.css";
import mail from "assets/images/mail.png";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { email_Selector } from "features/auth/checkEmail/checkEmailSelectors";

export const CheckEmail = () => {
  const email = useAppSelector(email_Selector);
  return (
    <div className={`${s.container} ${s.containerMail}`}>
      <div className={s.header}>Check Email</div>
      <img src={mail} alt={"email"} />
      <div className={s.question}>
        We’ve sent an Email with instructions to <br /> {email ? email : "example@mail.com"}
      </div>
      <Button
        type={"button"}
        variant={"contained"}
        color={"primary"}
        style={{ width: "347px", borderRadius: "30px", marginTop: "49px" }}
      >
        <NavLink className={s.ButtonLink} to="/login">
          Back to login
        </NavLink>
      </Button>
    </div>
  );
};
