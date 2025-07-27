import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ip } from "./ip";
import axios from "axios";

export const registerUser=createAsyncThunk(
    "user/registeruser",
    async (formdata)=>{
        const response=await axios.post(`${ip}/userregister`,formdata,{headers:{'Content-Type':'multipart/form-data'}})
        return response.data
    }
)

export const updateProfile=createAsyncThunk(
    "user/updateProfile",
    async(formdata)=>{
        const response=await axios.post(`${ip}/profileUpdate`,formdata,{headers:{'Content-Type':'multipart/form-data'}})
        return response.data
    }
)

const userSlice=createSlice({
    name:"user",
    initialState:{
        loading:false,
        success:false,
        status:null,
        
    },
    reducers:{
      
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state,action)=>{
            state.loading=true
            state.success = false;
             state.status = null;
            
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false 
            state.success=action.payload.status==="ok"
            state.status=action.payload.status
        })

        .addCase(updateProfile.pending,(state,action)=>{
            state.loading=true
            state.success=false
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
        })
    }
})

export default userSlice.reducer