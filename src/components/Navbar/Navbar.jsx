import './navbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { logoutCall } from '../../apiCalls'

function Navbar() {

  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  console.log(user.profilePicture);

  const handleClick = () => {
    logoutCall(
      dispatch
    );
  }

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <span className="logo">Abhisocial</span>
      </div>
      <div className="navbarCenter">
        <div className="searchbar">
          <SearchIcon className='searchIcon' />
          <input placeholder='Search for friends,posts or video' className="searchInput" />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
          <span className="navbarLink" onClick={() => navigate("/")}>Homepage</span>
          <span className="navbarLink" onClick={() => navigate("/profile/" + user.username)}>Profile</span>
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <PersonIcon />
            <span className="navbarIconBadge">1  </span>
          </div>
          <div className="navbarIconItem">
            <ChatIcon />
            <span className="navbarIconBadge">1  </span>
          </div>
          <div className="navbarIconItem">
            <NotificationsIcon />
            <span className="navbarIconBadge">1  </span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className="navbarImg" />
        </Link>
        <Link to={`/`} style={{textDecoration: "none"}}>
          <span className="navbarLink" onClick={handleClick}>Sign out</span>
        </Link>
      </div>
    </div>
  )
}

export default Navbar