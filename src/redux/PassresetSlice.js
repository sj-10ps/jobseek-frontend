import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const passreset=createAsyncThunk(
    "passresetSlice/resetpassword",
    async(formdata)=>{
     const response=await axios.post(`${ip}/resetpass`,formdata)
     return response.data
    }
)

const passresetSlice=createSlice({
    name:'passreset',
    initialState:{
        loading:false,
        success:true,
        status:null

    },
    reducers:{

    },
    extraReducers:(builder)=>{
         builder
         .addCase(passreset.fulfilled,(state,action)=>{
            state.loading=false
            state.success=action.payload.status==="ok"
            state.status=action.payload.status
         })
         .addCase(passreset.pending,(state,action)=>{
            state.loading=true
            state.success=false
            state.status=null

         })
    }
})

export default passresetSlice.reducer