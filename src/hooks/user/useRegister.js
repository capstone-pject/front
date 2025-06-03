import { useMutation } from "@tanstack/react-query";
import userStore from "../../stores/userStore";
import api from "../../utils/api";

const registerUser = async(formData)=>{
    const response = await api.post('/users/register',formData);
    return response;
}


export default function useRegister() {
    const setUser = userStore((state)=> state.setUser)

    return useMutation({
        mutationFn: registerUser,
        onSuccess: (response)=>{
            console.log(response);
        }
    })
}