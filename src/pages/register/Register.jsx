import { axiosInstance } from '../../config';
import { useRef, useState } from 'react';
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

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleClick = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (passwordAgain.current.value !== password.current.value) {
            setError("Passwords do not match");
            return;
        }

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

            setLoading(true);

            await axiosInstance.post("/auth/register", user);

            setMessage("Account created successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {

            if (err.response?.data?.code === 11000) {
                setError("Username already exists");
            } else {
                setError("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='register'>

            <div className="registerWrapper">

                <div className="registerLeft">

                    <h3 className="registerLogo">
                        AbhiSocial
                    </h3>

                    <span className="registerDesc">
                        Connect with your friends and the world around you on Abhisocial.
                    </span>

                </div>

                <div className="registerRight">

                    <form className="registerBox" onSubmit={handleClick}>

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
                            type="text"
                            required
                            ref={username}
                            className='registerInput'
                            placeholder='Username'
                            disabled={loading}
                        />

                        <input
                            type="email"
                            required
                            ref={email}
                            className='registerInput'
                            placeholder='Email'
                            disabled={loading}
                        />

                        <input
                            type="text"
                            required
                            ref={city}
                            className='registerInput'
                            placeholder='City'
                            disabled={loading}
                        />

                        <input
                            type="text"
                            required
                            ref={from}
                            className='registerInput'
                            placeholder='Gender'
                            disabled={loading}
                        />

                        <input
                            type="text"
                            ref={profilePicture}
                            className='registerInput'
                            placeholder='Profile Picture URL'
                            disabled={loading}
                        />

                        <input
                            type="text"
                            ref={coverPicture}
                            className='registerInput'
                            placeholder='Cover Picture URL'
                            disabled={loading}
                        />

                        <input
                            type="text"
                            required
                            ref={relationship}
                            className='registerInput'
                            placeholder='Relationship'
                            disabled={loading}
                        />

                        <input
                            type="password"
                            minLength="6"
                            required
                            ref={password}
                            className='registerInput'
                            placeholder='Password'
                            disabled={loading}
                        />

                        <input
                            type="password"
                            required
                            ref={passwordAgain}
                            className='registerInput'
                            placeholder='Confirm Password'
                            disabled={loading}
                        />

                        <button
                            className='registerButton'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>

                        <button
                            type="button"
                            className="registerRegisterButton"
                            onClick={() => navigate("/login")}
                            disabled={loading}
                        >
                            Log into account
                        </button>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Register
