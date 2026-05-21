import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState, useContext } from 'react';
import { axiosInstance } from '../../config';
import { format } from "timeago.js"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';

function Post({ post }) {

    const [like, setLike] = useState(post.like.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.like.includes(currentUser._id));
    }, [currentUser._id, post.like]);

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const res = await axiosInstance.get(`/users/?userId=${post.userId}`);

                setUser(res.data);

            } catch (err) {
                console.log(err);
            }
        }

        fetchUsers();

    }, [post.userId]);

    const likeHandler = async () => {

        try {

            await axiosInstance.put(
                "/posts/" + post._id + "/like",
                { userId: currentUser._id }
            );

            setLike(isLiked ? like - 1 : like + 1);

            setIsLiked(!isLiked);

        } catch (err) {
            console.log(err);
        }
    }

    return (

        <div className="post">

            <div className="postWrapper">

                <div className="postTop">

                    <div className="postTopLeft">

                        <Link to={`/profile/${user.username}`}>

                            <img
                                className="postProfileImg"
                                src={
                                    user.profilePicture
                                        ? user.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />

                        </Link>

                        <div className="postUserInfo">

                            <span className="postUsername">
                                {user.username}
                            </span>

                            <span className="postDate">
                                {format(post.createdAt)}
                            </span>

                        </div>

                    </div>

                    <div className="postTopRight">
                        <MoreVertIcon className="postMenuIcon" />
                    </div>

                </div>

                <div className="postCenter">

                    {post?.desc && (
                        <span className="postText">
                            {post.desc}
                        </span>
                    )}

                    {post.img && (
                        <img
                            className="postImg"
                            src={post.img}
                            alt=""
                        />
                    )}

                </div>

                <div className="postBottom">

                    <div className="postBottomLeft">

                        <img
                            className={`likeIcon ${isLiked ? "liked" : ""}`}
                            src={`${PF}like.png`}
                            onClick={likeHandler}
                            alt=""
                        />

                        <img
                            className={`likeIcon ${isLiked ? "liked" : ""}`}
                            src={`${PF}heart.png`}
                            onClick={likeHandler}
                            alt=""
                        />

                        <span className="postLikeCounter">
                            {like} people like this
                        </span>

                    </div>

                    <div className="postBottomRight">

                        <span className="postCommentText">
                            {post.comment} comments
                        </span>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Post
