import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { USER_API } from '../Api/LoginAPi'
import useTokenStore from '../store/tokenStore'
import { BASE_URL } from '../Component/PathLink'
import api from '../Api/axiosInstance'



function Login() {

    const navigate = useNavigate()

    const [toggleImage, setToggleImage] = useState(true)
    const [userId, setUserId] = useState({
        id: "",
        password: "",
    })

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setUserId((prevUserId) => ({
            ...prevUserId,
            [name]: value
        }))
    }

    const handleClickSubmit = async () => {
        try{
            const response = await api.post(USER_API.GET_USER,{
                username : userId.id,
                password : userId.password
            });
            const token = response.data.access;
            console.log("받아온 토큰:", token);
            if (token) {
              useTokenStore.getState().setAccessToken(token);
            } else {
              console.warn("⚠️ access 토큰이 응답에 포함되지 않았습니다.");
            }
            alert("로그인 성공");
            navigate(BASE_URL);
        }catch(error) {
            alert("로그인 실패. 아이디 / 비밀번호를 입력해주세요");
            console.log(error)
        }
    }

    const handleClickSignUpPage = () => {
        navigate("/signUp")
    }

//필요할 때만 바꾸고 그외에 안바꿔지게 수정
const handleMouseEnter = () => {
    if (!toggleImage) setToggleImage(true);
};

const handleMouseLeave = () => {
    if (toggleImage) setToggleImage(false);
};

return (
    <div className='LoginPage'>
        <img onMouseEnter={handleMouseLeave} onMouseLeave={handleMouseEnter}
            src={toggleImage ? `${process.env.PUBLIC_URL}/img/icon/Login/Login_bdforeBlack.png` : `${process.env.PUBLIC_URL}/img/icon/Login/Login_beforeHover.png`} />
        {toggleImage ?
            <div style={{ color: "rgb(177 177 177)", marginBottom: "20px" }}>로그인 해서 깨워주세요 !<br /> Knock Knock</div>
            :
            <div style={{ color: "rgb(255 116 116)", marginBottom: "20px" }}>드르렁...<br /> 컥 !</div>
        }
        <div className='Login_idBox'>
            <div>User ID</div>
            <input style={{ letterSpacing: "1px" }} value={userId.id} onChange={(e) => handleChangeInput(e)} name='id' placeholder='Name' />
        </div>
        <div className='Login_passwordBox'>
            <div>Password</div>
            <input type='password' style={{ letterSpacing: "2px" }} value={userId.password} onChange={(e) => handleChangeInput(e)} name='password' placeholder='password' />
        </div>
        <div className='Login_forgetID'>아이디 or 비밀번호를 잊으셨나요 ?</div>
        <button className='submitLogin' onClick={() => handleClickSubmit()}>Knock</button>
        <button className='Login_SignUpBtn' onClick={() => handleClickSignUpPage()} >가입하기</button>
    </div>
)
}

export default Login
