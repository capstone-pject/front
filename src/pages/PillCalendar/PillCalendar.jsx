// MedicationCalendar.jsx
import React, {useEffect, useState} from "react";
import Calendar from "react-calendar";
import Modal from "react-modal";
import {v4 as uuidv4} from "uuid";
import "react-calendar/dist/Calendar.css";
import "./PillCalendar.style.css";
import userStore from "../../stores/userStore";
import useAddSchedule from "../../hooks/calendar/useAddSchedule";
import useUserSchedule from "../../hooks/calendar/useUserSchedule";
import useUpdateSchedule from "../../hooks/calendar/useUpdateSchedule";
import useDeleteSchedule from "../../hooks/calendar/useDeleteSchedule";

Modal.setAppElement("#root");

const PillCalendar = () => {
  const {user} = userStore();
  const addScheduleMutation = useAddSchedule();
  const updateScheduleMutation = useUpdateSchedule();
  const deleteScheduleMutation = useDeleteSchedule();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [medications, setMedications] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    userId: user,
    medicationName: "",
    startDate: "",
    endDate: "",
    intakeTimes: "",
    dosage: "",
    frequency: "매일",
    memo: "",
    reminder: true,
  });
  const [isEdit, setIsEdit] = useState(false);

  const [todayMeds, setTodayMeds] = useState([]);
  const [todayModalOpen, setTodayModalOpen] = useState(false);

  const [doNotShowToday, setDoNotShowToday] = useState(false);

  const {data, error, refetch} = useUserSchedule();

  const getTodayKey = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // e.g., "2025-06-05"
  };

  useEffect(() => {
    if (data) {
      console.log("schedule listt", data);
      setMedications(data);

      const todayKey = getTodayKey();
      const alreadySeen = localStorage.getItem("hideTodayPillModal");

      const today = new Date();
      const medsForToday = data.filter((med) => {
        const start = new Date(med.startDate).setHours(23, 59, 59);
        const end = new Date(med.endDate).setHours(23, 59, 59);
        console.log("today", today, "start", start, "end", end);
        return today >= start && today <= end;
      });

      if (medsForToday.length > 0 && alreadySeen !== todayKey) {
        setTodayMeds(medsForToday);
        setTodayModalOpen(true); // 한 번만 오픈
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    console.log("medications", medications);
  }, [medications]);

  const openModal = (med = null) => {
    if (med) {
      setFormData(med);
      setIsEdit(true);
    } else {
      setFormData({
        id: "",
        userId: user,
        medicationName: "",
        startDate: "",
        endDate: "",
        intakeTimes: "",
        dosage: "",
        frequency: "",
        memo: "",
        reminder: true,
      });
      setIsEdit(false);
    }
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    // console.log("input value",value)
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      updateScheduleMutation.mutate(
        {...formData, intakeTimes: []},
        {onSuccess: () => refetch()}
      );
    } else {
      addScheduleMutation.mutate(
        {...formData, intakeTimes: []},
        {onSuccess: () => refetch()}
      );
    }
    closeModal();
  };

  const handleDelete = () => {
    deleteScheduleMutation.mutate(formData.id, {onSuccess: () => refetch()});
    closeModal();
  };

  const isSameDay = (date1, date2) =>
    new Date(date1).toDateString() === new Date(date2).toDateString();

  const handleDoNotShowTodayChange = (e) => {
    const checked = e.target.checked;
    setDoNotShowToday(checked);

    if (checked) {
      localStorage.setItem("hideTodayPillModal", getTodayKey());
    } else {
      localStorage.removeItem("hideTodayPillModal");
    }
  };

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
              💊{med.medicationName}
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
        className="pill-modal"
        overlayClassName="pill-modal-overlay"
      >
        <h3 className="medication-modal-title">
          {isEdit ? "약 정보 수정" : "약 정보 입력"}
        </h3>
        <form className="medication-form" onSubmit={handleSubmit}>
          <input
            className="medication-input"
            name="medicationName"
            placeholder="약 이름"
            value={formData.medicationName}
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
          {/* <input
            className="medication-input"
            name="intakeTimes"
            type="time"
            value={formData.intakeTimes}
            onChange={handleChange}
          /> */}
          <input
            className="medication-input"
            name="dosage"
            placeholder="복용량"
            value={formData.dosage}
            onChange={handleChange}
          />
          {/* <input
            className="medication-input"
            name="frequency"
            placeholder="복용 주기"
            value={formData.frequency}
            onChange={handleChange}
          /> */}
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

      <Modal
        isOpen={todayModalOpen}
        onRequestClose={() => setTodayModalOpen(false)}
        contentLabel="오늘의 약"
        className="reminder-modal"
        overlayClassName="reminder-modal-overlay"
      >
        <h3 className="medication-modal-title">📅 오늘 복용해야 할 약</h3>
        {todayMeds.map((med) => (
          <div key={med.id} className="" style={{marginBottom: "10px"}}>
            <strong>{med.medicationName}</strong> -{" "}
            {`${med.dosage}알` || "복용량 미입력"}
          </div>
        ))}
        <div className="reminder-modal-bottom-section">
          <label
            className="medication-label"
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <input
              type="checkbox"
              checked={doNotShowToday}
              onChange={handleDoNotShowTodayChange}
            />
            오늘 더 이상 보지 않기
          </label>
          <button
            className="medication-cancel-btn"
            onClick={() => setTodayModalOpen(false)}
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PillCalendar;
