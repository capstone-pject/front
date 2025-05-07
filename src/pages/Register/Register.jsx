import React, { useEffect, useState } from 'react'
import "./Register.style.css"

const Register = () => {
  const [userId, setUserId] = useState("");
  const [pass,setPass] = useState("");

  useEffect(()=>{
    console.log("userId",userId)
    console.log("pass",pass)
  },[userId,pass])

  return (
    <div className={styles.container}>
      <h2 className={styles.loginTitle}>로그인</h2>
      <input onChange={(event)=>setUserId(event.target.value)} placeholder='아이디 입력' className={styles.idInput}/>
      <input onChange={(event)=>setPass(event.target.value)} placeholder='비밀번호 입력' className={styles.passInput}/>
      <button onClick={}>로그인</button>
    </div>
  )
}

export default Register