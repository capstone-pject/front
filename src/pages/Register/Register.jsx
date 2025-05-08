import React, { useEffect, useState } from 'react'
import "./Register.style.css"
// import useRegister from '../../hooks/useRegister';

const Register = () => {
  const [userId, setUserId] = useState("");
  const [password,setPassword] = useState("");
  const [birth, setBirth] = useState(''); // 생년월일은 문자열로 관리 (YYYY-MM-DD 형식)

  // const registerMutation = useRegister();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   const userData = {userId,password}
  //   // registerMutation.mutate(userData)
  //   registerMutation.mutate(userData)
  // }


  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지

    const userInfoDto = {
      userId,
      password,
      birth, // 문자열 형태 그대로 전송 (백엔드에서 Date 타입으로 변환 필요)
    };

    try {
      // 백엔드 API 엔드포인트 URL (실제 환경에 맞게 수정 필요)
      const response = await fetch('/join', { // proxy 설정 참고'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfoDto),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('회원가입 성공:', result);
        alert('회원가입에 성공했습니다!');
        // 성공 후 입력 필드 초기화
        setUserId('');
        setPassword('');
        setBirth('');
      } else {
        console.error('회원가입 실패:', response.statusText);
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입 요청 중 오류 발생:', error);
      alert('회원가입 요청 중 오류가 발생했습니다.');
    }
  };



  useEffect(()=>{
    console.log("userId",userId)
    console.log("pass",password)
  },[userId,password])

  return (
    <div>
      <form onSubmit={handleSubmit} className="container">
        <h2 className="login-title">회원가입</h2>
        <input onChange={(event)=>setUserId(event.target.value)} placeholder='아이디 입력' className="id-input"/>
        <input onChange={(event)=>setPassword(event.target.value)} placeholder='비밀번호 입력' className="pass-input"/>
        <button type="submit" className='login-button'>로그인</button>
      </form>
      <div>
          <label htmlFor="birth">생년월일:</label>
          <input
            type="date" // 날짜 입력을 위한 타입
            id="birth"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
          />
        </div>
    </div>
  )
}

export default Register