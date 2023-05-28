import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import s from "./register.module.scss";
import * as Form from "@radix-ui/react-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("email")); // watch input value by passing the name of it
  // watch input value by passing the name of i
  return (
    <div className={s.regForm}>
      <Form.Root className="FormRoot">
        <Form.Field className="FormField" name="cards">
          <Form.Label className={s.cards}>Cards</Form.Label>
        </Form.Field>

        <Form.Field className="FormField" name="SignUp">
          <Form.Label className="FormLabel">Sign Up</Form.Label>
        </Form.Field>

        <Form.Field className="FormField" name="email">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <Form.Label className="FormLabel">Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter your email
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              Please provide a valid email
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" type="email" required />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea className="Textarea" required />
          </Form.Control>
        </Form.Field>
        <Form.Field className="FormField" name="password">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <Form.Label className="FormLabel">Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a password
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea className="Textarea" required />
          </Form.Control>
        </Form.Field>

        <div className={s.buttons}>
          <button className="Button" style={{ marginTop: 10 }}>
            Cancel
          </button>

          <Form.Submit asChild>
            <button className="Button" style={{ marginTop: 10 }}>
              Sign Up
            </button>
          </Form.Submit>
        </div>
      </Form.Root>

      {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*  <input className="divide-y divide-gray-200" placeholder={"email"} {...register("email", { required: true })} />*/}
      {/*  <input className="ml-3" placeholder={"password"} {...register("password", { required: true })} />*/}
      {/*  <input placeholder={"confirm password"} {...register("confirmPassword", { required: true })} />*/}
      {/*  /!*{errors.exampleRequired && <span>This field is required</span>}*!/*/}
      {/*  <input type="submit" />*/}
      {/*</form>*/}
    </div>
  );
};

export default Register;

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
