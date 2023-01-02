import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import { axiosInstance } from '../../config';

function Share() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    let img = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: img,
        }
        try {
            await axiosInstance.post("./posts", newPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    const handleClick = () => {
        img = window.prompt("Enter photo link");
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? user.profilePicture : PF + "person/noAvatar.png"} alt="" className='shareProfileImg' />
                    <input placeholder={'Whats on your mind ' + user.username + "?"} className='shareInput' ref={desc} />
                </div>
                <hr className='shareHr' />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label className="shareOption" htmlFor='file'>
                            <PermMediaIcon htmlColor='tomato' className='shareIcon' />
                            <span className="shareOptionText" ref={img} onClick={handleClick}>Photo or Video</span>
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnIcon htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share