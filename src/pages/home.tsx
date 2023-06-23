import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar"

export const Home = () => {
    return (
    <div>
        <Navbar />
        <button><Link to="/">Logout</Link></button>
    </div>
    );
}