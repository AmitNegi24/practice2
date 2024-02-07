import React from 'react'
import { Link } from "react-router-dom"
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa"
import logo from '../../assets/logo.png'
import "../Navbar/Navbar.css"
function Navbar() {
    return (
        <div>
            <nav className='navbar'>
                <div className='container'>
                    <Link to='/'><img src={logo} alt='logo' /></Link>
                    <div className='links'>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/search"}><FaSearch /></Link>
                        <Link to={"/cart"}><FaShoppingBag /></Link>
                        <Link to={"/user"}><FaUser /></Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar