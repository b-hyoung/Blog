import React, { useState } from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';

function Post() {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('');
  
  const [selectedOption, setSelectedOption] = useState('피드백');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  

  // 모든 드롭다운 옵션
  const allOptions = ['Q&A', '피드백', '칭찬&격려'];

  // 선택한 옵션을 제외한 옵션만 표시
  const availableOptions = allOptions.filter((option) => option !== selectedOption);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownVisible(false); // 드롭다운 닫기
  };

  const handleSubmitPost = () => {
    navigate("/blog");
  }

  return (
    <div className="container">
      {/* 상단 타이틀 */}
      <div className="header">
        <input
          type="text"
          className="title-input"
          placeholder="제목을 입력해주세요"
        />
      </div>

      {/* 드롭다운 메뉴 */}
      <div className="dropdown">
        <div style={{display:"flex",flexDirection:"row"}}
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>

          {/* 중앙 placeholder */}
          {!inputValue && (
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
