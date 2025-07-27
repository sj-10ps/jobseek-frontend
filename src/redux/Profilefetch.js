import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { act } from "react";

export const fetchprofile=createAsyncThunk(
    "profile/fetchprofile",
    async(user_id)=>{
     const response=await axios.post(`${ip}/fetchprofile`,{userid:user_id})
     return response.data
    }
)

const profileSlice=createSlice({
    name:"profile",
    initialState:{
        loading:false,
        success:false,
        status:null,
        data:[]
    },
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchprofile.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.status=action.payload.status
            state.data=action.payload.data
        })
        .addCase(fetchprofile.pending,(state,action)=>{
            state.loading=true
            state.success=false
        })
    }


})

export default profileSlice.reducer