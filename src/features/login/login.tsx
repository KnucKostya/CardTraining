import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import s from "./login.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { authThunks } from "../auth/authSlice";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";

type FormInputType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginHandler = () => {
    const payload = {
      email: "kozlov0020@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false,
    };
    dispatch(authThunks.login(payload));
  };
  const {
    register,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<FormInputType>();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit: SubmitHandler<FormInputType> = (data) => {
    dispatch(authThunks.login(data))
      .unwrap()
      .then(() => navigate("/packs"));
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className={s.container}>
      <div className={s.header}>Sign in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              type={"email"}
              variant={"standard"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              style={{ width: "347px" }}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            {/*{errors.email?<div style={{color: 'red'}}>{errors.email.message}</div> : null}*/}
            <TextField
              type={showPassword ? "text" : "password"}
              label="Password"
              margin="normal"
              variant={"standard"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              label={"Remember me"}
              control={<Checkbox {...register("rememberMe")} />}
            />

            <Button
              type={"submit"}
              variant={"contained"}
              color={"primary"}
              style={{ borderRadius: "30px", marginTop: "69px" }}
            >
              Sign in
            </Button>
          </FormGroup>
        </FormControl>
      </form>
      <div className={"s.forgot"}>
        <NavLink className={s.fogotLink} to="/forgot-password">
          Forgot password?
        </NavLink>
      </div>
      <div className={s.question}>Don't have an account?</div>
      <div>
        <NavLink to="/register" className={s.refisterLink}>
          {" "}
          Sign up
        </NavLink>
      </div>
    </div>
  );
};
