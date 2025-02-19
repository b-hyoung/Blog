import React, { useEffect, useState } from 'react'
import './Project.css'

function Project() {

    const urls = {
        blog : process.env.PUBLIC_URL+"img/ProjectImg/Project_Blog.png",
        go : process.env.PUBLIC_URL+"img/All/Go.png",
        goNotion : process.env.PUBLIC_URL+"img/All/Go_Notion.png"
    }
    const [arrowed , setArrowd] = useState(false)
   
  return (
    <div>
        <div>
            <h1 style={{color:"white"}}>Project</h1>
            <div className='Project_Blog' onMouseEnter={() => setArrowd(true)} onMouseLeave={() => setArrowd(false)}>
                <span className='Project_title'>
                    Blog
                    <img className='arrowImg' src={arrowed ? urls.goNotion : urls.go} />
                    </span>
                <div className='Project_Info'>
                <img className='ProjectImg' src={urls.blog} />
                <div className='Project_description'>
                    포트폴리오 웹 어플리케이션.<br />
                    블로그를 추가로 구현하여 게시판에 유저가 로그인 후 피드백을 줄 수있으며<br />
                    로그인하지 않아도 게스트로 사용 가능하다.,<br />
                    개발자(관리자)에게만 보여주는 기능으로 개발자에게 덜 상처주며 피드백 할 수 있는 장점이 있다.<br />
                </div>
                </div>
                <div className='Project_SkillList'>
                    <span>React</span>
                    <span>Css</span>
                    <span>Python3</span>
                    <span>My SQL</span>
                    <span>AWS</span>
                    <span>IAM</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Project
