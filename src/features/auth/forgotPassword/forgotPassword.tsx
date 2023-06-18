import React from "react";
import TextField from "@mui/material/TextField";
import s from "./resetPassword.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { authThunks } from "../authSlice";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";




type FormInputType = {
  email: string
}
export const FogotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputType>();

  const message = `<div style={{ backgroundColor: "lime"; padding: "15px"}}>password recovery link: <a href="http://localhost:3001/#/set-new-password/$token$"> Link</a></div>`;

  const onSubmit: SubmitHandler<FormInputType> = data => {
    console.log(data);
    dispatch(authThunks.sendResetPassword({ email: data.email, from: "kozlov0020@gmail", message }))
      .unwrap()
      .then(() => navigate("/check-email"));
  };

  return (
    <div className={s.container}>
      <div className={s.header}>Forgot your password?</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormGroup>
            <TextField label="Email" margin="normal" type={"email"} variant={"standard"} {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })} style={{ width: "347px" }} error={Boolean(errors.email)} helperText={errors.email?.message} />
            <div><span className={s.question}>
        Enter your email address and we will send you <br /> further instructions
      </span></div>
            <Button type={"submit"} variant={"contained"} color={"primary"}
                    style={{ borderRadius: "30px", marginTop: "69px" }}>
              Send Instructions
            </Button>
          </FormGroup>
        </FormControl>
      </form>
      <div className={s.question}>Did you remember your password?</div>
      <div><NavLink to={"/login"} className={s.loginLink}>Try logging in</NavLink></div>
    </div>
  );
};
