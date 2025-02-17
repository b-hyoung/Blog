import React from 'react'
import './Navbar.css'
import ScrollNavbar from './Section/ScrollNavbar.js'

function Navbar() {

    const logoUrl = process.env.PUBLIC_URL+"/img/Logo/BlogLogo.png"

    return (
        <div className='Header_NavBar'>
            {/* 블로그 이름 */}
            <div className='Header_BlogName'>
                <img className='Nav_Logo' src={logoUrl}/>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Navbar
