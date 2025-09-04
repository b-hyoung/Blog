import React from 'react'
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../Component/PathLink.js'
import useTokenStore from '../store/tokenStore.js'

function Navbar() {

    const logoUrl = process.env.PUBLIC_URL + "/img/Logo/BlogLogo.png"
    const navigate = useNavigate("")
    const token = useTokenStore((state) => state.accessToken);

    const handleClickUrl = () => {
        navigate("/myblog")
    }
    const handleClickWho = () => {
        if(window.confirm("로그아웃 하시겟습니까?")){
            useTokenStore.getState().clearToken(); // 토큰 + 유저명 제거
            localStorage.clear();                  // guest_id 등도 제거
            navigate(ROUTES.LOGIN);                // ✅ 로그인 페이지로 이동
        }
    }

    return (
        <div className='Header_NavBar' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}>
            {/* 블로그 이름 */}
            <div className='Header_BlogName' style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
                <img onClick={(e) => handleClickUrl(e)} className='Nav_Logo' src={logoUrl} />
            </div>
        </div>
    )
}

export default Navbar
