import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Social.css'
import { getClipboardText } from '../../Section/getClipboardText'




function Social() {
    
    const goPage = (text) => {
        window.open(text)
    }

    const [socialLink , setSocialLink] = useState(
        {
        Email : "youqlrqod@gmail.com",
        Github : "https://github.com/b-hyoung"  ,
        notion : "https://notion.so/b-hyoung/WelcomePortfolio",
        velog :  "https://velog.io/@h-young/posts"
        }
)

const {Email , Github , notion , velog} = socialLink

    const EmailIcon = () => {
        return (
            <svg width="24px" height="24px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"10px"}}>
                <path d="M2 4H22C23.1 4 24 4.9 24 6V18C24 19.1 23.1 20 22 20H2C0.9 20 0 19.1 0 18V6C0 4.9 0.9 4 2 4Z" fill="rgb(227, 227, 227)" stroke='black' strokeWidth='1px' />
                <path d="M22 6L12 13L2 6" stroke="black" stroke-width="2" />
            </svg>
        );
    };
    const handleClickNotion = () => {
        goPage('https://lapis-apparatus-de5.notion.site/195c764264dd805d9628d79baf2ca16c')
    }


    return (
        <div className='Social'>
            <h1>Social</h1>
            <div className='Social_Email'  onClick={() => getClipboardText(Email)}>
                <EmailIcon className="Social_EmailImg"  />
                <a>Email : {Email}</a>
            </div>
            <div className='Social_github' onClick={() => goPage(Github)}>
                <img src={`${process.env.PUBLIC_URL}/img/icon/github-mark-white.svg`} />
                <a>Git : {Github}</a>
            </div>
            <div className='Social_notion'  onClick={() => goPage(velog)}>
                <img src={`${process.env.PUBLIC_URL}/img/icon/velog.png`} />
                <a>Velog : {velog}</a>
            </div>
            <div className='Social_velog'  onClick={() => goPage(notion)}>
                <img src={`${process.env.PUBLIC_URL}/img/icon/SVG/icons8-개념.svg`} />
                <a>Notion : </a>
                <span onClick={() => handleClickNotion()}>https://notion.so/b-hyoung/WelcomePortfolio</span>
            </div>
        </div>
    )
}

export default Social
