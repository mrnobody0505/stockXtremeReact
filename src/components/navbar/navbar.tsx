import { useState } from "react";
import pageLogo from "../../public/Logo and Poster/StockXtreme Logo.png";
import userProfile from "../../public/img/icon/default-user-profile.png";
import SearchInput from "../searchInput/searchInput";
import "./navbar.css";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/authContext";
const Navbar = () => {
  const { logout } = UserAuth();
  const [userMenu, setUserMenu] = useState(false);
  return (
    <div className="nav-wrapper">
      <nav>
        <div className="logo-container">
          <Link to="/home">
            <img src={pageLogo} alt="" />
          </Link>
        </div>

        <SearchInput />

        <div style={{ position: "relative" }}>
          <button
            className="profile-container"
            onClick={() => {
              setUserMenu(!userMenu);
            }}
          >
            <img src={userProfile} alt="" />
          </button>
          {userMenu && (
            <div style={{position:"absolute",top:"50px",left:"0px"}}>
              <button>Account</button>
              <button onClick={logout}>Log out</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
