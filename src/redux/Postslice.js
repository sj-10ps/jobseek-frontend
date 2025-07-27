import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const postfetch=createAsyncThunk(
    "post/fetchpost",
     async(userid)=>{
        const response=await axios.post(`${ip}/fetchpost`,{userid:userid})
        return response.data
     }
     
)

const postfetchslice=createSlice({
    name:"postfetch",
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
      .addCase(postfetch.fulfilled,(state,action)=>{
        state.loading=false
        state.success=true
        state.data=action.payload.data
      })
      .addCase(postfetch.pending,(state,action)=>{
         state.loading=true
         state.success=false
       
      })
    }

})

export default postfetchslice.reducer
