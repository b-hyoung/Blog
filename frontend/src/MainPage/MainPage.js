import React from 'react'
import Introduce from './Introduce/Introduce'
import Skill from './Skill/Skill'
import './MainPage.css'
import Social from './Social/Social'
import Project from './MyProject/Project'

function MainPage() {
    return (
        <div className='MainPage_introduce'>
            <div style={{scale:0.8}}>
                <Introduce />
                <Skill />
                <Social />
            </div>
            <div>
                <Project />
            </div>
        </div>
    )
}

export default MainPage
