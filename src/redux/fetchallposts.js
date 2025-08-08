import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const fetchallposts=createAsyncThunk(
    "fetchallposts/fetchallposts",
    async()=>{
        const response=await axios.post(`${ip}/fetchallposts`)
        return response.data
    }
)

export const fetchyourposts=createAsyncThunk(
    "fetchallposts/fetchyourposts",
    async(logid)=>{
        const response=await axios.post(`${ip}/fetchyourposts`,{logid})
        return response.data
    }
)




const fetchallpostslice=createSlice({
    name:"fetchallposts",
    initialState:{
        loading:false,
        success:false,
        data:[],
        foryoudata:[]
      
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchallposts.fulfilled,(state,action)=>{
           state.followedstatus=action.payload.status
           state.loading=false
           state.success=true
           state.data=action.payload.data
          
            
        })
         .addCase(fetchallposts.pending,(state,action)=>{
          
           state.loading=true
           state.success=false
          
            
        })
        .addCase(fetchyourposts.fulfilled,(state,action)=>{
           state.followedstatus=action.payload.status
           state.loading=false
           state.success=true
           state.foryoudata=action.payload.data
          
            
        })
         .addCase(fetchyourposts.pending,(state,action)=>{
          
           state.loading=true
           state.success=false
          
            
        })
     
    }
})

const fetchallpostsreducer=fetchallpostslice.reducer
export default fetchallpostsreducer