import { useNavigate } from "react-router-dom";
import googleImage from "../../public/img/icon/icons8-google.svg";
import { UserAuth } from "../../context/authContext";
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
        <div>
            <button onClick={handleLoginByGoogle}>Login with Google <img src={googleImage}/></button>
        </div>
    )
} 