import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/authContext";
import './emailLogin.css'

export const EmailLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = UserAuth();
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            navigate("/home");
        } catch (err) {
            setErrorMessage(getErrorMessage(err.message));
            console.log(err);
        }
    }

    const getErrorMessage = (errorCode) => {
        let errorMessage = '';  
        switch (errorCode) {
          case 'Firebase: Error (auth/wrong-password).':
            errorMessage = 'Invalid password. Please try again.';
            break;
         // Add more cases for other error codes if needed
          default:
            errorMessage = 'An error occurred. Please try again.';
            break;
        }

        return errorMessage;
      };

      return (
        <div id ="email-login">
            <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(val) => setEmail(val.target.value)}
                    style={{ marginBottom: "10px", padding: "5px" }}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(val) => setPassword(val.target.value)}
                    style={{ marginBottom: "10px", padding: "5px" }}
                />
                <button type="submit" style={{ padding: "10px 20px" }}>Login</button>
            </form>
        </div>
    );
};