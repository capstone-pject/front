import React, {useEffect, useState} from "react";
import "./Register.style.css";
import useRegister from "../../hooks/user/useRegister";

const Register = () => {
  const [formData, setFormData] = useState({
    // userInfoId: 0
    userId: "",
    password: "",
    birth: "",
  });
  const registerMutation = useRegister();

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
    registerMutation.mutate(formData);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-box">
        <div className="register-title">회원가입</div>

        <div className="register-row">
          <div className="register-row-name">아이디</div>
          <input
            name="userId"
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>

        <div className="register-row">
          <div className="register-row-name">비밀번호</div>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="register-input"
          />
        </div>

        <div className="register-row">
          <div className="register-row-name">생일</div>
          <input
            type="date"
            onChange={handleChange}
            name="birth"
            className="register-input"
            required
          />
        </div>
        <button type="submit">회원가입</button>
        {/* <button onClick={registerUser}>회원가입 테스트</button> */}
      </form>
    </div>
  );
};

export default Register;
