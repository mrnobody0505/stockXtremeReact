import { useNavigate } from "react-router-dom";
import googleImage from "../../public/img/icon/icons8-google.svg";
import { UserAuth } from "../../context/authContext";
import './googleLogin.css'

export const GoogleLogin = () => {
    const navigate = useNavigate();
    const { googleLogin } = UserAuth();
    const handleLoginByGoogle = async (e : any) => {
        e.preventDefault();
        try {
            const result = await googleLogin();
            navigate("/home");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div id="quick-login">
            <button className="quick-login-options" onClick={handleLoginByGoogle}>
                 <img src={googleImage}/> Login with Google
            </button>
        </div>
    )
} 