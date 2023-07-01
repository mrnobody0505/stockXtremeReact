import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
import {
  AuthInput,
  AuthInputWrapper,
  AuthSubmitButton,
} from "../styles/auth/auth";
import styled from "styled-components";

export const FormSignup = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const { createUser, isEmailRegistered } = UserAuth();
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, "Password has to be at least 6 characters")
      .max(20, "Password is too long! Try another with less than 20 characters")
      .required("Your password is required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords don't match! Try again")
      .required("You have not confirmed your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormWrapper>
        <AuthInputWrapper>
          <AuthInput type="email" placeholder="Email" {...register("email")} />
        </AuthInputWrapper>
        <AuthInputWrapper>
          <AuthInput
            type="password"
            placeholder="Password"
            {...register("password")}
          />
        </AuthInputWrapper>
        <AuthInputWrapper>
          <AuthInput
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
        </AuthInputWrapper>
        <AuthSubmitButton type="submit">Sign Up</AuthSubmitButton>
        {emailError}
        {errors.password?.message}
        {errors.confirmPassword?.message}
      </FormWrapper>
    </form>
  );
};

const FormWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  row-gap: 24px;
`;
