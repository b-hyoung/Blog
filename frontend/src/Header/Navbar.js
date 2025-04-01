import React from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../Component/PathLink.js'
import useTokenStore from '../store/tokenStore.js'

function Navbar() {

    const logoUrl = process.env.PUBLIC_URL + "/img/Logo/BlogLogo.png"
    const navigate = useNavigate("")
    const location = useLocation()
    const token = useTokenStore((state) => state.accessToken);

    const handleClickUrl = () => {
        navigate("/")
    }
    const handleClickWho = () => {
        if(window.confirm("로그아웃 하시겟습니까?")){
            useTokenStore.getState().clearToken(); // 토큰 + 유저명 제거
            localStorage.clear();                  // guest_id 등도 제거
            navigate(ROUTES.LOGIN);                // ✅ 로그인 페이지로 이동
        }
    }

    return (
        <div className='Header_NavBar'>
            {/* 블로그 이름 */}
            <div className='Header_BlogName'>
                <img onClick={(e) => handleClickUrl(e)} className='Nav_Logo' src={logoUrl} />
                <div style={{ fontSize: "20px", cursor: "pointer" }}
                     onClick={() => {
                       if (token) {
                         handleClickWho();
                       } else {
                         navigate(ROUTES.LOGIN);
                       }
                     }}>
                  {token ? "Logout" : "Who are you?"}
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Navbar
