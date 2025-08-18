import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const uploadfeedback=createAsyncThunk(
    "uploadfeedback/uploadfeedback",
    async({feedback,logid})=>{
    const response= await axios.post(`${ip}/uploadfeedback`,{feedback,logid})
    return response.data

    }
)


export const viewfeedback=createAsyncThunk(
    "viewfeedback/viewfeedback",
    async()=>{
    const response= await axios.get(`${ip}/viewfeedback`)
    return response.data

    }
)


const uploadfeedbackslice=createSlice({
    name:"feedback",
    initialState:{
        loading:false,
        success:false,
        viewsuccess:false,
        viewloading:false,
        feedbackdata:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(uploadfeedback.fulfilled,(state,action)=>{
        state.loading=false
        state.success=action.payload.status==="ok"
     })
     .addCase(uploadfeedback.pending,(state,action)=>{
        state.loading=true
        state.success=false
     })
     .addCase(viewfeedback.fulfilled,(state,action)=>{
        state.viewloading=false
        state.viewsuccess=action.payload.status==="ok"
        state.feedbackdata=action.payload.data
     })
     .addCase(viewfeedback.pending,(state,action)=>{
        state.viewloading=true
        state.viewsuccess=false

     })
    }

})


const feedbackreducer=uploadfeedbackslice.reducer
export default feedbackreducer