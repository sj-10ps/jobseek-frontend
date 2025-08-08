import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const followunfollow=createAsyncThunk(
    "followunfollow/managefollowing",
    async({followingid,followerid})=>{
        const response=await axios.post(`${ip}/managefollowing`,{followingid,followerid})
        return response.data
    }
)




const followunfollowSlice=createSlice({
    name:"followunfollow",
    initialState:{
        loadingfollow:false,
        successfollow:false,
        followedstatus:null,
      
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(followunfollow.fulfilled,(state,action)=>{
           state.followedstatus=action.payload.status
           state.loadingfollow=false
           state.successfollow=true
          
            
        })
         .addCase(followunfollow.pending,(state,action)=>{
          
           state.loadingfollow=true
           state.successfollow=false
          
            
        })
     
    }
})

const followunfollowreducer=followunfollowSlice.reducer
export default followunfollowreducer