import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { FaS } from "react-icons/fa6";

export const fetchcompany=createAsyncThunk(
    "fetchcompany/fetchcompanydetails",
    async(companyid)=>{
        const response=await axios.post(`${ip}/fetchcompanydetails`,{companyid:companyid})
        return response.data
    }
)

const fetchcompanySlice=createSlice({
    name:"fetchcompany",
    initialState:{
        loading:false,
        success:false,
        data:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
         builder.addCase(fetchcompany.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload.data
         })
         .addCase(fetchcompany.pending,(state)=>{
            state.loading=true
            state.success=false
         })
    }
})


const fetchcompanyreducer=fetchcompanySlice.reducer
export default fetchcompanyreducer