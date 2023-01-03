import './rightbar.css'
import Online from '../online/Online';
import { useContext, useEffect } from 'react';
import { axiosInstance } from '../../config';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Rightbar({ user }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    setFollowed(currentUser.following.includes(user ? user._id : null));
  })

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axiosInstance.get("/users/friends/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user, currentUser._id])

  useEffect(() => {
    const getAllUsers = async () => {
      let flag = 0;
      try {
        const all = await axiosInstance.get("/users/allUsers/" + currentUser.username);
        all.data.map((info) => {
          friends.map((v) => {
            if (v.username === info.username) {
              flag = 1;
              let idx = allUsers.indexOf(info);
              setAllUsers(allUsers.splice(idx,1));
            }
          })
          if (flag === 0) {
            setAllUsers(all.data);
            return all;
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, [currentUser.username, friends ])

  const handleClick = async () => {
    console.log(followed);
    try {
      if (followed) {
        await axiosInstance.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        console.log("2");
        await axiosInstance.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className='birthdayImg' />
          <div className="birthdayText"> <b>Pola Foster</b> and 3 other friends have a birthday today</div>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Suggested Friends</h4>
        <ul className="rightbarFriendList">
          {
            allUsers.map((u) => (
              <Online key={u._id} user={u} />
            ))
          }
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h4 className='rightbarTitle'>User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === '' ? "Not Given" : user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
              <div className="rightbarFollowing">
                <img src={friend.profilePicture ? friend.profilePicture : PF + "person/noAvatar.png"} alt="" className='rightbarFollowingImg' />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className='rightbar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar