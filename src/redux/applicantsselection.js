import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { act } from "react";

export const selectapplicants=createAsyncThunk(
    "selectapplicants/selectapplicants",
    async({choice,applicantid})=>{
      const response=await axios.post(`${ip}/selectapplicants`,{choice,applicantid})
      return response.data
    }
)

export const inviteforinterview=createAsyncThunk(
    "selectapplicants/inviteforinterview",
    async({date,applicantid})=>{
      const response=await axios.post(`${ip}/inviteforinterview`,{date,applicantid})
      return response.data
    }
)




const selectapplicantsslice=createSlice({
    name:'selectapplicants',
    initialState:{
        loading:false,
        success:false,
       
       
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(selectapplicants.fulfilled,(state,action)=>{
            state.appliedloading=false
            state.appliedsuccess=action.payload.status==="ok"
            
        })
        .addCase(selectapplicants.pending,(state)=>{
            state.appliedloading=true
            state.appliedsuccess=false
        })
          .addCase(inviteforinterview.fulfilled,(state,action)=>{
            state.appliedloading=false
            state.appliedsuccess=action.payload.status==="ok"
            
        })
        .addCase(inviteforinterview.pending,(state)=>{
            state.appliedloading=true
            state.appliedsuccess=false
        })
       
    }
})

const selectapplicantsreducer=selectapplicantsslice.reducer
export default selectapplicantsreducer