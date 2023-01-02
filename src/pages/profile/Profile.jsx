import './profile.css'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config';

function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username; 

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axiosInstance.get(`/users/?username=${username}`);
            setUser(res.data);
        }
        fetchUsers();
    }, [username]);

    return (
        <>
            <Navbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ?  user.coverPicture : PF + "person/noCover.png"} alt="" className='profileCoverImg' />
                            <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className='profileUserImg' />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className='profileInfoDesc'>{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile