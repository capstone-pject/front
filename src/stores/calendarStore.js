import { create } from "zustand";

const calendarStore = create((set)=>({
    selectedSchedule:null,
    setSelectedSchedule:(data)=>set({selectedSchedule:data}),
    clearSelectedSchedule:()=>set({selectedSchedule:null}),
    userScheduleList:null,
    setUserScheduleList:(data)=>set({userScheduleList:data}),
}))

export default calendarStore;