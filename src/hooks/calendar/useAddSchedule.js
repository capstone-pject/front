import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const addSchedule = async(formData)=>{
    const response = await api.post('api/medication-schedules',formData);
    console.log("responseee",response);
    return response;
}


export default function useAddSchedule() {
    return useMutation({
        mutationFn: addSchedule,
        onSuccess: (response)=>{
            console.log("약 등록 성공: ",response);
        },
        onError: (error)=>{
            console.error("약 등록 실패: ",error);
        }
    })
}