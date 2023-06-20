import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth"; 
export const EmailLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleEmailLogin = async (e : any) => {
        e.preventDefault();
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
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