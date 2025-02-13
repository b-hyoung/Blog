import React from 'react'

function Navbar() {
    return (
        <div className='Header_NavBar'>
            {/* 블로그 이름 */}
            <div className='Header_BlogName'>
                <div>Who i am?</div>
            </div>
            {/*
                디자인 변경으로인한 보류 탑바를 이용한 사이트를 만들 때 재사용 할 것
            <div className='Header_Category'>
                <div>Study</div>
                <div>Item</div>
                <div>I'M</div>
            </div>
            <div className='Header_Login'>
                <div>Who are you?</div>
            </div> */}
        </div>
    )
}

export default Navbar
