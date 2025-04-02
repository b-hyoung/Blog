import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
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
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [lockoutTime, setLockoutTime] = useState(null);

    useEffect(() => {
        const storedAttempts = localStorage.getItem("loginAttempts");
        const storedLockout = localStorage.getItem("lockoutTime");

        if (storedAttempts) setLoginAttempts(Number(storedAttempts));
        if (storedLockout) setLockoutTime(Number(storedLockout));
    }, []);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setUserId((prevUserId) => ({
            ...prevUserId,
            [name]: value
        }))
    }

    const handleClickSubmit = async () => {
        const now = Date.now();
        if (lockoutTime && now < lockoutTime) {
            alert("로그인을 너무 많이 시도했습니다. 5분 후 다시 시도해주세요.");
            return;
        }
        try{
            const response = await api.post(USER_API.GET_USER,{
                username : userId.id,
                password : userId.password
            });
            const { access: accessToken, refresh: refreshToken, user: username } = response.data;

            if (accessToken && refreshToken) {
              localStorage.clear();
              useTokenStore.getState().setTokens({ accessToken, refreshToken });
              setLoginAttempts(0);
              setLockoutTime(null);
              localStorage.removeItem("loginAttempts");
              localStorage.removeItem("lockoutTime");
            } else {
              console.warn("⚠️ 토큰이 응답에 포함되지 않았습니다.");
            }

            if (username) {
                useTokenStore.getState().setUsername(username);
              } else {
                console.warn("⚠️ username이 응답에 포함되지 않았습니다.");
              }
            alert("로그인 성공");
            navigate(BASE_URL);
        }catch(error) {
            setLoginAttempts(prev => {
                const newAttempts = prev + 1;
                localStorage.setItem("loginAttempts", newAttempts);

                if (newAttempts >= 10) {
                    const lockUntil = Date.now() + 5 * 60 * 1000;
                    setLockoutTime(lockUntil);
                    localStorage.setItem("lockoutTime", lockUntil);
                }

                return newAttempts;
            });
            alert("로그인 실패. 아이디 / 비밀번호를 확인해주세요");
            console.log(error)
        }
    }

    const handleClickSignUpPage = () => {
        navigate("/signUp")
    }
    const forgetIdPassword = () => {
        alert("그럼 다시 가입하세요 !")
        navigate("/signup")
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
            <input type='password' style={{ letterSpacing: "2px" }} value={userId.password} onChange={(e) => handleChangeInput(e)} name='password' placeholder='password' onKeyDown={(e) => { if (e.key === 'Enter') handleClickSubmit(); }} />
        </div>
        <div className='Login_forgetID' onClick={() => forgetIdPassword()} >아이디 or 비밀번호를 잊으셨나요 ?</div>
        <button className='submitLogin' onClick={() => handleClickSubmit()}>Knock</button>
        <button className='Login_SignUpBtn' onClick={() => handleClickSignUpPage()} >가입하기</button>
    </div>
)
}

export default Login
