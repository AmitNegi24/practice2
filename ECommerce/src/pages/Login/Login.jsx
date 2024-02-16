import React, { useState } from 'react'
import './Login.css'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../../redux/ReducerSlice';
import { useNavigate } from 'react-router-dom';
function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider()
    const handleGoogleLogin = (e) => {

        e.preventDefault();

        signInWithPopup(auth, provider).then((result) => {
            const user = result.user;
            dispatch(addUser({
                id: user.uid,
                name: user.displayName,
                Image: user.photoURL,
                email: user.email,
            }))
            setTimeout(() => {
                navigate("/")
            }, 1500)
        }).catch((err) => {
            console.log(err);
        })
    }

    // const handlesignout = () => {
    //     signOut(auth)
    //         .then(() => {
    //             dispatch(removeUser());
    //             toast.success("Log out successfully");
    //         }).catch((err) => {
    //             console.log(err)
    //         })
    // }
    return (
        <div className='Login'>
            <div className='custom-button1'>
                <h1>Login Page</h1>
                <label>
                    Username:
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <div className='login1'>
                <div className='custom-button' onClick={handleGoogleLogin}>
                    <img style={{ width: '10%' }} src="https://www.pngplay.com/wp-content/uploads/13/Google-Logo-Transparent-Background.png" alt='image' />
                    <span className='custom-text'>Sign in with Google</span>
                </div>
                
            </div>
            <div className='login1'>
                <div className='custom-button'>
                    <img style={{ width: '10%' }} src="https://pngimg.com/uploads/github/github_PNG47.png" />
                    <span className='custom-text'>Sign in with Github</span>
                </div>
                
            </div>
            <ToastContainer
                position='top-left'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </div>
    )
}

export default Login