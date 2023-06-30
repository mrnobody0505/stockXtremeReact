import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/authContext";
import {
  AuthFormContainer,
  AuthMain,
  AuthSideImage,
  AuthLogoLinkContainer,
} from "../components/styles/auth/authPages";
import LogoImg from "../public/Logo and Poster/StockXtreme Logo.png";
import FrontPageImg from "../public/img/login-side-img.jpg";
import styled from "styled-components";
import {
  AuthInput,
  AuthInputWrapper,
  AuthSubmitButton,
} from "../components/styles/auth/auth";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const { isEmailRegistered } = UserAuth();

  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    const emailExist = await isEmailRegistered(email);
    console.log(emailExist);
    if (emailExist) {
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage(
          "Link to reset password has been sent to your email. Please check your inbox."
        );
        setIsSent(true);
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    } else {
      setSuccessMessage("Email not found, try again");
    }
  };

  return (
    <AuthMain>
      <div>
        <AuthSideImage src={FrontPageImg} alt="" />
      </div>
      <AuthFormContainer>
        <AuthLogoLinkContainer>
          <Link to="/">
            <img style={{ height: "100%" }} src={LogoImg} alt="" />
          </Link>
        </AuthLogoLinkContainer>
        <PageTitle> Forgot Password</PageTitle>
        <form onSubmit={handleResetPassword}>
          <FormWrapper>
            <AuthInputWrapper>
              <AuthInput
                type="email"
                placeholder="Enter Email"
                // value={email}
                onChange={(val: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(val.target.value)
                }
              />
            </AuthInputWrapper>
            <AuthSubmitButton type="submit">Reset Password</AuthSubmitButton>
            {successMessage && <p>{successMessage}</p>}
            {isSent ? <Link to="/">Redirect to Login page</Link> : ""}
          </FormWrapper>
        </form>
      </AuthFormContainer>
    </AuthMain>
  );
};

const PageTitle = styled.h1`
  margin: 0;
  text-align: center;
`;

const FormWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  row-gap: 24px;
`;
