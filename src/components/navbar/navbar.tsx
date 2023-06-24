import pageLogo from '../../public/Logo and Poster/StockXtreme Logo.png'
import userProfile from '../../public/img/icon/default-user-profile.png'
import SearchInput from '../searchInput/searchInput';
import './navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav>
            <div className='logo-container'>
                <Link to="/home"><img src={pageLogo} alt="" /></Link>
            </div>

            <SearchInput />

            <div>
                <button className='profile-container'>
                    <img src={userProfile} alt="" />
                </button>
            </div>
        </nav>
    )
}
export default Navbar;
