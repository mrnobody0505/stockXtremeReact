import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormSignup } from "../components/auth/formSignup";
import FrontPageImg from "../public/img/login-side-img.jpg";
import LogoImg from "../public/Logo and Poster/StockXtreme Logo.png";
import {
  AuthFormContainer,
  AuthMain,
  AuthSideImage,
  AuthLogoLinkContainer,
  AuthBg,
} from "../components/styles/auth/authPages";
import { auth } from "../config/firebase";
import styled from "styled-components";
export const Signup = () => {
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
          <PageTitle> Create new account</PageTitle>
          <FormSignup />
        </AuthFormContainer>
      </AuthMain>
    </AuthBg>
  );
  {
    /* // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [cfPassword, setCfPassword] = useState("");
    // const [passwordMismatch, setPasswordMismatch] = useState(false);
    // const [error, setError] = useState("");
    // const navigate = useNavigate();

    // const isEmailRegistered = async (email: string) => {
    //     try {
    //       const userCredential = await fetchSignInMethodsForEmail(auth, email);
    //       return userCredential.length > 0;
    //     } catch (error) {
    //       console.error('Error checking email:', error);
    //       return false;
    //     }
    //   };

    // const handleSignUp = async (e: any) => {
    //     e.preventDefault(); //prevent the page from refreshing
    //     const emailExist = await isEmailRegistered(email);
    //     if (emailExist) {
    //         setError('Email is already registered.');
    //         return;
    //     }
    //     if (password !== cfPassword) {
    //         setPasswordMismatch(true);
    //         setError("Password does not match!");
    //         return;
    //     }
    //     try {
    //         await createUserWithEmailAndPassword(auth, email, password);
    //         navigate("/home");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // return (
    //     <div>
    //         <h1>Create an account</h1>
    //         <form onSubmit={handleSignUp}>
    //             <input
    //                 type="email"
    //                 placeholder="Email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //             />
    //             <input
    //                 type="password"
    //                 placeholder="Password"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <input
    //                 type="password"
    //                 placeholder="Confirm Password"
    //                 value={cfPassword}
    //                 onChange={(e) => setCfPassword(e.target.value)}
    //             />
    //             {error && <p>{error}</p>}
    //             <button type="submit">Sign Up</button>
    //         </form>
    //         <div>Already have an account?</div>
    //         <Link to="/">Login here</Link>
    //     </div>
    // ) */
  }
};

const PageTitle = styled.h1`
  margin: 0;
  text-align: center;
`;
