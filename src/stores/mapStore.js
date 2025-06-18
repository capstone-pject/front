import { create } from "zustand";

const mapStore = create((set)=>({
    searchCategory : null,
    setSearchCategory : (data)=>set({searchCategory:data}),
}))

export default mapStore;