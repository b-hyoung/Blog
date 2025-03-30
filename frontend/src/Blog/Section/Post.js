import React, { useState } from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';
import api from '../../Component/axiosInstance';
import { POST_API } from '../../Api/PostApi';
import useTokenStore from '../../store/tokenStore';
import { ROUTES } from '../../Component/PathLink';

function Post() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('피드백');

  const typeMap = {
    'Q&A': 'qna',
    '피드백': 'feedback',
    '칭찬&격려': 'cheer'
  };

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
  })

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  // 모든 드롭다운 옵션
  const allOptions = ['Q&A', '피드백', '칭찬&격려'];

  // 선택한 옵션을 제외한 옵션만 표시
  const availableOptions = allOptions.filter((option) => option !== selectedOption);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false); // 드롭다운 닫기
  };

  const handleSubmitPost = async () => {
    console.log("현재 토큰:", useTokenStore.getState().accessToken);
    try {
      const response = await api.post(POST_API.CREATE_POSTS, {
        title: userInput.title,
        content: userInput.description,
        type: typeMap[selectedOption]
      })
      alert("글 작성을 완료했습니다.");
      navigate(ROUTES.BLOG)
    } catch (error) {
      if (error.response) {
        // 서버가 응답한 경우 (400, 500 등)
        console.error('응답 오류:', error.response.data);
        alert(`요청에 실패했습니다: ${error.response.data.message || '에러 발생'}`);
      } else if (error.request) {
        // 요청은 되었지만 응답이 없는 경우
        console.error('서버 응답 없음:', error.request);
        alert('서버로부터 응답이 없습니다.');
      } else {
        // 기타 오류
        console.error('에러:', error.message);
        alert(`오류 발생: ${error.message}`);
      }
    }
  }

  const { title, description } = userInput

  return (
    <div className="container">
      {/* 상단 타이틀 */}
      <div className="header">
        <input
          type="text"
          className="title-input"
          placeholder="제목을 입력해주세요"
          value={title}
          name='title'
          onChange={handleChangeInput}
        />
      </div>

      {/* 드롭다운 메뉴 */}
      <div className="dropdown">
        <div style={{ display: "flex", flexDirection: "row" }}
          className="dropdown-selected"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          {selectedOption}
          <img className='blog__dropdown__img' src={`${process.env.PUBLIC_URL}/img/ProjectImg/image1.png`} />
        </div>

        {isDropdownVisible && (
          <div className="dropdown-options">
            {availableOptions.map((option) => (
              <div key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 본문 (textarea) */}
      <div className="content">
        <div className="textarea-container">
          <textarea
            className="textarea"
            value={description}
            name='description'
            onChange={handleChangeInput}
          ></textarea>

          {/* 중앙 placeholder */}
          {!description && (
            <div
              className="textarea-placeholder"
              aria-label="Placeholder text for textarea">
              "지금"의 당신이 저라면 어떤말을 해주시겠습니까?
            </div>
          )}
        </div>
      </div>

      {/* 하단 버튼 레이아웃 */}
      <div className="footer">
        <button className="back-btn" onClick={() => navigate("/blog")}>돌아가기</button>
        <button className="submit-btn" onClick={() => handleSubmitPost()} >전달하기</button>
      </div>
    </div>
  );
}

export default Post;
