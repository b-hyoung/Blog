import React from 'react';
import './ReadPost.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../Component/PathLink';

function ReadPost() {
    const navigate = useNavigate()
    const handleClickExit = () =>{
        navigate(ROUTES.BLOG);
    }
    return (
        <div className="read-post-page">
            <div className="read-post-wrapper">
                <div className="read-post-top">
                    <h1 className="read-post-title">타이틀입니다 타이틀</h1>
                    <div className="read-post-header">
                        <div className="read-post-tag">
                            김밥먹다 체한 고양이
                        </div>
                        <div className="read-post-meta">
                            <button className="read-post-feedback-button">
                                피드백
                            </button>
                            <p className="read-post-date">
                                Date 2025.04.02
                            </p>
                        </div>
                    </div>
                </div>

                <div className="read-post-content">
                    글을 써보자<br />
                    글을 써보자 글을 써보자 글을 써보자 글을 써보자 글을 써보자<br />
                    글을 써보자 글을 써보자 글을 써보자<br />
                    글을 써보자 글을 써보자 글을 써보자 글을 써보자<br />
                    글을 써보자 글을 써보자<br />
                    글을 써보자 글을 써보자 글을 써보자<br />
                    글을 써보자 글을 써보자 글을 써보자 글을 써보자<br />
                    글을 써보자 글을 써보자<br />
                    글을 써보자<br />
                    글을 써보자<br />
                    글을 써보자 글을 써보자 글을 써보자
                </div>
            <button className='read-post-likeBtn'>
                <div className='read-post-likeImg'></div>
                <div className='read-post-likeText'>6</div>
            </button>
                <img src={`${process.env.PUBLIC_URL}/img/icon/ExitIcon.png`} className='read-post-closeBtn' onClick={() => handleClickExit()} />
            </div>
        </div>
    );
}

export default ReadPost;
