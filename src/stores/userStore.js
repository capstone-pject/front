import { create } from "zustand";

const userStore = create((set)=>({
    user:null,
    setUser: (userData)=>set({user:userData}),
    clearUserData:()=>set({user:null}),
}))

export default userStore;