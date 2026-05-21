import { useRef, useState, useContext } from 'react';
import './login.css'
import { loginCall } from "../../apiCalls"
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {

    const email = useRef();
    const password = useRef();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const { isFetching, dispatch } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleClick = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        if (!email.current.value || !password.current.value) {
            setError("Please fill all fields");
            return;
        }

        try {

            await loginCall(
                {
                    email: email.current.value,
                    password: password.current.value
                },
                dispatch
            );

            setMessage("Login successful!");

        } catch (err) {

            setError("Invalid email or password");

        }
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

                        {message && (
                            <div className="success-msg">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="error-msg">
                                {error}
                            </div>
                        )}

                        <input
                            type="email"
                            className='loginInput'
                            placeholder='Email'
                            ref={email}
                            required
                        />

                        <input
                            type="password"
                            className='loginInput'
                            placeholder='Password'
                            ref={password}
                            minLength={6}
                            required
                        />

                        <button
                            className='loginButton'
                            type='submit'
                            disabled={isFetching}
                        >
                            {isFetching ? "Logging in..." : "Log in"}
                        </button>

                        <span className="loginForgot">
                            Forgot Password?
                        </span>

                        <button
                            type="button"
                            className="loginRegisterButton"
                            onClick={() => navigate("/register")}
                        >
                            Create a new account
                        </button>

                    </form>

                </div>

            </div>
        </div>
    )
}

export default Login
