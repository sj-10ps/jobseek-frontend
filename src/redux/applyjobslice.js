import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { act } from "react";

export const applyjob=createAsyncThunk(
    "applyjob/applyforjob",
    async({userid,type,jobid})=>{
      const response=await axios.post(`${ip}/applyforjob`,{userid,type,jobid})
      return response.data
    }
)

export const appliedjobs=createAsyncThunk(
    "applyjob/appliedjobs",
    async(userid)=>{
      const response=await axios.post(`${ip}/appliedjobs`,{userid})
      return response.data
    }
)


const applyjobslice=createSlice({
    name:'applyjob',
    initialState:{
        appliedloading:false,
        appliedsuccess:false,
        applieddata:[]
       
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(applyjob.fulfilled,(state,action)=>{
            state.appliedloading=false
            state.appliedsuccess=true
            
        })
        .addCase(applyjob.pending,(state)=>{
            state.appliedloading=true
            state.appliedsuccess=false
        })
        .addCase(appliedjobs.fulfilled,(state,action)=>{
            state.appliedloading=false
            state.appliedsuccess=true
            state.applieddata=action.payload.data
            
        })
        .addCase(appliedjobs.pending,(state)=>{
            state.appliedloading=true
            state.appliedsuccess=false

        })
    }
})

const applyjobreducer=applyjobslice.reducer
export default applyjobreducer