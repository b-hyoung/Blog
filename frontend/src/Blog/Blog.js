import React, { useEffect, useState } from 'react';
import './Blog.css';
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '../Api/axiosInstance';
import { POST_API } from '../Api/PostApi';
import { ROUTES } from '../Component/PathLink';
import useTokenStore from '../store/tokenStore';

function Blog() {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get('type') || 'feedback';

  const [activeTab, setActiveTab] = useState(type);
  const { username } = useTokenStore();
  const [PostsList, setPostsList] = useState([]);
  const [hoveredContent, setHoveredContent] = useState(null); // stores index instead of content

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getPostList()
  }, [activeTab])

  const getHSLColorFromNickname = (nickname) => {
    const str = nickname.toString();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 60%, 70%)`;
  };

  const getPostList = async () => {
    try {
      const res = await api.get(POST_API.GET_POSTS_TYPE(activeTab), {
      })
      setPostsList(res.data.reverse());
    } catch (e) {
      console.log(e)
    }
  }

  // Calculate the start and end indexes based on currentPage and itemsPerPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the visible posts for the current page
  const visiblePosts = PostsList.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(PostsList.length / itemsPerPage);

  const handleChangePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleClickPost = () => {
    navigate(ROUTES.BLOG_POST)
  }
  const handleGetPost = (postId) => {
    navigate(`${ROUTES.BLOG_GET}?id=${postId}`);
  }
  const handleChangeTab = (tabType) => {
    if (tabType === 'my') {
      const userNameString =
        username && typeof username === 'object' && username.nickname
          ? username.nickname
          : username || "anonymous";

      setSearchParams({ type: 'my', nickname: userNameString });
    } else {
      setSearchParams({ type: tabType });
    }
    setActiveTab(tabType);
    setCurrentPage(1);
  };

  return (
    <div className="blog__container" style={{ minHeight: '100vh' }}>
      <h1 className="blog__title" onClick={() => navigate("/")}>BLOG</h1>

      {/* 탭 메뉴 */}
      <div className="blog__tabs" style={{ display: 'flex' }}>
        <span className={`blog__tab ${activeTab === 'qna' && 'active'}`} onClick={() => handleChangeTab('qna')}>Q & A</span>
        <span className={`blog__tab ${activeTab === 'feedback' && 'active'}`} onClick={() => handleChangeTab('feedback')}>피드백</span>
        <span className={`blog__tab ${activeTab === 'cheer' && 'active'}`} onClick={() => handleChangeTab('cheer')}>칭찬 & 격려</span>

        <span
          className={`blog__tab ${activeTab === 'my' && 'active'}`}
          style={{ marginLeft: 'auto' }}
          onClick={() => handleChangeTab('my')}
        >
          My
        </span>
      </div>

      {/* 게시글 리스트 및 고양이 이미지 레이아웃 개선 */}
      <div className="blog__content-container">
        {/* 고양이 이미지 추가 버튼 */}
        <div className="blog__cat-button" onClick={() => handleClickPost()}>
          <img src={`${process.env.PUBLIC_URL}/img/ProjectImg/image1.png`} alt="고양이 추가 버튼" className="blog__cat-img" />
        </div>

        <div className="blog__post-list">
          {visiblePosts.length > 0 ? (
            visiblePosts.map((post, index) => (
              <div
                key={index}
                className="blog__post-item"
                style={{ position: 'relative' }}
                onMouseEnter={() => setHoveredContent(index)}
                onMouseLeave={() => setHoveredContent(null)}
                onClick={() => handleGetPost(post.id)}
              >
                <span className="blog__post-text">{post.title}</span>
                <div
                  className="blog__post-badge"
                  style={{ backgroundColor: getHSLColorFromNickname(post.nickname) }}>
                  {post.nickname}
                </div>

                {hoveredContent === index && (
                  <div className="hover-preview">
                    {post.content}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="blog__no-posts" style={{fontFamily:"CookieRun-Regular" , fontSize:"20px"}} >게시글이 없습니다.</p>
          )}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="blog__pagination" style={{ marginTop: '10px' }}>
        <span
          className="blog__page-btn"
          onClick={() => handleChangePage(currentPage - 1)}
          style={{ cursor: 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
        >
          &lt;
        </span>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <span
              key={index}
              className={`blog__page-number ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => handleChangePage(pageNumber)}
              style={{ cursor: 'pointer' }}
            >
              {pageNumber}
            </span>
          );
        })}

        <span
          className="blog__page-btn"
          onClick={() => handleChangePage(currentPage + 1)}
          style={{ cursor: 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
        >
          &gt;
        </span>
      </div>
    </div>
  );
}

export default Blog;
