import React, {useEffect, useState} from "react";
import "./Login.style.css";
import useLogin from "../../hooks/user/useLogin";
import userStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const user = userStore((state)=>state.user);

  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });
    const loginMutation = useLogin();
  
  if(user){
    navigate("/");
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 정보:", loginData);
    loginMutation.mutate(loginData)
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-box">
        <div className="login-title">약(藥)속해요</div>

          <input name="userId"
          value={loginData.userId}
          onChange={handleChange}
          placeholder="아이디"
          className="login-row-input"/>

          <input type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          className="login-row-input"/>
        <button type="submit" className="login-button">로그인</button>
        <div onClick={()=>navigate("/register")} className="login-register-button">회원가입</div>
      </form>
    </div>
  );
};

export default Login;
