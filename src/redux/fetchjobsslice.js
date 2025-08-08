import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { act } from "react";
import { FaAsymmetrik } from "react-icons/fa";

export const fetchalljobs=createAsyncThunk(
    "fetchjob/fetchalljobs",
    async()=>{
      const response=await axios.get(`${ip}/fetchalljobs`)
      return response.data
    }
)

export const preferredjobs=createAsyncThunk(
    "fetchjob/fetchpreferredjob",
    async(userid)=>{
        const response=await axios.post(`${ip}/fetchpreferredjob`,{userid})
      return response.data
    }
)



const fetchjobsslice=createSlice({
    name:'fetchjob',
    initialState:{
        loading:false,
        success:false,
        data:[],
        preferreddata:[],
       
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchalljobs.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload.data
        })
        .addCase(fetchalljobs.pending,(state)=>{
            state.loading=true
            state.success=false
        })
         .addCase(preferredjobs.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.preferreddata=action.payload.data
        })
        .addCase(preferredjobs.pending,(state)=>{
            state.loading=true
            state.success=false
        })
       
    }
})

const fetchalljobsreducer=fetchjobsslice.reducer
export default fetchalljobsreducer