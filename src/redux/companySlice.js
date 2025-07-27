import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";


export const registerCompany=createAsyncThunk(
  'company/companyregister',
    async (formdata)=>{
    const response=await axios.post(`${ip}/companyregister`,formdata,{headers:{'Content-Type':'multipart/form-data'}})
    return response.data
    }   
)

const companySlice=createSlice({
    name:'company',
    initialState:{
        loading:false,
        success:false,
       
    },
    reducers:{},
    extraReducers:(builder)=>{
          builder
          .addCase(registerCompany.pending,(state)=>{
            state.loading=true
            state.success=false
            
          })
          .addCase(registerCompany.fulfilled,(state,action)=>{
            state.loading=false
            state.success=true
           
          })
        
    }
})

export default companySlice.reducer