import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./register.module.scss";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch } from "../../common/hooks/hooks";
import { registerThunks } from "../../redux/registrationSlice";

export const Register = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.confirmPassword) {
      dispatch(registerThunks.register({ email: data.email, password: data.password }));
    }
    // dispatch(registerActions.setError(e?.))

    //установить еррор если !==      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(154 145 200)", // Здесь можно указать желаемый цвет
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
            label="email"
            variant="standard"
            InputLabelProps={{ style: { fontSize: 13 } }}
            {...register("email", { required: true })}
          />
          <TextField
            id="standard-basic"
            label="password"
            variant="standard"
            InputLabelProps={{ style: { fontSize: 13 } }}
            {...register("password", { required: true })}
          />
          <TextField
            // sx={s.input}
            id="standard-basic"
            label="confirm password"
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
            <button type="button" className={s.bt}>
              <Link to={"/login"} style={{ textDecoration: "none", color: "black" }}>
                Cancel
              </Link>
              {/*Cancel*/}
            </button>
            {/* <Link type="button" to={"/login"} style={linkStyle}>*/}
            {/*  Cancel*/}
            {/*</Link>*/}
            <button className={s.bt} type="submit">
              Sign Up
            </button>
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
