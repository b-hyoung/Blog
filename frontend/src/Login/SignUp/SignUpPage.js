import React, { useEffect, useState } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import api from '../../Api/axiosInstance';
import { USER_API } from '../../Api/LoginAPi';
import { isValidPassword } from '../../Component/constants';
import { ROUTES } from '../../Component/PathLink';
import useTokenStore from '../../store/tokenStore';

function SignUpPage() {

  const navigate = useNavigate("");
  const userTypeList = ['User', 'Djgnfj', 'Guest']

  const [userType, setUserType] = useState()
  const [userTypeBoolean, setUserTypeBoolean] = useState(false)
  const [complateBoolean, setComplateBoolean] = useState(false)

  const [userId, setUserId] = useState({});
  const [userIdCheck, setUserIdCheck] = useState(false)
  const [userInfo, setUserInfo] = useState({
    nickName: "",
    password: "",
    rePassword: "",
    email: "",
    clanName: ""
  })

  //유저 타입 변경시 다 초기화
  useEffect(() => {
    if (userIdCheck === false) {
      setUserInfo({
        nickName: "",
        password: "",
        rePassword: "",
        email: "",
        clanName: ""
      });
      setComplateBoolean(false);
    } else if (userType === "Guest") {
      setComplateBoolean(true);
      setUserIdCheck(true);
    }
  }, [userType]);

  // input 상태 관리
  const handleChangeId = (e) => {
    const { name, value } = e.target;
    if (name !== "userId") {
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        [name]: value || ""
      }))
    } else {
      setUserIdCheck(false)
      setUserId(prevUserId => ({
        ...prevUserId,
        [name]: value || ""
      }));
    }
  }

  // 유저타입 선택 후 리로드
  const handleClickUserType = (item) => {
    setUserType(item)
    setUserTypeBoolean(!userTypeBoolean)
    handleCheckUser(item)
  }

  //유저의 선택에 따른 userId 부여
  const handleCheckUser = (user) => {
    if (user === "User") {
      setUserId({ userId: userInfo.nickName });
    } else if (user === "Guest") {
      setUserId({ userId: "Guest" });
      if (userIdCheck === true) {
        setUserIdCheck(false)
      }
    } else {
      setUserId({ userId: "Djgnfj" });
      if (userIdCheck === true) {
        setUserIdCheck(false)
      }
    }
  }

  //유저 아이디 중복체크 및 글자수 제한
  const handleCheckUniqueId = async () => {
    //유저 아이디 Db에서 중복확인해서 중복아니면 다음창으로 넘어가기
    if ((userId.userId === undefined || (userId.userId).length === 0)) {
      alert("유저이름을 입력해주세요")
    } else if (userId.userId.length > 10) {
      alert("10글자 미만으로 입혁해주세요")
      setUserIdCheck(false)
    } else {
      try{
        const res = await api.get(`${USER_API.GET_USERCHECKED}?username=${userId.userId}`,{
        })
        if(res.data.available === true){
          setUserIdCheck(false)
          alert("이미 존재하는 아이디입니다.")
        }else{
          setUserIdCheck(true)
        }
      }catch(e){
        setUserIdCheck(false)
      }
    }
  }
  //비밀번호 확인이 비밀번호와 같은 값이면 가입완료 버튼 생성
  const handleChangeIdRePassword = (e) => {
    setUserInfo({
      ...userInfo,
      rePassword: e.target.value
    })
    if (e.target.value === userInfo.password &&isValidPassword(userInfo.password) === true ) {
      setComplateBoolean(true)
    } else {
      setComplateBoolean(false)
    }
  }
  //가입 완료
  const handleClickComplateSignUp = async () => {
    try {
      if (userType === "Guest") {
        const res = await api.post(USER_API.GET_CREARTE, {
          role: "guest"
        });
        const guestId = res.data.user?.username;
        if (guestId) {
          localStorage.clear();
          localStorage.setItem("guest_id", guestId);

          useTokenStore.getState().setTokens({
            accessToken: res.data.access || null,
            refreshToken: res.data.refresh || null
          });
          useTokenStore.getState().setUsername(guestId);
          
          alert(`게스트 가입 성공! ID: ${guestId}`);
          navigate(ROUTES.BLOG);
        } else {
          alert("게스트 ID 저장에 실패했습니다.");
        }
      } else {
        const res = await api.post(USER_API.GET_CREARTE, {
          username: userId.userId,
          password: userInfo.password,
          password2: userInfo.rePassword,
          role: userType.toLowerCase()
        });

        localStorage.clear();
        useTokenStore.getState().setTokens({
          accessToken: res.data.access || null,
          refreshToken: res.data.refresh || null
        });
        useTokenStore.getState().setUsername(res.data.user);
        alert("회원가입 완료 ! 좋은하루되세요 ~")
        navigate(ROUTES.BLOG);
      }
    } catch (e) {
      alert("게스트는 한번만 가입해주시면 됩니다 ^_^");
    }
  }

  return (
    <div className='SignUpPage'>
      <h1 className='Sign_Title'>회원가입 페이지</h1>

      {/** user Type Check Dropdown */}
      <div className='Sign_userType'>
        <div className='Sign_Menu'>누구세요?</div>
        <input className='userType_dropdown' value={userType || ""} readOnly onClick={() => setUserTypeBoolean(!userTypeBoolean)} />
        <div className='userType_dropdownList' style={{ display: userTypeBoolean ? "block" : "none" }} >
          {userTypeList.map((item, index) => (
            <input key={index} className='userType_dropdownValue' value={item} onClick={() => handleClickUserType(item)} readOnly />
          ))}
        </div>
      </div>

      {/* userId Check  */}
      <div className='Sign_userId' style={{ display: userType !== undefined ? "block" : "none" }}>
        <div className='Sign_Menu'>한글로 아이디를 입력해주세요</div>
        <input className='userId_input-field' name='userId' value={userId.userId || ""} onChange={(e) => handleChangeId(e)} readOnly={userType !== "User"} />
      </div>
      {/*user IdCheck Arrow */}
      {userType === "User" && (
        <button className='Sign_img_Arrow' onClick={(e) => handleCheckUniqueId()} style={{ backgroundColor: userId.userId.length >= 1 ? "#7b9acc" : "gray" }} >ID Check</button>
      )}
      {/* AdminCheck */}
      <div className='Sign_CheckDjgnfj' style={{ display: userType === "Djgnfj" ? "block" : "none" }}>
        <div className='Sign_Menu'>What is SA Clan Name ?</div>
        <input value={userInfo.clanName || ""} name='clanName' onChange={(e) => handleChangeId(e)} />
      </div>
      {/** user password */}
      <div style={{ display: (userIdCheck === true) || userInfo.clanName === "MindStory" ? "block" : "none", textAlign: "left", position: "relative", width: "100%" }}>
        <div style={{ position: "relative", width: "100%" }}>
          <input className='input-field' id='password' type='password' name='password' value={userInfo.password || ""} onChange={(e) => handleChangeId(e)} placeholder=" " required />
          <label htmlFor="password" class="placeholder-text">비밀번호</label>
          {(isValidPassword(userInfo.password) === false && userInfo.password.length >= 1) && (
            <div className='SignUp_ErrorMsg'>비밀번호는 숫자와 영문을 합쳐 6글자 이상입력해주세요</div>
          )}
        </div>
        <div style={{ position: "relative", width: "100%" }}>
          <input className='input-field' type='password' id='Repassword' name='rePassword' value={userInfo.rePassword || ""} onChange={(e) => handleChangeIdRePassword(e)} placeholder=" " />
          <label htmlFor="Repassword" class="placeholder-text">확인</label>
          {(complateBoolean === false && userInfo.rePassword.length >= 1) && (
            <div className='SignUp_ErrorMsg'>비밀번호가 동일하지않습니다</div>
          )}
        </div>
      </div>

      <div className='Sign_Complate' style={{ display: complateBoolean === true || userType === "Guest" ? "flex" : "none" }}>
        <span>가입해주셔서 감사합니다</span>
        <span>좋은 피드백을 남겨주세요...!</span>
        <button onClick={() => handleClickComplateSignUp()}>
          가입완료하기
        </button>
      </div>
    </div>
  )
}

export default SignUpPage;
