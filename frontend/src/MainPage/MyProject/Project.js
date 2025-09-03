import React, { useEffect, useState , useCallback } from 'react'
import './Project.css'
import useSelectSkillStore from '../../Header/Section/useSelectSkillStore'
import { useNavigate } from 'react-router-dom'


function GifGallery({ gifs = [], onClose }) {
  const [idx, setIdx] = React.useState(0);
  const total = gifs.length;
  const [errorSet, setErrorSet] = React.useState(() => new Set()); // 실패한 src 저장

  const go = (dir) => setIdx((i) => (i + dir + total) % total);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, total]);

  React.useEffect(() => {
    if (total < 2) return;
    const preload = (url) => { const img = new Image(); img.src = url; };
    preload(gifs[(idx + 1) % total]);
    preload(gifs[(idx - 1 + total) % total]);
  }, [idx, gifs, total]);

  const cur = gifs[idx];
  const hasError = errorSet.has(cur);

  return (
    <div className="modal_overlay" aria-modal="true" role="dialog"
         onClick={(e)=> e.target===e.currentTarget && onClose?.()}>
      <div className="modal_pageView">
        <button className="modal_close" onClick={onClose} aria-label="닫기">✕</button>

        {/* 메인 뷰어: 상태로 분기 */}
        <div className="gif_viewer">
          {!hasError ? (
            <img
              key={cur}                  // 소스 바뀔 때 재로딩
              src={cur}
              alt={`미디어 ${idx+1}/${total}`}
              className="gif_main"
              onError={() =>
                setErrorSet(prev => new Set(prev).add(cur))
              }
            />
          ) : (
            <div className="gif_fallback">이미지를 불러올 수 없습니다.</div>
          )}

          {total > 1 && (
            <>
              <button className="nav_btn nav_left" onClick={()=>go(-1)} aria-label="이전">‹</button>
              <button className="nav_btn nav_right" onClick={()=>go(1)} aria-label="다음">›</button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="thumb_row" role="listbox" aria-label="GIF 목록">
            {gifs.map((src, i) => (
              <button
                key={src}
                className={`thumb_btn ${i===idx?'active':''}`}
                onClick={()=>setIdx(i)}
                aria-label={`${i+1}번 보기`}
              >
                <img src={src} loading="lazy" alt={`썸네일 ${i+1}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Project() {
    const navigate = useNavigate()

    const { skills } = useSelectSkillStore()
    const [selectSkill, setSelectSkill] = useState([])

    const [selectViewPage,setSelectViewPage] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false); // ★ 모달 상태
    const gifs = [
        "https://user-images.githubusercontent.com/87049249/187436419-06bea31c-4af4-4b0b-ab20-a29549e4bda4.gif",
        "https://user-images.githubusercontent.com/87049249/189044524-b831af5f-67d2-4e04-848d-6e048de49063.gif",
        "https://user-images.githubusercontent.com/87049249/187470749-7630cd38-1618-4310-8e3f-1f207bf31811.gif",
        ];
    const gifsResee = [
        "https://user-images.githubusercontent.com/87049249/195292923-cfd86520-7d4a-4586-8ee3-e35043b1d69a.gif",
        "https://user-images.githubusercontent.com/87049249/195292911-3ef8374c-f0aa-46dc-9d9c-5cfd53932b32.gif",
        "https://user-images.githubusercontent.com/87049249/189108741-3191da89-83b6-46fd-8052-fd81f138c193.gif",
        "https://user-images.githubusercontent.com/87049249/189250292-f2956d70-9dee-4ef7-937b-7398ed260a49.gif"
    ]
    const projects = [
        //의성에오면? 프로젝트
        {
            title: 'w2go_uiseong',
            developer: '프론트엔드 1명 | 백엔드 1명',
            date: '2025.08.04 ~ 08.29',
             description: (
                <>
                    <span>
                        - QR 랜선여행 플랫폼 기획 (의성군 관광 활성화)<br/>
                        - 군청·기업 대표와 협업하여 아이디어 검증 & 피드백 수렴<br/>
                        - AI 기반 인스타 광고 영상 제작 → 실제 팔로워 확보<br/>
                        - 기획 · 마케팅 · 피드백 반영으로 실행 가능한 서비스 모델 완성<br/>
                        군청과의 협의 프로젝트에서 기획부터 개발, 마케팅까지 전 과정을 경험했습니다.<br/>
                        특히 PPT 발표와 피드백 조율을 통해 프로젝트의 완성도를 높이기 위한 전략을 수립하고 제안했습니다.
                    </span>
                </>
            ),
            urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/w2go_uiseong.png",
            },
            skillList: ['React', 'Docker', 'Figma', 'netlify']
        },
        //Blog 프로젝트
        {
            title: 'Blog',
            developer: '개인 프로젝트 (Me)',
            date: '2025.02.12 ~ 22.04.06',
            viewSite : "현재 페이지",
            description: (
                <>
                    <span>
                        포트폴리오와 블로그를 통합한 개인 웹 애플리케이션.<br/>
                        로그인 유저는 글 작성·피드백 가능, 게스트는 열람만 가능하도록 구현.<br/>
                        유지보수를 고려한 구조 설계와 Zustand·Docker 등 새로운 기술을 적용하며<br/>
                        배포 과정에서 CI/CD와 클라우드 환경을 경험한 프로젝트입니다.
                    </span>
                </>
            ),
            urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Project_Blog.png",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            }, skillList: ['React', 'Zustand', 'Python3', 'DRF (Django Rest Framework)', 'AWS','My SQL']

        },
        //kkeua 프로젝트
        {
            title: 'kkeua',
            developer: '프론트엔드 2명 (Me) | 백엔드 1명',
            date: '2025.03.22 ~ 05.01',
            viewSite : "중단된 프로젝트입니다.",
            description: (
                <>
                    <p>
                    실시간 웹소켓을 활용한 끝말잇기 아이템전 프로젝트.<br/>
                    Figma로 UI/UX를 설계하고 TailwindCSS로 반응형 화면을 구현했으며,<br/>
                    Docker와 Git Flow를 통해 개발 환경을 관리하고 게스트 모드를 제공해 접근성을 높였습니다.<br/>
                    프로젝트는 바이브코딩으로인한 구조문제로 중단됐으며,<br/>유지보수와 컨벤션의 중요성을 배우는 계기가 되었습니다.<br/>
                    </p>
                </>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/kkuea.png",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'TailWindCSS', 'Docker', 'Zustand']
        },
        //Eriwa 프로젝트
        {
            title: 'Eriwa',
            developer: '프론트엔드 (Me) 1명 | 백엔드 1명',
            date: '2022.04.15 ~ 22.05.01',
            description: (
                <>
                    <p>
                    이터널리턴 전적 검색 사이트.<br/>
                    개발 초기 직접 기획하고 제작했으며, AI에 의존하지 않고 모든 기능을 직접 구현한 프로젝트입니다.<br/>
                    React Query를 처음 활용하여 유저 정보를 불러오고, 페이지 템플릿을 세분화하는 방법을 학습했습니다.<br/>
                    또한 CSS 스타일링 능력을 크게 성장시킨 계기였으며, 백엔드와 협업해 API를 연동해본 첫 경험이 되었습니다.<br/>
                    </p>

                </>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Eriwa.png",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'CSS', 'React-Query']
        },
        //ReSee 프로젝트
        {
            title: 'ReSee',
            developer: '프론트엔드 1명 | 백엔드 1명',
            date: '22.09.14 ~ 22.10.12',
            viewSite : "View Page",
            description: (
                <>
                <p>
                    메모 후 복습을 위해 제작한 사이트.<br/>
                    회원가입 시 실시간 유효성 검증과 예외처리로 중복 계정·입력 누락·형식 오류를 사전에 차단했습니다.<br/>
                    Toast UI Editor 라이브러리로 마크다운 글쓰기를 구현해 사용자 경험을 높였으며,<br/>
                    로그인 상태와 API URL을 전역 변수화해 코드 유지보수의 중요성을 인식한 프로젝트입니다.<br/>
                    </p>
                </>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Resee.gif",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'CSS', 'React-Query']
        },
        //Clover 프로젝트
        {
            title: 'Clover',
            developer: '프론트엔드 (Me) 1명 | 백엔드 1명',
            date: ' 2022-08-01 ~ 22-08-31',
            viewSite : "View Page",
            description: (
                    <p>
                    동아리 홍보 및 관리 사이트.<br/>
                    Python 기반 RESTful API와 JWT 인증을 적용하여 로그인 상태 관리와 유저 권한 제어 기능을 구현했습니다.<br/>
                    React Query를 활용해 동아리 검색 및 실시간 데이터 조회 기능을 개발했으며,<br/>
                    다양한 레이아웃 구성과 시스템 흐름도·화면 정의서를 제작하며 기획의 중요성을 다시 인식한 프로젝트입니다.
                    </p>
            ), urls: {
                blog: process.env.PUBLIC_URL + "img/ProjectImg/Clover.gif",
                go: process.env.PUBLIC_URL + "img/All/Go.png",
                goNotion: process.env.PUBLIC_URL + "img/All/Go_Notion.png"
            },
            skillList: ['React', 'CSS', 'React-Query']
        },
    ]

    const [arrowed, setArrowd] = useState(false)

    useEffect(() => {
        const newSelectSkill = skills.filter(item => item.checked).map(item => item.name);
        setSelectSkill(newSelectSkill);

    }, [skills]);

    const sortedProjects = [...projects].sort((a, b) => {
        const aCount = a.skillList.filter(skill => selectSkill.includes(skill)).length;
        const bCount = b.skillList.filter(skill => selectSkill.includes(skill)).length;
        return bCount - aCount;
    });

    // 깃허브 페이지 이동
    const handleClickNavigateGithub = (title) => {
        if(title==="Blog"){
            window.open("https://github.com/b-hyoung/Blog");
        }else if(title==="kkeua"){
            window.open("https://github.com/b-hyoung/kkeua.git")
        }else if(title === "ReSee"){
            window.open("https://github.com/b-hyoung/Resee_project")
        }else if(title === "Clover"){
            window.open("https://github.com/b-hyoung/Clover")
        }else if(title === "Eriwa"){
            window.open("https://github.com/b-hyoung/NewRiwa")
        }else if(title === "w2go_uiseong"){
            window.open("https://github.com/b-hyoung/coin_uiseong")
        }
    }
    // 사이트 이동
    const handleClickNavigateViewSite = (title) => {
        if(title==="Blog"){
        }else if(title==="kkeua"){
        }else if(title === "ReSee"){
            setIsModalOpen(true); // 모달 열기
            setSelectViewPage(gifsResee)
            return;
        }else if(title === "Clover"){
            setIsModalOpen(true); // 모달 열기
            setSelectViewPage(gifs)
            return;
        }else if(title === "Eriwa"){
            window.open("https://eriwa.netlify.app/")
        }else if(title === "w2go_uiseong"){
            window.open("https://uiseong.netlify.app/")
        }
    }
    // 모달 닫기
    const closeModal = useCallback(() => setIsModalOpen(false), []);


    return (
        <div>
            <div>
                {sortedProjects.map((project, index) => (
                    <div className='Project_Blog' style={{ position: 'relative' }} onMouseEnter={() => setArrowd(true)} onMouseLeave={() => setArrowd(false)}>
                        <span className='Project_title'>
                            {/* 프로젝트 이름 */}
                            {project.title}
                            <img className='arrowImg' src={arrowed ? project.urls?.goNotion : project?.urls?.go} />
                        </span>
                        <div className='Project_Info'>
                            <img className='ProjectImg' src={project.urls?.blog} />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {project.date && (
                                    <div className="Project_Date">
                                        Date {project.date}
                                    </div>
                                )}
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
                        <div className='project_pageNavigate' style={{ textAlign:'center' }}>
                            <button   className={
                                    project.viewSite === "중단된 프로젝트입니다." ||
                                    project.viewSite === "현제 페이지"
                                    ? "pageNavigateFalse"
                                    : "pageNavigateTrue"
                                    } style={{marginRight:'30px'}} onClick={() => handleClickNavigateViewSite(project.title)}>
                                        {project.viewSite ? project.viewSite : "View WebSite"}
                                </button>
                            <button onClick={() => handleClickNavigateGithub(project.title)}>View on GitHub</button>
                            </div>
                    </div>
                ))}
            </div>
                {isModalOpen && <GifGallery gifs={selectViewPage} onClose={()=>closeModal(false)} />}
        </div>
    )
}

export default Project
