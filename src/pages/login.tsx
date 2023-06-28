import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "../components/auth/googleLogin";
import { EmailLogin } from "../components/auth/emailLogin";
import { Signup } from "./signup";
import LogoImg from "../public/Logo and Poster/StockXtreme Logo.png";
import FrontPageImg from "../public/img/login-side-img.jpg";
import "./login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="main-login">
      <div id="side-img-container">
        <img src={FrontPageImg} id="side-img" alt="" />
      </div>
      <div>
        <section id="container">
          <Link id="logo" to="/">
            <img src={LogoImg} alt="" />
          </Link>
          <EmailLogin />
          <div>
            <div id="or">or</div>
            <GoogleLogin />
          </div>
          <div id="signup-container">
            <label>Don't you have an account?</label>
            <Link to="/signup" id='signup-link'>
              Sign up here
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};
