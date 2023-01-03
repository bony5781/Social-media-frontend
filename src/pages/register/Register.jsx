import { axiosInstance } from '../../config';
import { useRef } from 'react';
import './register.css';
import { useNavigate } from "react-router";

function Register() {

    const username = useRef();
    const email = useRef();
    const city = useRef();
    const from = useRef();
    const relationship = useRef();
    const profilePicture = useRef();
    const coverPicture = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("Passwords dont match");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                city: city.current.value,
                relationship: relationship.current.value,
                from: from.current.value,
                profilePicture: profilePicture.current.value,
                coverPicture: coverPicture.current.value,
            }
            try {
                await axiosInstance.post("/auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">AbhiSocial</h3>
                    <span className="registerDesc">
                        Connect with your friends and the world around you on Abhisocial.
                    </span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input type="text" required ref={username} className='registerInput' placeholder='Username' />
                        <input type="email" required ref={email} className='registerInput' placeholder='Email' />
                        <input type="text" required ref={city} className='registerInput' placeholder='City' />
                        <input type="text" required ref={from} className='registerInput' placeholder='Gender' />
                        <input type="text" ref={profilePicture} className='registerInput' placeholder='Link for profile picture(Valid image format)' />
                        <input type="text" ref={coverPicture} className='registerInput' placeholder='Link for cover picture(Valid image format)'  />
                        <input type="text" required ref={relationship} className='registerInput' placeholder='Relationship' />
                        <input type="password" minLength="6" required ref={password} className='registerInput' placeholder='Password' />
                        <input type="password" required ref={passwordAgain} className='registerInput' placeholder='Password Again' />
                        <button className='registerButton' type='submit' >Sign Up</button>
                        <button className="registerRegisterButton" onClick={() => navigate("/login")}>
                            Log into account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register