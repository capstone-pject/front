import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./PillCalendar(old).style.css";
import counterStore from "../../stores/counterStore";
import {formatDate} from "react-calendar/dist/cjs/shared/dateFormatter.js";
import { Button } from "react-bootstrap";
import PillRegisterModal from "./components/PillRegisterModal";

const PillCalendarOld = () => {
  // const {count,increase,increaseBy} = counterStore();
  const [value, setValue] = useState(new Date());

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div class="calendar-page">
      <Button variant="primary" onClick={handleShow}>약 등록하기</Button>

      <div class="calendar-container">
        <Calendar
          calendarType="hebrew"
          onChange={setValue}
          value={value}
          // formatShortWeekday={(local, date) => formatDate(date, "")}
          className="custom-calendar"
          tileClassName="tile-design"
        />
      </div>

      <PillRegisterModal show={show} handleClose={handleClose}/>

      {/* <div className="example">Hello</div>
      <h1>count:{count}</h1>
      <button onClick={increase}>inc</button>
      <button onClick={()=>increaseBy(10)}>10inc</button> */}
    </div>
  );
};

export default PillCalendarOld;