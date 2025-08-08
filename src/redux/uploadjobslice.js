import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const uploadjob=createAsyncThunk(
    "uploadjob/uploadjobdetails",
    async(formdata)=>{
        const response=await axios.post(`${ip}/uploadjobdetails`,formdata)
        return response.data
    }

)

export const fetchjobsbyid=createAsyncThunk(
    "uploadjob/fetchjobsbyid",
    async (comid) => {
        const response=await axios.post(`${ip}/fetchjobsbyid`,{comid:comid})
        return response.data
    }
)

export const closejob=createAsyncThunk(
     "uploadjob/closejob",
    async (jobid) => {
        const response=await axios.post(`${ip}/closejob`,{jobid:jobid})
        return response.data
    }
)

const uploadjobslice=createSlice({
    name:"uploadjob",
    initialState:{
        loading:false,
        success:false,
        data:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(uploadjob.pending,(state)=>{
        state.loading=true
        state.success=false
     
      })
      .addCase(uploadjob.fulfilled,(state)=>{
        state.success=true
        state.loading=false
      })
      .addCase(fetchjobsbyid.fulfilled,(state,action)=>{
        state.loading=false
        state.success=true
        state.data=action.payload.data
      })
      .addCase(fetchjobsbyid.pending,(state)=>{
        state.loading=true
        state.success=false
      }
    )
    }
})

const uploadjobreducer=uploadjobslice.reducer

export default uploadjobreducer