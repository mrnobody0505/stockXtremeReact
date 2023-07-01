import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "../components/auth/googleLogin";
import { EmailLogin } from "../components/auth/emailLogin";
import { Signup } from "./signup";
import LogoImg from "../public/Logo and Poster/StockXtreme Logo.png";
import FrontPageImg from "../public/img/login-side-img.jpg";
import styled from "styled-components";
import {
  AuthMain,
  AuthSideImage,
  AuthFormContainer,
  AuthLogoLinkContainer,
  AuthSignupContainer,
  AuthBg,
} from "../components/styles/auth/authPages";
import { AuthStyledLink } from "../components/styles/auth/auth";
import { link } from "fs";

export const Login = () => {
  return (
    <AuthBg>
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
          <EmailLogin />
          <div>
            <OrSeperator>or</OrSeperator>
            <GoogleLogin />
          </div>
          <AuthSignupContainer>
            <label>Don't you have an account?</label>
            <AuthStyledLink
              style={{ marginLeft: "20px" }}
              to="/signup"
              id="signup-link"
            >
              Sign up here
            </AuthStyledLink>
          </AuthSignupContainer>
        </AuthFormContainer>
      </AuthMain>
    </AuthBg>
  );
};

const OrSeperator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  color: #294957;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: 0.16px;

  &::before,
  &::after {
    content: "";
    display: block;
    background: #cfdfe2;
    width: 40%;
    height: 1px;
    margin: 0 10px;
  }
`;
