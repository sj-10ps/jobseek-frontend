import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const followingfollowercount=createAsyncThunk(
    "followingfollowercount/followingfollowercount",
    async(logid)=>{
        const reponse=await axios.post(`${ip}/followingfollowercount`,{logid:logid})
        return reponse.data
    }
)

const followingfollowercountSlice=createSlice({
    name:'followingfollowercount',
    initialState:{
        followerloading:false,
        followersuccess:false,
        followercount:0,
        followingcount:0,
        followerdata:[],
        followingdata:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(followingfollowercount.fulfilled,(state,action)=>{
            state.followerloading=false
            state.followersuccess=true
             state.followercount=action.payload.followercount
            state.followingcount=action.payload.followingcount
            state.followerdata=action.payload.followerdata
            state.followingdata=action.payload.followingdata

        })
        .addCase(followingfollowercount.pending,(state)=>{
            state.followerloading=true
        })
    }
})

const followingfollowercountreducer=followingfollowercountSlice.reducer

export default followingfollowercountreducer