import React, { useEffect, useState } from 'react'
import "./Register.style.css"
import useRegister from '../../hooks/useRegister';

const Register = () => {
  const [userId, setUserId] = useState("");
  const [pass,setPass] = useState("");

  const registerMutation = useRegister();

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {userId,pass}
    // registerMutation.mutate(userData)
    registerMutation.mutate(userData)
  }

  useEffect(()=>{
    console.log("userId",userId)
    console.log("pass",pass)
  },[userId,pass])

  return (
    <div>
      <form onSubmit={handleLogin} className="container">
        <h2 className="login-title">로그인</h2>
        <input onChange={(event)=>setUserId(event.target.value)} placeholder='아이디 입력' className="id-input"/>
        <input onChange={(event)=>setPass(event.target.value)} placeholder='비밀번호 입력' className="pass-input"/>
        <button type="submit" className='login-button'>로그인</button>
      </form>
    </div>
  )
}

export default Register