import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth"; 
import googleImage from "../public/img/icon/icons8-google.svg";
export const GoogleLogin = () => {
    const navigate = useNavigate();
    const handleLoginByGoogle = async (e : any) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, googleProvider);
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <button onClick={handleLoginByGoogle}>Login with Google <img src={googleImage}/></button>
        </div>
    )
} 