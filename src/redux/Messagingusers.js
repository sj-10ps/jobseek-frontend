import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ip } from "./ip";

export const fetchmessagingusers=createAsyncThunk(
    "fetchmessagingusers/fetchmessagingusers",
    async(logid)=>{
        const response=await axios.post(`${ip}/fetchmessagingusers`,{logid})
        return response.data
    }
)

const fetchmessagingusersslice=createSlice({
    name:'fetchmessagingusers',
    initialState:{
        fetchmessagingusersloading:false,
        fetchmessaginguserssuccess:false,
        fetchmessagingusersdata:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchmessagingusers.pending,(state)=>{
            state.fetchmessagingusersloading=true
            state.fetchmessaginguserssuccess=false
    
        })
        .addCase(fetchmessagingusers.fulfilled,(state,action)=>{
            state.fetchmessagingusersloading=false
            state.fetchmessaginguserssuccess=action.payload.status==="ok"
            state.fetchmessagingusersdata=action.payload.data
        })
    }
})

const fetchmessagingusersreducer=fetchmessagingusersslice.reducer
export default fetchmessagingusersreducer