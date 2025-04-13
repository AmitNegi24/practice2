import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, resetCart } from '../../redux/ReducerSlice';
import logo from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.bazaar.productData);
  const userInfo = useSelector((state) => state.bazaar.userInfo);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const auth = getAuth();

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        dispatch(resetCart());
        toast.success('Logged out successfully');
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((err) => {
        console.error('Logout Error:', err);
        toast.error('Error logging out');
      });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FaBars />
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/search"><FaSearch /></Link>

          {userInfo && (
            <Link to="/cart" className="cart-link">
              <FaShoppingBag />
              <span className="cart-badge">{productData.length}</span>
            </Link>
          )}

          {userInfo ? (
            <div className="user-section" onClick={() => setShowDropdown(!showDropdown)}>
              <img
                src={userInfo.Image || 'https://via.placeholder.com/150'}
                alt="User"
                className="user-avatar"
              />
              <span className="username">{userInfo.name}</span>

              {showDropdown && (
                <div className="dropdown">
                  <button onClick={logoutHandler}><FaSignOutAlt /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login"><FaSignInAlt /> Login</Link>
          )}
        </div>
      </div>
      <ToastContainer position='top-left' autoClose={2000} theme='dark' />
    </nav>
  );
}

export default Navbar;
