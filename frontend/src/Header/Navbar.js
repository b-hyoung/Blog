import React from 'react'

function Navbar() {
    return (
        <div className='Header_NavBar'>
            {/* 블로그 이름 */}
            <div className='Header_BlogName'>
                <div>Who i am?</div>
            </div>
            <div className='Header_Category'>
                <div>Study</div>
                <div>Item</div>
                <div>I'M</div>
            </div>
            <div className='Header_Login'>
                <div>Who are you?</div>
            </div>
        </div>
    )
}

export default Navbar
