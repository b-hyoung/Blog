import React from 'react'
import Introduce from './Introduce/Introduce'
import Skill from './Skill/Skill'
import './MainPage.css'

function MainPage() {
    return (
        <div className='MainPage_introduce'>
            <div>
                <Introduce />
                <Skill />
            </div>
            <div>
            </div>
        </div>
    )
}

export default MainPage
