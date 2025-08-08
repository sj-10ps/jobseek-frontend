import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const fetchusercompanies=createAsyncThunk(
    "fetchusercompany/fetchusercompanies",
    async(formdata)=>{
        const response=await axios.post(`${ip}/fetchusercompanies`,formdata)
        return response.data
    }
)

export const fetchallusercompanies=createAsyncThunk(
     "fetchusercompany/fetchallusercompanies",
    async(formdata)=>{
        const response=await axios.post(`${ip}/fetchallusercompanies`,formdata)
        return response.data
    }

)

const fetchusercompaniesSlice=createSlice({
    name:'fetchusercompany',
    initialState:{
        loading:false,
        success:true,
        data:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchusercompanies.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload.data
        })
        .addCase(fetchusercompanies.pending,(state)=>{
            state.loading=true
            state.success=false
        })
        .addCase(fetchallusercompanies.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
            state.data=action.payload.data
        })
        .addCase(fetchallusercompanies.pending,(state)=>{
            state.loading=true
            state.success=false
        })
    }
})

const fetchusercompaniesReducer=fetchusercompaniesSlice.reducer
export default fetchusercompaniesReducer