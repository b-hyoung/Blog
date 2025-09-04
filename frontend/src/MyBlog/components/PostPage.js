import React from 'react';
import { useParams, Link } from 'react-router-dom';
const posts = [
  { id: 1, title: '알고리즘: BFS 문제 풀이', category: '알고리즘', date: '2023.10.26', content: '여기에있는컨텐츠 내용이 어디까akslfhjaksjfhkasjfkjashfkasjhfkjasfkjashfkjashfkjashfkjashfk', tags: ['#알고리즘', '#BFS', '#자바스크립트'] },
  { id: 2, title: '2차 프로젝트 회고', category: '회고', date: '2023.10.25', content: '...', tags: ['#회고', '#프로젝트', '#React'] },
  { id: 3, title: 'React Hooks 완벽 가이드', category: '전체', date: '2023.10.24', content: '...', tags: ['#React', '#Hooks', '#TIL'] },
];
function PostPage() {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      <div className="post-detail">
        <Link to="/" className="back-link">← 목록으로</Link>
        <h1 className="post-title">{post.title}</h1>
        <p className="post-meta">
          <span className="post-date">{post.date}</span> | 
          <span className="post-category"> {post.category}</span>
        </p>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <div className="tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;