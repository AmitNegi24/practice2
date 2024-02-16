import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../assets/logo.png';
import '../Navbar/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, resetCart } from '../../redux/ReducerSlice';

function Navbar() {
    const navigate = useNavigate();
    const productData = useSelector((state) => state.bazaar.productData);
    const userInfo = useSelector((state) => state.bazaar.userInfo);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const auth = getAuth();

    const logoutHandler = () => {
        setIsOpen(false)
        signOut(auth)
            .then(() => {
                dispatch(removeUser());
                dispatch(resetCart());
                toast.success('Logged out successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            })
            .catch((err) => {
                console.error('Error during logout:', err);
                toast.error('Error logging out');
            });
    };

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/search">
                            <FaSearch />
                        </Link>
                        {userInfo && (
                            <Link to="/cart">
                                <FaShoppingBag />
                                <span className="badge badge-warning">{productData.length}</span>
                            </Link>
                        )}
                        {userInfo ? (
                            <>
                                <img
                                    onClick={() => setIsOpen((prev) => !prev)}
                                    className="userlogo"
                                    src={userInfo.Image || 'https://via.placeholder.com/150'}
                                    alt="user icon"
                                />
                                <dialog className="dialog" open={isOpen}>
                                    <div>
                                        <button onClick={logoutHandler}>
                                            <FaSignOutAlt />
                                        </button>
                                    </div>
                                </dialog>
                                <p>{userInfo.name}</p>
                            </>
                        ) : (
                            <Link to="/login">
                                <FaSignInAlt />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
            
        </div>
    );
}

export default Navbar;
