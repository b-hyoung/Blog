import React, { useEffect, useState } from 'react';
import './Blog.css';
import {useNavigate} from 'react-router-dom'
import api from '../Component/axiosInstance';
import { POST_API } from '../Api/PostApi';

function Blog() {
  const [activeTab, setActiveTab] = useState('feedback');
  const navigate = useNavigate()
  const [PostsList, setPostsList] = useState([]);

  useEffect(() => {
    getPostList()
  },[])
  
  useEffect(() => {
    console.log(PostsList)
  },[PostsList])

  const posts = [
    { text: 'Q&A 관련 질문입니다', badge: '지나가던 N년차 개발자', badgeColor: '#FFC0CB', category: 'qna' },
    { text: '텍스트가 어떤식으로 들어가 좀 예쁘게 들어갈까', badge: '지나가던 N년차 개발자', badgeColor: '#FFC0CB', category: 'feedback' },
    { text: '고양이는 고양고양해', badge: '어후러', badgeColor: '#FFD700', category: 'praise' },
    { text: '고양이가 너무 귀엽네요 개추박고갑니다', badge: '부러', badgeColor: '#90EE90', category: 'feedback' },
    { text: '콜록콜록.. 고소하겠습니다.ㅠㅠ', badge: '김밥먹다 체한고양이', badgeColor: '#87CEFA', category: 'praise' },
  ];

  // 선택한 탭에 맞는 게시글 필터링
  const filteredPosts = PostsList.filter(post => post.type === activeTab);

  const getPostList = async () => {
    
    try{
      const res = await api.get(POST_API.GET_POSTS,{
      })
      setPostsList(res.data)
      console.log(res.data)
    }catch(e){
      alert("불러오기 에러");
      console.log(e)
    }
  }

  const handleClickPost = () => {
    navigate('/blog/post')
  }

  return (
    <div className="blog__container" style={{ minHeight: '100vh' }}>
      <h1 className="blog__title">Blog</h1>
      
      {/* 탭 메뉴 */}
      <div className="blog__tabs">
        <span className={`blog__tab ${activeTab === 'qna' && 'active'}`} onClick={() => setActiveTab('qna')}>Q & A</span>
        <span className={`blog__tab ${activeTab === 'feedback' && 'active'}`} onClick={() => setActiveTab('feedback')}>피드백</span>
        <span className={`blog__tab ${activeTab === 'praise' && 'active'}`} onClick={() => setActiveTab('praise')}>칭찬 & 격려</span>
      </div>

      {/* 게시글 리스트 및 고양이 이미지 레이아웃 개선 */}
      <div className="blog__content-container">
        {/* 고양이 이미지 추가 버튼 */}
        <div className="blog__cat-button">
          <img src={`${process.env.PUBLIC_URL}/img/Projectimg/image1.png`} alt="고양이 추가 버튼" className="blog__cat-img" style={{ height: '180px', width:"180px", boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}/>
        </div>

        <div className="blog__post-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div key={index} className="blog__post-item" onClick={(e) => handleClickPost(e)} >
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
