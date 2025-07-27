import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const uploadeducation=createAsyncThunk(
    "uploadeducation/uploadeducationdetails",
    async(formdata)=>{
        const response=await axios.post(`${ip}/uploadeducationdetails`,formdata)
        return response.data
    }
)


const Educationslice=createSlice({
    name:"education",
    initialState:{
        loading:false,
        success:true
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(uploadeducation.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
        })
        .addCase(uploadeducation.pending,(state,action)=>{
            state.loading=true
            state.success=false
        })
    }

})

export default Educationslice.reducer   