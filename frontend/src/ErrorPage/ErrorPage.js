import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Component/PathLink';

function ErrorPage() {

    const navigate = useNavigate();

    useEffect(() => {
        alert("비 정상적인 접근입니다.");
        navigate(ROUTES.HOME);
    })

  return (
    <div>
      
    </div>
  )
}

export default ErrorPage
