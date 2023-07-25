import { useState } from "react";
import pageLogo from "../../public/Logo and Poster/StockXtreme Logo.png";
import userProfile from "../../public/img/icon/default-user-profile.png";
import SearchInput from "../searchInput/searchInput";
import "./navbar.css";
import { Link, To, useNavigate } from 'react-router-dom';
import { UserAuth } from "../../context/authContext";

const Navbar = () => {
  const { logout } = UserAuth();
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const handleProfileClick = (route: To) => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <div className="nav-wrapper">
      <nav>
        <div className="logo-container">
          <Link to="/">
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
              <button onClick={() => handleProfileClick('/user-profile')}>Account</button>
              <button onClick={logout}>Log out</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
