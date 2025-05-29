import React from "react";
import "./AppLayout.style.css";
import hospitalIcon from "./images/hospital2.png";
import calendarIcon from "./images/calendar2.png";
import pillIcon from "./images/pill2.png";
import instagramIcon from "./images/instagram.png"
import youtubeIcon from "./images/youtube.png"
import kakaoIcon from "./images/kakao.png"
import cameraIcon from "./images/camera.png"
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const buttonList = [
    {title: "병원지도", image: hospitalIcon},
    {title: "약 달력", image: calendarIcon},
    {title: "약 알아보기", image: pillIcon},
    {title: "사진으로 약 찾기", image: cameraIcon},
  ];

  const navigate = useNavigate();

  const handleNavbarButton = (e) => {
    console.log(e.target.innerText);
    if(e.target.innerText==="병원지도") {
      navigate("/map");
    }else if(e.target.innerText==="약 달력") {
      navigate("/calendar");
    }else if(e.target.innerText==="약 알아보기") {
      navigate("/info"); 
    }else if(e.target.innerText==="사진으로 약 찾기") {
      navigate("/ocr");
    }
  }

  return (
    <div>
      <div className="navbar">
        <div onClick={()=>navigate('/')} className="navbar-page-title">약(藥)속해요</div>
        <div className="navbar-button-section">
          {buttonList.map((item, index) => (
            <button onClick={handleNavbarButton} key={index} className="nav-button">
              <img src={item.image} className="nav-button-image" />
              <div className={item.title==="사진으로 약 찾기"?"nav-button-title nav-button-title-small":"nav-button-title"}>{item.title}</div>
            </button>
          ))}
        </div>
        <div className="navbar-navigate-section">
          <button className="navbar-login-button">로그인</button>
        </div>
      </div>
      <Outlet/>
      <footer className="footer">
        <div className="footer-first-row">
          약(藥)속해요
        </div>
        <div className="footer-second-row">
          <img src={instagramIcon} className="footer-sns-icon"/>
          <img src={youtubeIcon} className="footer-sns-icon"/>
          <img src={kakaoIcon} className="footer-sns-icon"/>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
