import React, { useState } from 'react'
import "./Login.style.css"

const Login = () => {
    const [userId,setUserId]=useState("");
    const [password,setPassword] = useState("");

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-title">로그인</div>

        <div className="login-row">
          <div className="login-row-name">아이디</div>
          <input />
        </div>

        <div className="login-row">
          <div className="login-row-name">비밀번호</div>
          <input />
        </div>
      </div>
    </div>
  )
}

export default Login
