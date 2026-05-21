import './share.css'

import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

import {
    useContext,
    useRef,
    useState
} from 'react';

import { AuthContext } from "../../Context/AuthContext";

import { axiosInstance } from '../../config';

function Share() {

    const { user } = useContext(AuthContext);

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const desc = useRef();

    const [file, setFile] = useState(null);

    const [img, setImg] = useState("");

    const [loading, setLoading] = useState(false);

    const [uploading, setUploading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const uploadImage = async (selectedFile) => {

        try {

            setUploading(true);

            const data = new FormData();

            data.append("file", selectedFile);

            data.append("upload_preset", "abhisocial");

            data.append("cloud_name", "dn3sfuiai");

            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dn3sfuiai/image/upload",
                {
                    method: "POST",
                    body: data
                }
            );

            const uploadedImage = await res.json();

            setImg(uploadedImage.secure_url);

        } catch (err) {

            console.log(err);

            setError("Failed to upload image");

        } finally {

            setUploading(false);
        }
    }

    const handleFileChange = async (e) => {

        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        setFile(selectedFile);

        await uploadImage(selectedFile);
    }

    const submitHandler = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (!desc.current.value && !img) {

            setError("Post cannot be empty");

            return;
        }

        const newPost = {

            userId: user._id,

            desc: desc.current.value,

            img: img,
        }

        try {

            setLoading(true);

            await axiosInstance.post("/posts", newPost);

            setMessage("Post shared successfully!");

            setTimeout(() => {

                window.location.reload();

            }, 1000);

        } catch (err) {

            console.log(err);

            setError("Failed to share post");

        } finally {

            setLoading(false);
        }
    }

    return (

        <div className='share'>

            <div className="shareWrapper">

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

                <div className="shareTop">

                    <img
                        src={
                            user.profilePicture
                                ? user.profilePicture
                                : PF + "person/noAvatar.png"
                        }
                        alt=""
                        className='shareProfileImg'
                    />

                    <input
                        placeholder={'Whats on your mind ' + user.username + "?"}
                        className='shareInput'
                        ref={desc}
                        disabled={loading}
                    />

                </div>

                {img && (

                    <div className="shareImgContainer">

                        <img
                            src={img}
                            alt=""
                            className="sharePreviewImg"
                        />

                    </div>
                )}

                <hr className='shareHr' />

                <form
                    className="shareBottom"
                    onSubmit={submitHandler}
                >

                    <div className="shareOptions">

                        <label
                            htmlFor="file"
                            className="shareOption"
                        >

                            <PermMediaIcon
                                htmlColor='tomato'
                                className='shareIcon'
                            />

                            <span className="shareOptionText">

                                {uploading
                                    ? "Uploading..."
                                    : "Photo or Video"
                                }

                            </span>

                            <input
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />

                        </label>

                        <div className="shareOption">

                            <LabelIcon
                                htmlColor='blue'
                                className='shareIcon'
                            />

                            <span className="shareOptionText">
                                Tag
                            </span>

                        </div>

                        <div className="shareOption">

                            <LocationOnIcon
                                htmlColor='green'
                                className='shareIcon'
                            />

                            <span className="shareOptionText">
                                Location
                            </span>

                        </div>

                        <div className="shareOption">

                            <EmojiEmotionsIcon
                                htmlColor='goldenrod'
                                className='shareIcon'
                            />

                            <span className="shareOptionText">
                                Feelings
                            </span>

                        </div>

                    </div>

                    <button
                        className="shareButton"
                        type='submit'
                        disabled={loading || uploading}
                    >

                        {loading
                            ? "Sharing..."
                            : "Share"
                        }

                    </button>

                </form>

            </div>

        </div>
    )
}

export default Share
