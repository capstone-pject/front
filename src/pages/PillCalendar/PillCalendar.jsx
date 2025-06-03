// MedicationCalendar.jsx
import React, {useState} from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import {v4 as uuidv4} from "uuid";
import "react-calendar/dist/Calendar.css";
import "./PillCalendar.style.css";

Modal.setAppElement("#root");

const PillCalendar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
    time: "",
    dosage: "",
    frequency: "",
    memo: "",
    reminder: false,
  });
  const [isEdit, setIsEdit] = useState(false);

  const openModal = (med = null) => {
    if (med) {
      setFormData(med);
      setIsEdit(true);
    } else {
      setFormData({
        id: "",
        name: "",
        startDate: "",
        endDate: "",
        time: "",
        dosage: "",
        frequency: "",
        memo: "",
        reminder: false,
      });
      setIsEdit(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setMedications((prev) =>
        prev.map((med) => (med.id === formData.id ? formData : med))
      );
    } else {
      setMedications([...medications, {...formData, id: uuidv4()}]);
    }
    closeModal();
  };

  const handleDelete = () => {
    setMedications((prev) => prev.filter((med) => med.id !== formData.id));
    closeModal();
  };

  const isSameDay = (date1, date2) =>
    new Date(date1).toDateString() === new Date(date2).toDateString();

  const tileContent = ({date}) => {
    const medsToday = medications.filter((med) => {
      const start = new Date(med.startDate);
      const end = new Date(med.endDate);
      return date >= start && date <= end;
    });

    return (
      <div className="tile-inner">
        <div className="tile-date">{date.getDate()}</div>
        <div className="pill-scroll-area">
          {medsToday.map((med) => (
            <div
              key={med.id}
              className="pill-box"
              onClick={() => openModal(med)}
              title="약 수정/삭제"
            >
              💊{med.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="medication-wrapper">
      <h2 className="medication-title">복용 달력</h2>
      <button className="medication-add-btn" onClick={() => openModal()}>
        ➕ 약 등록하기
      </button>

      <div className="medication-calendar-container">
        <Calendar
          tileContent={tileContent}
          calendarType="gregory"
          formatDay={() => ""}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="약 등록"
      >
        <h3 className="medication-modal-title">
          {isEdit ? "약 정보 수정" : "약 정보 입력"}
        </h3>
        <form className="medication-form" onSubmit={handleSubmit}>
          <input
            className="medication-input"
            name="name"
            placeholder="약 이름"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="medication-input"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <input
            className="medication-input"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
          <input
            className="medication-input"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
          />
          <input
            className="medication-input"
            name="dosage"
            placeholder="복용량"
            value={formData.dosage}
            onChange={handleChange}
          />
          <input
            className="medication-input"
            name="frequency"
            placeholder="복용 주기"
            value={formData.frequency}
            onChange={handleChange}
          />
          <textarea
            className="medication-textarea"
            name="memo"
            placeholder="메모"
            value={formData.memo}
            onChange={handleChange}
          ></textarea>
          <label className="medication-label">
            <input
              type="checkbox"
              name="reminder"
              checked={formData.reminder}
              onChange={handleChange}
            />
            알림 받기
          </label>
          <div style={{display: "flex", gap: "10px"}}>
            <button className="medication-submit-btn" type="submit">
              {isEdit ? "수정" : "등록"}
            </button>
            {isEdit && (
              <button
                type="button"
                className="medication-cancel-btn"
                onClick={handleDelete}
              >
                삭제
              </button>
            )}
          </div>
        </form>
        <button className="medication-cancel-btn" onClick={closeModal}>
          취소
        </button>
      </Modal>
    </div>
  );
};

export default PillCalendar;
