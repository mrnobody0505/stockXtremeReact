import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "../components/auth/googleLogin";
import { EmailLogin } from "../components/auth/emailLogin";
import { Signup } from "./signup";
import LogoImg from '../public/Logo and Poster/StockXtreme Logo.png'
import FrontPageImg from '../public/img/login-side-img.jpg';
import './login.css'

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <main>
                <img src={FrontPageImg} alt="" />
                    <section id="log-in">
                        <a id="logo"><img src={LogoImg} alt="" /></a>   
                        <div id="login">
                            <EmailLogin />
                            <GoogleLogin />
                            <h3 id="func">Do not have an account?</h3>
                            <Link to="/signup"><h4>Sign up here</h4></Link>
                            <h3 id="func">Forgot Password?</h3>
                            <Link to="/forgotPassword"><h4>Reset here</h4></Link>
                        </div>
                    </section>
            </main>
        </div>
    );
}