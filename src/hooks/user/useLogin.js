import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import userStore from "../../stores/userStore";

const loginUser = async(formData)=>{
    const response = await api.post('/users/login',formData);
    console.log("responseee",response);
    return response;
}


export default function useLogin() {
    const setUser = userStore((state)=> state.setUser)

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (response)=>{
            const message = response.data;
            const userId = message.replace("로그인 성공: ", "");
            console.log(userId);
            setUser(userId);
            console.log("로그인 성공: ",response);
        },
        onError: (error)=>{
            console.error("로그인 실패: ",error);
        }
    })
}