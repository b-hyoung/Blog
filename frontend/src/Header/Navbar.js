import React from 'react'
import './Navbar.css'
import ScrollNavbar from './Section/ScrollNavbar.js'
import { useLocation, useNavigate } from 'react-router-dom'

function Navbar() {

    const logoUrl = process.env.PUBLIC_URL+"/img/Logo/BlogLogo.png"
    const navigate = useNavigate("")
    const location = useLocation()

    const handleClickUrl = () => {
        console.log(location)
        if(location.pathname === "/login"){
            navigate("/")
        }else{
            navigate("/login")
        }
    }

    return (
        <div className='Header_NavBar'>
            {/* 블로그 이름 */}
            <div className='Header_BlogName'>
                <img onClick={(e) => handleClickUrl(e)} className='Nav_Logo' src={logoUrl}/>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Navbar
