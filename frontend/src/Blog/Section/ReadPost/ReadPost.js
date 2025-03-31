import React, { useEffect, useState } from 'react';
import './ReadPost.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ROUTES } from '../../../Component/PathLink';
import { POST_API } from '../../../Api/PostApi';
import api from '../../../Api/axiosInstance';

function ReadPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");

    const [post, setPost] = useState(null);
    const typeMapping = {
        qna: "Q&A",
        feedback: "피드백",
        cheer: "칭찬 & 격려"
    };

    useEffect(() => {
        handleGetPost();
    }, [postId]);

    const handleGetPost = async () => {
        console.log(postId);
        try {
            if (postId) {
                const res = await api.get(POST_API.GET_POSTS_ID_TYPE(postId));
                setPost(res.data);
                console.log(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleClickExit = () => {
        navigate(ROUTES.BLOG);
    };

    return (
        <div className="read-post-page">
            <div className="read-post-wrapper">
                <div className="read-post-top">
                    <h1 className="read-post-title">{post?.title}</h1>
                    <div className="read-post-header">
                        <div className="read-post-tag">{post?.nickname}</div>

                        <div className="read-post-meta">
                            {post?.type && (
                                <button className="read-post-feedback-button">
                                    {typeMapping[post.type] || post.type}
                                </button>
                            )}
                            <p className="read-post-date">
                                Date {post?.created_at?.slice(0, 10)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="read-post-content">{post?.content}</div>
                <button style={{width:"70px",height:"70px" , marginRight:"40px"}}>수정</button>
                <button style={{width:"70px",height:"70px"}}>수정</button>
                <img src={`${process.env.PUBLIC_URL}/img/icon/ExitIcon.png`} className='read-post-closeBtn' onClick={() => handleClickExit()} />
            </div>
        </div>
    );
}

export default ReadPost;