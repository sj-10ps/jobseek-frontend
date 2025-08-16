import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { act } from "react";

export const viewapplicant=createAsyncThunk(
    "viewapplicant/viewapplicantdetails",
    async({jobid})=>{
      const response=await axios.post(`${ip}/viewapplicantdetails`,{jobid})
      return response.data
    }
)

export const viewselectedapplicant=createAsyncThunk(
    "viewapplicant/viewselectedapplicant",
    async({jobid})=>{
      const response=await axios.post(`${ip}/viewselectedapplicant`,{jobid})
      return response.data
    }
)


export const viewfilteredapplicants=createAsyncThunk(
    "viewapplicant/viewfilteredapplicants",
    async({jobid})=>{
      const response=await axios.post(`${ip}/viewfilteredapplicants`,{jobid})
      return response.data  
    }
)




const viewapplicantslice=createSlice({
    name:'viewapplicant',
    initialState:{
        applicantloading:false,
        applicantsuccess:false,
        applicantdata:[],
        selecteddata:[],
        filtereddata:[],
        filteredloading:false,
        filteredsuccess:false,
       
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(viewapplicant.fulfilled,(state,action)=>{
            state.applicantloading=false
            state.applicantsuccess=true
            state.applicantdata=action.payload.data
            
        })
        .addCase(viewapplicant.pending,(state)=>{
            state.applicantloading=true
            state.applicantsuccess=false
        })
        .addCase(viewselectedapplicant.fulfilled,(state,action)=>{
            state.applicantloading=false
            state.applicantsuccess=true
            state.selecteddata=action.payload.data
            
        })
        .addCase(viewselectedapplicant.pending,(state)=>{
            state.applicantloading=true
            state.applicantsuccess=false
        })
        .addCase(viewfilteredapplicants.fulfilled,(state,action)=>{
            state.filteredloading=false
            state.filteredsuccess=true
            state.filtereddata=action.payload.data
            
        })
        .addCase(viewfilteredapplicants.pending,(state)=>{
            state.filteredloading=true
            state.filteredsuccess=false
        })
        

        
    }
})

const viewapplicantreducer=viewapplicantslice.reducer
export default viewapplicantreducer