import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "../components/auth/googleLogin";
import { EmailLogin } from "../components/auth/emailLogin";
import { Signup } from "./signup";
export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1>StockXtreme</h1>
            <EmailLogin />
            <GoogleLogin />
            <div>Does not have an account?</div>
            <Link to="/signup">Sign up here</Link>
            <div>Forgot Password?</div>
            <Link to="/forgotPassword">Reset here</Link>
        </div>
    );
}