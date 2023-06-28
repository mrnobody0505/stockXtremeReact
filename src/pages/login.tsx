import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "../components/auth/googleLogin";
import { EmailLogin } from "../components/auth/emailLogin";
import { Signup } from "./signup";
import LogoImg from "../public/Logo and Poster/StockXtreme Logo.png";
import FrontPageImg from "../public/img/login-side-img.jpg";
import styled from "styled-components";
import { link } from "fs";

export const Login = () => {
  return (
    <Main>
      <div>
        <SideImage src={FrontPageImg} alt="" />
      </div>
      <FormContainer>
        <LogoLink to="/">
          <LogoImage src={LogoImg} alt="" />
        </LogoLink>
        <EmailLogin />
        <div>
          <OrSeperator>or</OrSeperator>
          <GoogleLogin />
        </div>
        <SignupContainer>
          <label>Don't you have an account?</label>
          <SignupLink to="/signup" id="signup-link">
            Sign up here
          </SignupLink>
        </SignupContainer>
      </FormContainer>
    </Main>
  );
};

const Main = styled.main`
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  background: url("https://images.unsplash.com/photo-1517934274943-d1749ff2d7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80");
  background-repeat: no-repeat;
  background-size: cover;
`;

const SideImage = styled.img`
  border-radius: 24px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FormContainer = styled.section`
  width: 400px;
  margin: 0 auto;
  display: grid;
  row-gap: 48px;
`;

const LogoLink = styled(Link)`
  display: block;
  height: 100px;
  text-align: center;
}
`;

const LogoImage = styled.img`
  height:100%;
`

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

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupLink = styled(Link)`
  margin-left: 8px;
  color: #1e4ae9;
  text-decoration: none;
`;
