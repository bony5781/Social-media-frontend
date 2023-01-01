import { Link } from 'react-router-dom';
import './online.css'

function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <Link to={"/profile/" + user.username} style={{ textDecoration: "none" }}>
                <img src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png"} alt="" className='rightbarProfileImg' />
                </Link>
            </div>
            <span className='rightbarOnline' ></span>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}

export default Online