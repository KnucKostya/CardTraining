import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "../forgotPassword/resetPassword.module.css";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";
import { authThunks } from "../authSlice";

type FormInputType = {
  password: string
}
export const SetPassword = () => {
  const dispatch = useAppDispatch();
  const { token } = useParams()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputType>();

  const onSubmit: SubmitHandler<FormInputType> = data => {
    console.log(data);
    dispatch(authThunks.setNewPassword({
      password:data.password,
      resetPasswordToken: token
    }))
      .unwrap()
      .then(()=>navigate('/login'))
  }
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div className={`${s.container} ${s.newcon}`}>
      <div className={s.header}>Create new password</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormGroup>
            <TextField label="Password" margin="normal" type={showPassword ? "text" : "password"} variant={"standard"} {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }})} style={{ width: "347px" }} error={Boolean(errors.password)} helperText={errors.password?.message} InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}/>
            <div ><span className={s.question}>
        Enter your email address and we will send you <br/> further instructions
      </span></div>
            <Button type={"submit"} variant={"contained"} color={"primary"}
                    style={{ borderRadius: "30px", marginTop: "69px" }}>
              Send Instructions
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
};


