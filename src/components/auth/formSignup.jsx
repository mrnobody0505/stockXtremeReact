import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../config/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
export const FormSignup = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
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

  const isEmailRegistered = async (email) => {
    try {
      const userCredential = await fetchSignInMethodsForEmail(auth, email);
      return userCredential.length > 0;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const check = await isEmailRegistered(data.email);
    if (!check) {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
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
      <input
        type="email"
        placeholder="Email"
        // value={email}
        // onChange={(e) => setEmail(e.target.value)}
        {...register("email")}
      />
      {emailError}
      <input
        type="password"
        placeholder="Password"
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        {...register("password")}
      />
      {errors.password?.message}
      <input
        type="password"
        placeholder="Confirm Password"
        // value={cfPassword}
        // onChange={(e) => setCfPassword(e.target.value)}
        {...register("confirmPassword")}
      />
      <button type="submit">Sign Up</button>
      {emailError}
      {errors.password?.message}
      {errors.confirmPassword?.message}
    </form>
  );
};
