import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";
import { act } from "react";
import { retry } from "@reduxjs/toolkit/query";
import { actionBarAnatomy } from "@chakra-ui/react/anatomy";

export const login=createAsyncThunk(
    "login/loginpost",
    async(formdata)=>{
       const response=await axios.post( `${ip}/login`,formdata,{headers:{'Content-Type':'multipart/form-data'}})
       return response.data
    }
)


const loginslice=createSlice({
    name:"login",
    initialState:{
       loading:false,
        success:true,
        status:null,
        userinfo:null   
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
        .addCase(login.pending,(state,action)=>{
        state.loading=true
        state.success=false
        state.status=null
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false
            state.success=action.payload.status==="ok"
            state.status=action.payload.status
            state.userinfo={
                userid:action.payload.userId,
                usertype:action.payload.usertype,
                log_id:action.payload.log_id
            }
        })
    }


})

export default loginslice.reducer