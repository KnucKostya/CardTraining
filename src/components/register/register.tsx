import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./register.module.scss";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "../../common/hooks/hooks";
import { registerThunks } from "../../redux/registrationSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { appActions } from "app/appSlice";
import { MuiButton } from "../../common/components/MuiButton";
import { Navigate, useNavigate } from "react-router-dom";
import {SuperButton} from "common/components/super-button/SuperButton";

export const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      dispatch(registerThunks.register({ email: data.email, password: data.password }));
      dispatch(appActions.setIsLoading({ isLoading: true }));
      navigate("/profile");
    } catch (e: any) {
      console.log(e);
      dispatch(appActions.setError({ error: e }));
    } finally {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }

    // dispatch(appActions.setError({ error: "your password confirmation is invalid" }));
    // dispatch(registerActions.setError(e?.))
  };

  const theme = createTheme({
    palette: {
      primary: {
        main:
          errors.password || errors.email || errors.confirmPassword
            ? "rgb(222, 0, 145)"
            : "rgb(154 145 200)",
      },
    },
  });

  return (
    <div className={s.regForm}>
      <div className={s.cards}>Cards</div>
      <div className={s.signIn}>Sign Up</div>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <TextField
            id="standard-basic"
            label={errors.email ? errors.email.message : "email"}
            variant="standard"
            InputLabelProps={{ style: { fontSize: 13 } }}
            {...register("email", { required: true })}
          />
          <p></p>
          <TextField
            id="standard-basic"
            label={errors.password ? errors.password.message : "password"}
            variant="standard"
            InputLabelProps={{ style: { fontSize: 13 } }}
            {...register("password", { required: true })}
          />

          <TextField
            id="standard-basic"
            label={errors.confirmPassword ? errors.confirmPassword.message : "confirm password"}
            variant="standard"
            InputLabelProps={{ style: { fontSize: 13 } }}
            {...register("confirmPassword", { required: true })}
          />

          <div className={s.supportText}>
            <div>The password must contain:</div>
            <div className={s.bottomText}>• at least 8 characters</div>
            <div className={s.bottomText}>• numbers</div>
            <div className={s.bottomText}>• upper and lower case</div>
          </div>


          <div className={s.buttons}>
            <SuperButton name="Cancel" redirectPath={"/login"}  borderRadius={"5px"}
            width={'120px'} height={'38px'}
            />
            <SuperButton name="Sign Up" type={"submit"}  borderRadius={"5px"}
                         width={'120px'} height={'38px'}
            />
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
};
export default Register;

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
