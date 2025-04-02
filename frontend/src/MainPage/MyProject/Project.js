import React, { useEffect, useState } from 'react'
import './Project.css'
import useSelectSkillStore from '../../Header/Section/useSelectSkillStore'
import { useNavigate } from 'react-router-dom'
import useTokenStore from '../../store/tokenStore'
import { ROUTES } from '../../Component/PathLink'

function Project() {
    const navigate = useNavigate()

    const { skills } = useSelectSkillStore()
    const [selectSkill, setSelectSkill] = useState([])
    const [skillAll, setSkillALl] = useState([])
    const token = useTokenStore((state) => state.accessToken);

    const projects = [
        {
            title: 'Blog',
            developer: '개인 프로젝트 (Me)',
            description: (
                <>
                    포트폴리오 웹 애플리케이션.<br />
                    블로그를 추가로 구현하여 게시판에 유저가 로그인 후 피드백을 줄 수있으며<br />
                    로그인하지 않아도 게스트로 사용 가능하다.<br />
                    코드 유지보수에 신경을 쓰며 <br />
                    그동안 했던것 + 새로운 기술을 이용해 혼자만들어본 포트폴리오 및 블로그 웹앱입니다.<br/>
                    체크리스트는 제가 시작하며 미리만든 미래 포트폴리오면서<br /> 
                    아직 못해본것들은 배포하며 경험할 것입니다. 
                </>
            ),
            urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Project_Blog.png",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            }, skillList: ['React', 'Zustand', 'Python3', 'DRF (Django Rest Framework)', 'CSS' , 'DJango','S3 - React', 'EC2 - Django/DRF 서비스 배포', ,  'My SQL','React-Query']

        },
        {
            title: 'kkeua',
            developer: '프론트엔드 2명 (Me) | 백엔드 1명',
            description: (
                <>
                    실시간 웹소켓을 사용하여 구현하는 끝말잇기 아이템전!<br />
                    디자인 툴(Figma)을 활용한 UI/UX 설계부터 화면정의서 및 기능정의서를 사전 기획<br />
                    또한, Docker와 Git Flow를 사용해 효율적으로 관리하고 진행하고있습니다.<br />
                    TailWindCss을 이용한 반응형 웹을 제작하며<br />
                    Guest 기능을 통해 우리 게임에 쉽게 접해볼 수 있게 사용성을 증가시켰습니다.
                </>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/kkuea.png",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'TailWindCSS', 'Docker' , 'Zustand']
        },

        {
            title: 'Eriwa',
            developer: '프론트엔드 (Me) 1명 | 백엔드 1명',
            description: (
                <>
                    이터널리턴 전적검색사이트<br />
                    개발초기에 제작했던 사이트로 완성하지 못했지만 Css성장에 많은 기여를했다.<br />
                    ReactQuery를 처음 이용하여 유저정보를 받고 한페이지의 <br />템플릿을 세분화하는방법을 찾는 도움을 줬다.<br />
                    백엔드와 협업하여 API를 받아본 첫번째 사이트<br />
                </>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Eriwa.png",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'CSS', 'React-Query']
        },
        {
            title: 'Clover',
            developer: '프론트엔드 (Me) 1명 | 백엔드 1명',
            description: (
                <>
                    동아리 홍보 및 관리 사이트<br />
                    Python 기반 RESTful API를 활용하여<br />
                    JWT를 통한 로그인 상태 관리 및 유저 권한 제어 서비스를 구현하였으며,<br />
                    Eriwa에서 사용해본 React Query를 적용해 동아리 검색 기능을 구현하고,<br />
                    실시간으로 정보를 가져오는 경험과 다양한 레이아웃 구현을 통해<br />
                    시스템 흐름도 및 화면 정의서를 제작하며 기획의 핵심 요소를 재인식한 좋은 프로젝트입니다.<br />
                </>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Clover.gif",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'CSS', 'React-Query']
        },
        {
            title: 'ReSee',
            developer: '프론트엔드 1명 | 백엔드 1명',
            description: (
                <>
                    메모 후 복습을 위해 만든 사이트<br />
                    Clover에서 JWT를 이용한 회원관리 및 유저권한관리를 했다면<br />
                    ReSee는 회원가입 입력값에 대한 실시간 유효성 검증 및 예외처리 로직을 구현하여<br />
                    중복 계정, 필수 입력 누락, 형식 오류 등의 문제를 사전에 감지하고<br />
                    사용자에게 직관적인 피드백을 제공함으로써 사용자경험을 향상시켰습니다.<br />
                    로그인상태나 APIURL 을 전역변수화 시켜 코드 유지보수에 관심을 가지게된 프로젝트였습니다.
                </>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Resee.gif",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'CSS', 'React-Query']
        },
       
    ]

    const skillList = [...new Set(projects.flatMap(project => project.skillList))];

    const [arrowed, setArrowd] = useState(false)

    useEffect(() => {
        const newSelectSkill = skills.filter(item => item.checked).map(item => item.name);
        setSelectSkill(newSelectSkill);

        const temp = skillList.filter(item => newSelectSkill.includes(item));
        const diselected = skillList.filter(item => !newSelectSkill.includes(item));
        const tempall = [...new Set([...temp, ...diselected])];
        setSkillALl(tempall);
    }, [skills]);

    const sortedProjects = [...projects].sort((a, b) => {
        const aCount = a.skillList.filter(skill => selectSkill.includes(skill)).length;
        const bCount = b.skillList.filter(skill => selectSkill.includes(skill)).length;
        return bCount - aCount;
    });

    const onClickNavigate = (title) => {
        if(title==="Blog"){
            if(token){
                navigate('blog');
            }else{
                alert("로그인 후 진행해주세요");
                navigate(ROUTES.LOGIN)
            }
        }else if(title==="kkeua"){
            window.open("https://github.com/djgnfj-svg/kkua")
        }else if(title === "ReSee"){
            window.open("https://github.com/b-hyoung/Resee_project")
        }else if(title === "Clover"){
            window.open("https://github.com/b-hyoung/Clover")
        }else if(title === "Eriwa"){
            window.open("https://github.com/b-hyoung/NewRiwa")
        }
    }

    return (
        <div>
            <div>
                {sortedProjects.map((project, index) => (
                    <div className='Project_Blog' onClick={() => onClickNavigate(project.title)} onMouseEnter={() => setArrowd(true)} onMouseLeave={() => setArrowd(false)}>
                        <span className='Project_title'>
                            {/* 프로젝트 이름 */}
                            {project.title}
                            <img className='arrowImg' src={arrowed ? project.urls?.goNotion : project?.urls?.go} />
                        </span>
                        <div className='Project_Info'>
                            <img className='ProjectImg' src={project.urls?.blog} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {project.developer && (
                                    <div className="Project_Developer">
                                        {project.developer}
                                    </div>
                                )}
                                <div className='Project_description'>
                                    {/* 프로젝트 설명 */}
                                    {project.description}
                                </div>
                            </div>
                        </div>
                        <div className='Project_SkillList'>
                            {[...project.skillList.filter(skill => selectSkill.includes(skill)),
                            ...project.skillList.filter(skill => !selectSkill.includes(skill))]
                                .map((item, index) => (
                                    <span key={index} className={selectSkill.includes(item) ? 'haveSkill' : 'DNhaveSkill'}>
                                        {item}
                                    </span>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Project
