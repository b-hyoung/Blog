import React from 'react'
import Introduce from './Introduce/Introduce'
import Skill from './Skill/Skill'
import './MainPage.css'
import Social from './Social/Social'
import Project from './MyProject/Project'

function MainPage() {
    return (
        <div className='MainPage_introduce' >
            <div className="intro-fixed">
                <div className='intro_mobile-fixed'>
                    <Introduce />
                    <Skill />
                    <Social />
                </div>
            </div>
            <div className="project-section">
                <h1 style={{ color: "rgb(198, 198, 198)" }}>프로젝트</h1>
                <Project />
            </div>
        </div>
    )
}

export default MainPage
