import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { act } from "react";

export const fetchdetails=createAsyncThunk(
    "userdetails/fetchdetails",
    async(userid)=>{
        const response=await axios.post(`${ip}/fetchdetails`,{userid:userid})
        return response.data
    }
)

const fetchdetailsSlice=createSlice({
    name:"userdetails",
    initialState:{
    loading:false,
    success:true,
    profiledata:[],
    certificatedata:[],
    educationdata:[],
    experiencedata:[],
    skillsdata:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
       builder.addCase(fetchdetails.fulfilled,(state,action)=>{
        state.loading=false
        state.success=true
        state.profiledata=action.payload.profiledata
        state.certificatedata=action.payload.certificatedata
        state.educationdata=action.payload.educationdata
        state.experiencedata=action.payload.experiencedata
        state.skillsdata=action.payload.skillsdata
       })
       .addCase(fetchdetails.pending,(state,action)=>{
        state.loading=true
        state.success=false
        
       })
    }
})

const fetchdetailsreducer=fetchdetailsSlice.reducer
export default fetchdetailsreducer
