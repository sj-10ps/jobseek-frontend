import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const uploadcomment=createAsyncThunk(
    "uploadcomment/postcomment",
    async(formdata)=>{
        const response=await axios.post(`${ip}/postcomment`,formdata)
        return response.data
    }
)

export const fetchcomment=createAsyncThunk(
    "uploadcomment/fetchcomment",
    async(postid)=>{
        const response=await axios.post(`${ip}/fetchcomment`,{postid:postid})
        return response.data
    }
)

const uploadcommentSlice=createSlice({
    name:"uploadcomment",
    initialState:{
        loading:false,
        success:true,
    

        fetchloading:false,
        fetchsuccess:false,
        data:[],


    },
    extraReducers:(builder)=>{
     builder
     .addCase(uploadcomment.fulfilled,(state,action)=>{
        state.loading=false
        state.success=true
     })
     .addCase(uploadcomment.pending,(state,action)=>{
        state.loading=true
        state.success=false
     })

     .addCase(fetchcomment.fulfilled,(state,action)=>{
        state.data=action.payload.data
        state.fetchloading=false
        state.fetchsuccess=true

     })
     .addCase(fetchcomment.pending,(state,action)=>{
      
        state.fetchloading=true
        state.fetchsuccess=false

     })
    }
})


 const uploadcommentreducer=uploadcommentSlice.reducer

 export default uploadcommentreducer