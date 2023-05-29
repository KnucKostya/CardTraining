import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./register.module.scss";

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
      <div>Cards Sign Up</div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        Please enter your email
      </div>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        Please enter a password
      </div>

      <div className={s.buttons}>
        <button className="Button" style={{ marginTop: 10 }}>
          Cancel
        </button>
        <button className="Button" style={{ marginTop: 10 }}>
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="divide-y divide-gray-200" placeholder={"email"} {...register("email", { required: true })} />
        <input className="ml-3" placeholder={"password"} {...register("password", { required: true })} />
        <input placeholder={"confirm password"} {...register("confirmPassword", { required: true })} />
        {/*{errors.exampleRequired && <span>This field is required</span>}*/}
        <input type="submit" />
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
