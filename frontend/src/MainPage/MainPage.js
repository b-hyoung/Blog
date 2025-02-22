import React from 'react'
import Introduce from './Introduce/Introduce'
import Skill from './Skill/Skill'
import './MainPage.css'
import Social from './Social/Social'
import Project from './MyProject/Project'

function MainPage() {
    return (
        <div className='MainPage_introduce'>
            <div style={{scale:0.75}}>
                <Introduce />
                <Skill />
                <Social />
            </div>
            <div style={{position:"relative" , top:"70px"}}>
                <h1 style={{color:"white"}}>Project</h1>
                <Project />
                <Project />
            </div>
        </div>
    )
}

export default MainPage
