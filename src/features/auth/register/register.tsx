import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./register.module.scss";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { appActions } from "app/appSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { SuperButton } from "common/components/super-button/SuperButton";
import { authThunks } from "features/auth/authSlice";
import { RouteNames } from "app/routes";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InputAdornment from "@mui/material/InputAdornment";

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [inputType, setInputType] = useState(true);

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup
        .string()
        .min(8, "Password must be 8 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter"),
      confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response: any = await dispatch(authThunks.register({ email: data.email, password: data.password }));
    if (response.payload.statusText === "Created") {
      navigate("/profile");
    } else {
      dispatch(appActions.setError({ error: "check your network connection" }));
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main:
          errors.password || errors.email || errors.confirmPassword ? "rgb(222, 0, 145)" : "rgb(154 145 200)",
      },
    },
  });

  return (
    <div className={s.regForm}>
      <div className={s.signIn}>Sign Up</div>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <TextField
            id="standard-basic"
            label={errors.email ? errors.email.message : "Email"}
            variant="standard"
            style={{ width: "100%" }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            {...register("email", { required: true })}
          />
          <TextField
            id="standard-basic"
            type={inputType ? "text" : "password"}
            label={errors.password ? errors.password.message : "Password"}
            variant="standard"
            style={{ width: "100%" }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <RemoveRedEyeIcon onClick={() => setInputType(!inputType)} style={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
            {...register("password", { required: true })}
          />

          <TextField
            id="standard-basic"
            type={inputType ? "text" : "password"}
            label={errors.confirmPassword ? errors.confirmPassword.message : "Confirm password"}
            variant="standard"
            style={{ width: "100%" }}
            InputLabelProps={{ style: { fontSize: 13 } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <RemoveRedEyeIcon onClick={() => setInputType(!inputType)} style={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
            {...register("confirmPassword", { required: true })}
          />

          <div className={s.supportText}>
            <div>The password must contain:</div>
            <div className={s.bottomText}>• at least 8 characters</div>
            <div className={s.bottomText}>• numbers</div>
            <div className={s.bottomText}>• upper and lower case</div>
          </div>

          <div className={s.buttons}>
            <SuperButton
              name="Cancel"
              redirectPath={"/login"}
              borderRadius={"5px"}
              width={"120px"}
              height={"38px"}
              color={"primary"}
              variant={"contained"}
            />
            <SuperButton
              name="Sign Up"
              type={"submit"}
              borderRadius={"5px"}
              width={"120px"}
              height={"38px"}
              color={"primary"}
              variant={"contained"}
            />
          </div>
        </ThemeProvider>
      </form>
      <div className={s.isAccount}>Already have an account?</div>
      <Link to={RouteNames.LOGIN} className={s.loginLink}>
        Sign In
      </Link>
    </div>
  );
};

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
