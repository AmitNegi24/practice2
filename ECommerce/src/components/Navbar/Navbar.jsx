import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt} from "react-icons/fa"
import logo from '../../assets/logo.png'
import "../Navbar/Navbar.css"
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../redux/ReducerSlice'

function Navbar() {
    const productData = useSelector((state) => state.bazaar.productData);
    const userInfo = useSelector((state) => state.bazaar.userInfo)
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const logoutHandler = () => {
        setIsOpen(false)
        dispatch(removeUser())
    }
    // console.log(userInfo);
    return (
        <div>
            <nav className='navbar'>
                <div className='container'>
                    <Link to='/'><img src={logo} alt='logo' /></Link>
                    <div className='links'>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/search"}><FaSearch /></Link>
                        <Link to={"/cart"}><FaShoppingBag /><span className="badge badge-warning">{productData.length}</span></Link>
                        
                        {
                            userInfo ? (
                                <>
                                    <img  onClick={() => setIsOpen((prev) => !prev)} className='userlogo' src={userInfo ? userInfo.Image : "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt='icon' />
                                    <dialog className='dialog' open={isOpen}>
                                        <div>
                                            <button onClick={logoutHandler}>
                                                <FaSignOutAlt />
                                            </button>
                                        </div>
                                    </dialog>
                                </>
                            ) : (
                                <>
                                    <Link to={"/login"}><FaSignInAlt /></Link>
                                </>
                            )
                        }
                        {
                            userInfo && <p>{userInfo.name}</p>
                        }
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Navbar
{/* <Link to={"/login"}>
                            <img className='userlogo' src={userInfo ? userInfo.Image : "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt='icon' />
                        </Link> */}