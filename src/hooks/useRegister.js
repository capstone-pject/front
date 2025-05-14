import { useMutation } from "@tanstack/react-query"
import api from "../utils/api";

const registerUser = async(userData) => {
    const {data} = await api.post('/join',userData)
    return data;
}

const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            console.log("회원가입 성공! ", data);
        },
        onError: (error)=>{
            console.error("회원가입 실패: ", error)
        }
    })
}

export default useRegister;