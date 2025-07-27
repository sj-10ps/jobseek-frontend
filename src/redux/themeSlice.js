import { createSlice } from "@reduxjs/toolkit";
import { bool } from "yup";


const initialState=localStorage.getItem("dark")==="true"
const themeSlice=createSlice({
    name:"theme",
    initialState:{
        dark:initialState
    },
    reducers:{
        toggledark:(state,action)=>{
            state.dark=!state.dark
            localStorage.setItem("dark",state.dark)
        }
    }

})

export const {toggledark}=themeSlice.actions
export default themeSlice.reducer   