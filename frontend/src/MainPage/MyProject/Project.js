import React, { useEffect, useState } from 'react'
import './Project.css'
import useSelectSkillStore from '../../Header/Section/useSelectSkillStore'
import { useNavigate } from 'react-router-dom'

/*
    1. Skill에서 선택한 값만 따로 저장하여 불러오기
    2. 불러온 값들을 우선 검색하여 오름차순 정렬
*/

function Project() {
    const navigate = useNavigate()

    const { skills } = useSelectSkillStore()
    const [selectSkill, setSelectSkill] = useState([])
    const [skillAll, setSkillALl] = useState([])
    let title = 'Blog'
    let description = (
        <>
            포트폴리오 웹 애플리케이션.<br />
            블로그를 추가로 구현하여 게시판에 유저가 로그인 후 피드백을 줄 수있으며<br />
            로그인하지 않아도 게스트로 사용 가능하다.<br />
            개발자(관리자)에게만 보여주는 기능으로 개발자에게 덜 상처주며 피드백 할 수 있는 장점이 있다.
        </>
    )

    const urls = {
        blog: process.env.PUBLIC_URL + "img/ProjectImg/Project_Blog.png",
        go: process.env.PUBLIC_URL + "img/All/Go.png",
        goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
    }
    const [arrowed, setArrowd] = useState(false)
    const skillList = ['React', 'Css', 'Python3', 'My SQL', 'IAM', 'Zustand']
    useEffect(() => {
        // skills 배열에서 checked가 true인 항목만 필터링하여 newSelectSkill 업데이트
        const newSelectSkill = skills.filter(item => item.checked === true).map(item => item.name);
        setSelectSkill(newSelectSkill);
        const temp = skillList.filter(item => newSelectSkill.some(name => name === item))

        // skillAll을 업데이트 (checked가 true인 항목은 newSelectSkill에 포함)
        const diselected = skillList.filter(item => newSelectSkill.some(name => name !== item))
        const tempall = ([...temp, ...diselected]).filter((value, index, self) => self.indexOf(value) === index)
        setSkillALl([...tempall]);
    }, [skills]);

    return (
        <div>
            <div>
                <div className='Project_Blog' onClick={() => navigate("/blog")} onMouseEnter={() => setArrowd(true)} onMouseLeave={() => setArrowd(false)}>
                    <span className='Project_title'>
                        {/* 프로젝트 이름 */}
                        {title}
                        <img className='arrowImg' src={arrowed ? urls.goNotion : urls.go} />
                    </span>
                    <div className='Project_Info'>
                        <img className='ProjectImg' src={urls.blog} />
                        <div className='Project_description'>
                            {/* 프로젝트 설명 */}
                            {description}
                        </div>
                    </div>
                    <div className='Project_SkillList'>
                        {skillAll.length !== 0 ? (
                            skillAll.map((item, index) => (
                                <span key={index} className={`${selectSkill.some(name => name === item) ? 'haveSkill' : 'DNhaveSkill'}`}>
                                    {item}
                                </span>
                            ))
                        ) : (
                            skillList.map((item, index) => (
                                <span key={index} className={`${selectSkill.some(name => name === item) ? 'haveSkill' : 'DNhaveSkill'}`}>
                                    {item}
                                </span>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project
