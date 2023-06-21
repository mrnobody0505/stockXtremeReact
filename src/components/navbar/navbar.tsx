import pageLogo from '../../public/Logo and Poster/StockXtreme Logo.png'
import userProfile from '../../public/img/icon/default-user-profile.png'
import SearchInput from '../searchInput/searchInput';
import './navbar.css';
const Navbar = () => {
    return (
        <nav>
            <div className='logo-container'>
                <img src={pageLogo} alt="" />
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
