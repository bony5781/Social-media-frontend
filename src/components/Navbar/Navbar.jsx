import './navbar.css'

import SearchIcon from '@mui/icons-material/Search';

import { useContext, useState } from 'react';

import { AuthContext } from '../../Context/AuthContext';

import { Link, useNavigate } from 'react-router-dom';

import { logoutCall } from '../../apiCalls'

function Navbar() {

  const { user, dispatch } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {

    try {

      setLoading(true);

      await logoutCall(dispatch);

      navigate("/");

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="navbarContainer">

      <div className="navbarLeft">

        <span
          className="logo"
          onClick={() => navigate("/")}
        >
          Abhisocial
        </span>

      </div>

      <div className="navbarCenter">

        <div className="searchbar">

          <SearchIcon className='searchIcon' />

          <input
            placeholder='Search friends, posts or videos'
            className="searchInput"
          />

        </div>

      </div>

      <div className="navbarRight">

        <div className="navbarLinks">

          <span
            className="navbarLink"
            onClick={() => navigate("/")}
          >
            Homepage
          </span>

          <span
            className="navbarLink"
            onClick={() => navigate("/profile/" + user.username)}
          >
            Profile
          </span>

        </div>

        <Link to={`/profile/${user.username}`}>

          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt="profile"
            className="navbarImg"
          />

        </Link>

        <button
          className="logoutButton"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "..." : "Sign out"}
        </button>

      </div>

    </div>
  )
}

export default Navbar
