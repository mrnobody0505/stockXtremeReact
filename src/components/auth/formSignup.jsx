import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
import './formSignup.css'

export const FormSignup = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const { createUser, isEmailRegistered } = UserAuth();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string()
                 .min(6, "Password has to be at least 6 characters")
                 .max(20, "Password is too long! Try another with less than 20 characters")
                 .required("Your password is required!"),
    confirmPassword: yup.string()
                        .oneOf([yup.ref("password"), null], "Passwords don't match! Try again")
                        .required("You have not confirmed your password")
  });
  
  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  });   
  const onSubmit = async (data) => {
    console.log(data);
    const check = await isEmailRegistered(data.email);
    if (!check) {
        await createUser(data.email, data.password);
        navigate("/home");
        console.log("success");
        setEmailError("");
    } else {
        setEmailError("This email has been registered. Try another one.");
    }
  };
  console.log(errors);
  return (
    <div id="sign-up">
      <div id="sign-up-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Create an account</h2>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password?.message}
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <button type="submit">Sign Up</button>
          {emailError}
          {errors.password?.message}
          {errors.confirmPassword?.message}
        </form>
      </div>
    </div>
  );
};
