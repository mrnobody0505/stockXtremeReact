import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/authContext";

export const EmailLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = UserAuth();
    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <form onSubmit={handleEmailLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(val) => setEmail(val.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password..."
                    value={password}
                    onChange={(val) => setPassword(val.target.value)}
                />
                <button type="submit"> Login </button>
            </form> 
        </div>
    )
} 