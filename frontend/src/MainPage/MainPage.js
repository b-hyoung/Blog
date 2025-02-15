import React from 'react'
import Introduce from './Introduce/Introduce'
import Skill from './Skill/Skill'
import './MainPage.css'
import Social from './Social/Social'

function MainPage() {
    return (
        <div className='MainPage_introduce'>
            <div>
                <Introduce />
                <Skill />
                <Social />
            </div>
            <div>
            </div>
        </div>
    )
}

export default MainPage
