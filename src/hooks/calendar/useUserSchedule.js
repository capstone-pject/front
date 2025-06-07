import {useQuery} from "@tanstack/react-query";
import api from "../../utils/api";
import userStore from "../../stores/userStore";
import calendarStore from "../../stores/calendarStore";

export default function useUserSchedule() {
  const {user: userId} = userStore();

  const {setUserScheduleList} = calendarStore();

  const getUserSchedule = async () => {
    const response = await api.get(`api/medication-schedules/user/${userId}`);
    console.log("responseee", response);
    return response;
  };

  return useQuery({
    queryKey: ["user-schedule"],
    queryFn: getUserSchedule,
    onSuccess: (response) => {
      console.log("유저 달력 불러오기 성공: ", response);
      // setUserScheduleList()
    },
    onError: (error) => {
      console.error("유저 달력 불러오기 실패: ", error);
    },
    select: (result) => result.data,
  });
}
