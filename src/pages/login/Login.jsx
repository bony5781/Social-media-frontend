import { useRef } from 'react';
import './login.css'
import { loginCall } from "../../apiCalls"
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }
    
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">AbhiSocial</h3>
                    <span className="loginDesc">
                        Connect with your friends and the world around you on Abhisocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input type="email" className='loginInput' placeholder='Email' ref={email} required />
                        <input type="password" className='loginInput' placeholder='Password' ref={password} minLength={6} required />
                        <button className='loginButton' type='submit' >{isFetching ? "loading" : "Log in"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={()=> navigate("/register")} >
                            Create a new account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login