import React, { useEffect, useState } from 'react';
import './ReadPost.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../Component/PathLink';
import { POST_API } from '../../../Api/PostApi';
import api from '../../../Api/axiosInstance';
import useTokenStore from '../../../store/tokenStore';

const getHSLColorFromNickname = (nickname) => {
  if (!nickname) return '';
  const str = nickname.toString();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 70%)`;
};

function ReadPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");

    const { username } = useTokenStore();
    
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
        try {
            if (postId) {
                const res = await api.get(POST_API.GET_POSTS_ID_TYPE(postId));
                setPost(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleEdit = () => {
        navigate(`/blog/edit/${postId}`);
    };

    const handleDelete = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
            try {
                await api.delete(POST_API.DELETE_POST(postId));
                navigate(ROUTES.BLOG);
            } catch (e) {
                console.log(e);
            }
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
                        <div className="read-post-tag" style={{ backgroundColor: getHSLColorFromNickname(post?.nickname) }}>
                          {post?.nickname}
                        </div>

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
                {username && post && username.username === post.nickname && (
                    <div className="post-actions">
                        <img className='post-changImg'
                          src={`${process.env.PUBLIC_URL}/img/icon/ReadPost/ctrl_up.png`}
                          onMouseEnter={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/icon/ReadPost/ctrl_down.png`}
                          onMouseLeave={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/icon/ReadPost/ctrl_up.png`}
                          onClick={handleEdit}
                          alt="수정 버튼"
                          style={{ width: "100px", height: "100px", marginRight: "40px", cursor: "pointer" }}
                        />
                         <img className='post-changImg'
                          src={`${process.env.PUBLIC_URL}/img/icon/ReadPost/del_up.png`}
                          onMouseEnter={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/icon/ReadPost/del_down.png`}
                          onMouseLeave={(e) => e.currentTarget.src = `${process.env.PUBLIC_URL}/img/icon/ReadPost/del_up.png`}
                          onClick={handleDelete}
                          alt="삭제 버튼"
                          style={{ width: "100px", height: "100px", marginRight: "40px", cursor: "pointer" }}
                        />
                    </div>
                )}
                <img src={`${process.env.PUBLIC_URL}/img/icon/ExitIcon.png`} className='read-post-closeBtn' onClick={() => handleClickExit()} />
            </div>
        </div>
    );
}

export default ReadPost;