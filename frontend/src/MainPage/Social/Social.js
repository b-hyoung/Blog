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
        Email : "youqlrqod@gmail.com ",
        Github : `https://github.com/b-hyoung`  ,
        notion : "https://notion.so/b-hyoung/WelcomePortfolio",
        velog :  "https://velog.io/@h-young/posts"
        }
)

const {Email , Github , notion , velog} = socialLink

    const EmailIcon = () => {
        return (
            <svg width="24px" height="24px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:"10px"}}>
                <path d="M2 4H22C23.1 4 24 4.9 24 6V18C24 19.1 23.1 20 22 20H2C0.9 20 0 19.1 0 18V6C0 4.9 0.9 4 2 4Z" fill="rgb(235, 235, 235)" stroke='black' strokeWidth='1px' />
                <path d="M22 6L12 13L2 6" stroke="black" strokeWidth="2" />
            </svg>
        );
    };
    const handleClickNotion = () => {
        goPage('https://lapis-apparatus-de5.notion.site/195c764264dd805d9628d79baf2ca16c')
    }


    return (
        <div className='Social'>
            <span className='Social_title'>Social</span>
            <div className='Social_Email'  onClick={() => getClipboardText(Email)} style={{padding:"1px 0 0 3px"}} >
                <EmailIcon className="Social_EmailImg"  />
                <a>E-mail : {Email}&nbsp;</a>
            </div>
            <div className='Social_github' onClick={() => goPage(Github)} style={{padding:"2px 0 2px 3px"}}>
                <img src={`${process.env.PUBLIC_URL}/img/icon/github-mark.svg`} />
                <a>Github : {Github}&nbsp;</a>
            </div>
            <div className='Social_notion'  onClick={() => goPage(velog)}>
                <img src={`${process.env.PUBLIC_URL}/img/icon/velog.png`} style={{width:"22px" , height:"22px" , padding:"2px 0 2px 0"}} />
                <a>Velog : {velog} &nbsp;</a>
            </div>
            <div className='Social_velog'  onClick={() => goPage(notion)}>
                <img src={`${process.env.PUBLIC_URL}/img/icon/SVG/icons8-개념.svg`} style={{position:"relative",left:"-2pz"}}/>
                <a>Notion : </a>
                <span onClick={() => handleClickNotion()}>https://www.notion.so/1abc764264dd80178ec5fb78ab6efd7f &nbsp;</span>
            </div>
        </div>
    )
}

export default Social
