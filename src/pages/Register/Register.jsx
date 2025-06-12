import React, {useEffect, useState} from "react";
import "./Register.style.css";
import useRegister from "../../hooks/user/useRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    // userInfoId: 0
    userName:"",
    userId: "",
    password: "",
    birth: "",
  });
  const registerMutation = useRegister();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    // 이전 상태를 복사하고, 변경된 필드만 업데이트
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    registerMutation.mutate(formData,{onSuccess: () => navigate("/")});
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="register-page">
      <div className="register-title">약(藥)속해요 회원가입</div>
      <form onSubmit={handleSubmit} className="flex-column">
        <div className="register-box">
          <div className="register-row-name">이름</div>
          <input
            name="userName"
            onChange={handleChange}
            className="register-row-input"
            placeholder="이름을 작성해주세요."
            required
          />

          <div className="register-row-name">아이디</div>
          <input
            name="userId"
            onChange={handleChange}
            className="register-row-input"
            placeholder="아이디를 작성해주세요."
            required
          />

          <div className="register-row-name">비밀번호</div>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="register-row-input"
            placeholder="아이디를 작성해주세요."
            required
          />

          <div className="register-row-name">생일</div>
          <input
            type="date"
            onChange={handleChange}
            name="birth"
            className="register-row-input"
            required
          />

        {/* <button onClick={registerUser}>회원가입 테스트</button> */}
        </div>
        <button type="submit" className="register-button">회원가입</button>
      </form>
    </div>
  );
};

export default Register;
