import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyBlog.css';

const posts = [
  { id: 1, title: '알고리즘: BFS 문제 풀이', category: '알고리즘', date: '2023.10.26', content: '여기에있는컨텐츠 내용이 어디까akslfhjaksjfhkasjfkjashfkasjhfkjasfkjashfkjashfkjashfk', tags: ['#알고리즘', '#BFS', '#자바스크립트'] },
  { id: 2, title: '2차 프로젝트 회고', category: '회고', date: '2023.10.25', content: '...', tags: ['#회고', '#프로젝트', '#React'] },
  { id: 3, title: 'React Hooks 완벽 가이드', category: '전체', date: '2023.10.24', content: '...', tags: ['#React', '#Hooks', '#TIL'] },
];

function MyBlog({  }) {
  const [selectedFilter, setSelectedFilter] = useState('전체');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (selectedFilter === '전체') {
      setFilteredPosts(posts);
    } else {
      const newPosts = posts.filter(post => post.category === selectedFilter);
      setFilteredPosts(newPosts);
    }
  }, [selectedFilter, posts]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  return (
  <div className="home-page-container">
    {/* 블로그 대문 영역 */}
    <div
      style={{
        width: '100%',
        height: '320px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px',
        borderRadius: '18px',
        boxShadow: '0 2px 16px rgba(44,62,80,0.10)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(55,111,163,0.18)'
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: '2.8rem',
            fontWeight: 'bold',
            letterSpacing: '4px',
            fontFamily: 'CookieRun-Regular, sans-serif',
            marginBottom: '18px',
            textShadow: '2px 2px 8px rgba(55,111,163,0.10)',
            color: '#ffb86b'
          }}
        >
          Who I AM
        </div>
        <div
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            lineHeight: '1.7',
            marginTop: '10px',
            color: '#376fa3' // 메인 블루로 변경
          }}
        >
          프론트엔드 개발자 박형석
        </div>
        <div
          style={{
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: '1.7',
            marginTop: '6px',
            color: '#444' // 눈에 편한 진한 회색
          }}
        >
          UI/UX에 관심이 많고,<br />
          "왜"에 집중하며 이유를 찾는 개발자입니다.
        </div>
      </div>
    </div>
    <div className="container">
      <header className="header">
        <h1>개발 기록</h1>
        <div className="filter-buttons">
          <button onClick={() => handleFilterClick('전체')} className={selectedFilter === '전체' ? 'active' : ''}>전체</button>
          <button onClick={() => handleFilterClick('알고리즘')} className={selectedFilter === '알고리즘' ? 'active' : ''}>알고리즘</button>
          <button onClick={() => handleFilterClick('회고')} className={selectedFilter === '회고' ? 'active' : ''}>회고</button>
        </div>
      </header>
      <section className="post-list">
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p className="post-date">{post.date}</p>
            <p className="post-summary">{post.content.substring(0, 100)}...</p>
            <div className="tags">
              {post.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  </div>
  );
}

export default MyBlog;