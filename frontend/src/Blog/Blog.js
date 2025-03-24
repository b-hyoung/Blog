import React, { useState } from 'react';
import './Blog.css';

function Blog() {
  const [activeTab, setActiveTab] = useState('feedback');

  const posts = [
    { text: '텍스트가 어떤식으로 들어가 좀 예쁘게 들어갈까', badge: '지나가던 N년차 개발자' },
    { text: '고양이는 고양고양해', badge: '어후러' },
    { text: '고양이가 너무 귀엽네요 개추박고갑니다', badge: '부러' },
    { text: '콜록콜록.. 고소하겠습니다.ㅠㅠ', badge: '김밥먹다 체한고양이' },
    { text: '고양이가 너무 귀엽네요 개추박고갑니다', badge: '부러' }
  ];

  return (
    <div className="container" style={{ minHeight: '100vh' }}>
      <h1 className="title">Blog</h1>
      
      {/* 탭 메뉴 */}
      <div className="tabs">
        <span 
          className={`tab ${activeTab === 'qna' && 'active'}`} 
          onClick={() => setActiveTab('qna')}
        >Q & A</span>
        <span 
          className={`tab ${activeTab === 'feedback' && 'active'}`} 
          onClick={() => setActiveTab('feedback')}
        >피드백</span>
        <span 
          className={`tab ${activeTab === 'praise' && 'active'}`} 
          onClick={() => setActiveTab('praise')}
        >칭찬 & 격려</span>
      </div>

      {/* 게시글 리스트 및 고양이 이미지 레이아웃 개선 */}
      <div className="content-container">
        {/* 고양이 이미지 추가 버튼 */}
        <div className="cat-button">
          <img
            src={`${process.env.PUBLIC_URL}/img/Projectimg/image1.png`} 
            alt="고양이 추가 버튼"
            className="cat-img"
            style={{ height: '180px', width:"180px" }}
          />
        </div>

        <div className="post-list" style={{ width: '60%' }}>
          {posts.map((post, index) => (
            <div key={index} className="post-item">
              <span className="post-text">{post.text}</span>
              <div className="post-badge">{post.badge}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination" style={{ marginTop: '10px' }}>
        <span className="page-btn">&lt;</span>
        {Array.from({ length: 3 }).map((_, index) => (
          <span key={index} className="page-number">{index + 1}</span>
        ))}
        <span>...</span>
        <span className="page-number">5</span>
        <span className="page-btn">&gt;</span>
      </div>
    </div>
  );
}

export default Blog;
