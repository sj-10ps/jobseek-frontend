import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const uploadcustomresume=createAsyncThunk(
    "uploadcustom/uploadcustomresume",
    async(formdata)=>{
        const response=await axios.post(`${ip}/uploadcustomresume`,formdata)
        return response.data
    }
)

export const fetchcustomresume=createAsyncThunk(
    "uploadcustom/fetchcustomresume",
    async(userid)=>{
        const response=await axios.post(`${ip}/fetchcustomresume`,{userid:userid})
        return response.data
    }
)

const uploadcustomresumeSlice=createSlice({
    name:'uploadcustom',
    initialState:{
        loadingresume:false,
        successresume:true,
        data:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(uploadcustomresume.fulfilled,(state)=>{
            state.loadingresume=false
            state.successresume=true
        })
        .addCase(uploadcustomresume.pending,(state)=>{
            state.loadingresume=true
            state.successresume=false
        })
        .addCase(fetchcustomresume.fulfilled,(state,action)=>{
            state.loadingresume=false
            state.successresume=true
            state.data=action.payload.data
        })
        .addCase(fetchcustomresume.pending,(state,action)=>{
            state.loadingresume=true
            state.successresume=false
           
        })
    }
})

const uploadcustomreducer=uploadcustomresumeSlice.reducer
export default uploadcustomreducer
