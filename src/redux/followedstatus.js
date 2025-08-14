import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { ip } from "./ip"

export const checkfollowstatus=createAsyncThunk(
    "followedstatus/checkfollowstatus",
    async({followingid,followerid})=>{
        const response=await axios.post(`${ip}/checkfollowstatus`,{followingid,followerid})
        return response.data
    }
)

export const checkfollowstatusall=createAsyncThunk(
    "followedstatus/checkfollowstatusall",
    async({followerid})=>{
        const response=await axios.post(`${ip}/checkfollowstatusall`,{followerid})
        return response.data
    }
)


const followunfollowSlice=createSlice({
    name:"followedstatus",
    initialState:{
        followstatussuccess:false,
        followstatusloading:false,
        followdata:[],
      
    },
    reducers:{
        resettatus:(state) => {
        state.followstatusloading = false;
        state.followstatussuccess = false;
        state.followdata = [];
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(checkfollowstatus.fulfilled,(state,action)=>{
           state.followdata=action.payload.data
           state.loadingfollow=false
           state.successfollow=true
          
            
        })
         .addCase(checkfollowstatus.pending,(state,action)=>{
          
           state.loadingfollow=true
           state.successfollow=false
          
            
        })
        .addCase(checkfollowstatusall.fulfilled,(state,action)=>{
            state.loadingfollow=false
           state.successfollow=true
            state.followdata=action.payload.data
        })
     
    }
})

const {resettatus}=followunfollowSlice.actions
const followedstatusreducer=followunfollowSlice.reducer
export default followedstatusreducer