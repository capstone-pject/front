import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const updateSchedule = async(formData)=>{
    const response = await api.put(`api/medication-schedules/${formData.id}`,formData);
    console.log("responseee",response);
    return response;
}


export default function useUpdateSchedule() {
    return useMutation({
        mutationFn: updateSchedule,
        onSuccess: (response)=>{
            console.log("약 수정 성공: ",response);
        },
        onError: (error)=>{
            console.error("약 수정 실패: ",error);
        }
    })
}