import React, { useState } from 'react';
import './Login.css';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast } from 'react-toastify';
import { FaFacebookF, FaLinkedinIn, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/ReducerSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [emailId, setemailId] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                dispatch(addUser({
                    id: user.uid,
                    name: user.displayName,
                    Image: user.photoURL,
                    email: user.email,
                }));
                toast.success("Google Login Successful!");
                setTimeout(() => navigate("/"), 1500);
            })
            .catch(err => {
                console.error(err);
                toast.error("Google Login Failed");
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!emailId || !password || (isSignUp && !name)) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            if (isSignUp) {
                await axios.post('http://localhost:8080/api/customer-api/register', {
                    name,
                    emailId,
                    password,
                });
                toast.success('Signup successful! Please log in.');
                setIsSignUp(false);
            } else {
                const response = await axios.post('http://localhost:8080/api/customer-api/login', {
                    emailId,
                    password,
                });
                const token = response.data;
                localStorage.setItem('userToken', token);
                dispatch(addUser({ token }));
                toast.success('Login successful!');
                setTimeout(() => navigate('/'), 1500);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="login-wrapper">
            <div className={`login-container ${isSignUp ? 'login-right-panel-active' : ''}`}>
                <div className="login-form-container login-sign-up-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <div className="login-social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social" onClick={handleGoogleLogin}><FaGoogle /></a>
                            <a href="#" className="social"><FaLinkedinIn /></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                        <input type="email" placeholder="Email" value={emailId} onChange={e => setemailId(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

                <div className="login-form-container login-sign-in-container">
                    <form onSubmit={handleSubmit}>
                        <h1>Log in</h1>
                        <div className="login-social-container">
                            <a href="#" className="social"><FaFacebookF /></a>
                            <a href="#" className="social" onClick={handleGoogleLogin}><FaGoogle /></a>
                            <a href="#" className="social"><FaLinkedinIn /></a>
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" value={emailId} onChange={e => setemailId(e.target.value)} />
                        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        <a href="#">Forgot your password?</a>
                        <button type="submit">Log In</button>
                    </form>
                </div>

                <div className="login-overlay-container">
                    <div className="login-overlay">
                        <div className="login-overlay-panel login-overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={() => setIsSignUp(false)}>Log In</button>
                        </div>
                        <div className="login-overlay-panel login-overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" onClick={() => setIsSignUp(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Toggle Buttons */}
            <div className="login-mobile-toggle">
                <button className={!isSignUp ? 'active' : ''} onClick={() => setIsSignUp(false)}>Login</button>
                <button className={isSignUp ? 'active' : ''} onClick={() => setIsSignUp(true)}>Sign Up</button>
            </div>
        </div>
    );
}

export default Login;
