import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./register.module.scss";
import { Navigate, redirect } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className={s.regForm}>
      <div className={s.cards}>Cards</div>
      <div className={s.signIn}>Sign Up</div>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
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
          // className={s.input}
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
          {/*сделать навигацию!!!!!!!!!!!!!!!!!!!!*/}
          <button className={s.bt} type="button" onClick={() => <Navigate to={"/login"} />}>
            Cancel
          </button>
          <button className={s.bt} type="submit">
            Sign Up
          </button>
        </div>
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
