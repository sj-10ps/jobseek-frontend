import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { ip } from "./ip"
import { createSlice } from "@reduxjs/toolkit"


export const forgot=createAsyncThunk(
    "login/loginforgot",
    async(formdata)=>{

        const response=await axios.post(`${ip}/forgotpassword`,formdata)
        return response.data
    }
)

const forgotslice=createSlice({
    name:"forgot",
    initialState:{
       loading:false,
        success:true,
        status:null,
        userinfo:null   
    },
    reducers:{},
    extraReducers:(builder)=>{
    builder
        .addCase(forgot.pending,(state,action)=>{
        state.loading=true
        state.success=false
        state.status=null
        })
        .addCase(forgot.fulfilled,(state,action)=>{
            state.loading=false
            state.success=action.payload.status==="ok"
            state.status=action.payload.status
            state.userinfo={
                userid:action.payload.userId,
                usertype:action.payload.usertype
            }

      
        })
    }


})

export default forgotslice.reducer
