import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";

const registerUser = async(formData)=>{
    const response = await api.post('/users/register',formData);
    // console.log("register responseee", response);
    return response;
}


export default function useRegister() {

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (response)=>{
            console.log("회원가입 성공: ",response);
        },
        onError: (error)=>{
            console.error("회원가입 실패: ",error);
        }
    })
}