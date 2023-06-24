import { Link } from "react-router-dom";

export const SuccessfulSignup = () => {
    return (
        <div>
            <h1>Your account has been successfully created! Redirect to homepage</h1>
            <Link to="/home">here</Link>
        </div>
    );
}