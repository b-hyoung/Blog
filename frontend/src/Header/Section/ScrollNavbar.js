import React,{useState,useEffect} from 'react'
import './ScrollNavbar.css'

function ScrollNavbar() {
    const [scrollPosition , setScrollPosition] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            // 스크롤 가능 높이(현재 스크롤 가능한 최대 높이값 - 현재 스크롤 값)
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            //현재 스크롤 진행도를 백분율로 표시 (현재 사용자 스크롤한 지점 / 전체 스크롤 가능 높이)
            const scrolled = (window.scrollY / scrollableHeight) * 100
            setScrollPosition(scrolled)
        }
    //스크롤이 이동시 handleScroll 을 실행하여 o위치값 변경
    window.addEventListener("scroll",handleScroll);
    //handle 이벤트를 삭제하여 메모리 누수 방지
    return () => window.removeEventListener("scroll",handleScroll)
},[])


  return (
    <div className='nav_container'>
      <div className='Scroll_nav-bar'>
        {/* 현재 스크롤 진행도를 백분율로 가져와 top에 n% 를 하여 o모양을 n퍼센트 내려주기 */}
        <div className='scroll-indicator' style={{top : `${(scrollPosition / 100) * 32}vh`}}></div>
      </div>
    </div>
  )
}

export default ScrollNavbar
