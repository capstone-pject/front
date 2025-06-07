import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const deleteSchedule = async(scheduleId)=>{
    const response = await api.delete(`api/medication-schedules/${scheduleId}`);
    console.log("responseee",response);
    return response;
}


export default function useDeleteSchedule() {
    return useMutation({
        mutationFn: deleteSchedule,
        onSuccess: (response)=>{
            console.log("약 삭제 성공: ",response);
        },
        onError: (error)=>{
            console.error("약 삭제 실패: ",error);
        }
    })
}