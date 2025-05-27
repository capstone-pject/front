import React from 'react'
import "./AppLayout.style.css"
import hospitalIcon from "./hospital.png"
import calendarIcon from "./calendar.png"

const AppLayout = () => {
  const buttonList=[{title:"병원지도",image:hospitalIcon},{title:"약 달력",image:calendarIcon},{title:"약 알아보기",image:calendarIcon}]

  return (
    <div className='navbar'>
      <div className='navbar-button-section'>
        {buttonList.map((item,index)=>(
          <button key={index} className='nav-button'>
            <img src={item.image} className='nav-button-image'/>
            <div className='nav-button-title'>{item.title}</div>
          </button>
        ))}
      </div>

    </div>
  )
}

export default AppLayout
