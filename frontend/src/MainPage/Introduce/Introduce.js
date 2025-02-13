import React from 'react'
import './introduce.css'

function Introduce() {
  return (
    <div className='Introduce'>
      <div className='Introduce_Title'>
        <span className='Title_Name'>박형석</span>
        <span className='Title_Job' >프론트 엔드 개발자</span>
      </div>
      <div className='Introduce_Description'>
        UI/UX에 관심이 많고<br/>에러 해결의 짜릿함을 즐기며 수동적이기 보다는<br />"왜" 에 집중하여 이유를 찾아 성장하는 개발자입니다.
      </div>
    </div>
  )
}

export default Introduce
