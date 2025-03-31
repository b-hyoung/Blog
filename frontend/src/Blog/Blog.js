import React, { useEffect, useState } from 'react';
import './Blog.css';
import {useNavigate, useSearchParams} from 'react-router-dom'
import api from '../Api/axiosInstance';
import { POST_API } from '../Api/PostApi';
import { ROUTES } from '../Component/PathLink';

function Blog() {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'feedback';

  const [activeTab, setActiveTab] = useState(type);
  const [PostsList, setPostsList] = useState([]);

  useEffect(() => {
    getPostList()
  },[activeTab])
  

  const getPostList = async () => {
    try{
      const res = await api.get(POST_API.GET_POSTS_TYPE(activeTab),{
      })
      setPostsList(res.data)
    }catch(e){
      console.log(e)
    }
  }

  const handleClickPost = () => {
    navigate(ROUTES.BLOG_POST)
  }
  const handleGetPost = () => {
    navigate('/blog/read_post')
  }
  const handleChangeTab = (tabType) => {
    setActiveTab(tabType);
    setSearchParams({ type: tabType });
  }

  return (
    <div className="blog__container" style={{ minHeight: '100vh' }}>
      <h1 className="blog__title">Blog</h1>
      
      {/* 탭 메뉴 */}
      <div className="blog__tabs">
        <span className={`blog__tab ${activeTab === 'qna' && 'active'}`} onClick={() => handleChangeTab('qna')}>Q & A</span>
        <span className={`blog__tab ${activeTab === 'feedback' && 'active'}`} onClick={() => handleChangeTab('feedback')}>피드백</span>
        <span className={`blog__tab ${activeTab === 'cheer' && 'active'}`} onClick={() => handleChangeTab('cheer')}>칭찬 & 격려</span>
      </div>

      {/* 게시글 리스트 및 고양이 이미지 레이아웃 개선 */}
      <div className="blog__content-container">
        {/* 고양이 이미지 추가 버튼 */}
        <div className="blog__cat-button" onClick={() => handleClickPost()}>
          <img src={`${process.env.PUBLIC_URL}/img/Projectimg/image1.png`} alt="고양이 추가 버튼" className="blog__cat-img" style={{ height: '180px', width:"180px", boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}/>
        </div>

        <div className="blog__post-list">
          {PostsList.length > 0 ? (
            PostsList.map((post, index) => (
              <div key={index} className="blog__post-item" onClick={(e) => handleGetPost(e)} >
                <span className="blog__post-text">{post.title}</span>
                <div 
                  className="blog__post-badge"
                  style={{ backgroundColor: 'yellow' }}>
                  {post.nickname}
                </div>
              </div>
            ))
          ) : (
            <p className="blog__no-posts">게시글이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="blog__pagination" style={{ marginTop: '10px' }}>
        <span className="blog__page-btn">&lt;</span>
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={index} className={`blog__page-number ${index === 0 ? 'active' : ''}`}>
            {index + 1}
          </span>
        ))}
        <span>...</span>
        <span className="blog__page-number">5</span>
        <span className="blog__page-btn">&gt;</span>
      </div>
    </div>
  );
}

export default Blog;
