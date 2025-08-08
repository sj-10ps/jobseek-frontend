import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const uploadpost=createAsyncThunk(
    "uploadpost/upload",
     async(formdata) => {
         const response=await axios.post(`${ip}/uploadpost`,formdata)
         return response.data
    }
)

export const updatelikes=createAsyncThunk(
    "uploadpost/updatelikes",
    async({postid,isliked,logid})=>{
        
       await axios.post(`${ip}/updatelike`,{postid,isliked,logid})
    }
)

const uploadpostSlice=createSlice({
    name:"uploadpost",
    initialState:{
        loading:false,
        success:true,
        data:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
     builder
     .addCase(uploadpost.pending,(state,action)=>{
        state.loading=true
        state.success=false
        state.data=null
     })
     .addCase(uploadpost.fulfilled,(state,action)=>{
        state.loading=false
        state.success=true
        state.data=action.payload.data
     })
    }

})



export default uploadpostSlice.reducer