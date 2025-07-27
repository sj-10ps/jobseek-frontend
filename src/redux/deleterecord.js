import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

export const deleterecord=createAsyncThunk(
    "deleterecord/deleteselectedrecord",
    async(formdata)=>{
        const response=await axios.post(`${ip}/deleteselectedrecord`,formdata)
        return response.data
    }
)

const deleterecordSlice = createSlice({
  name: 'deleterecord',
  initialState: {
    pending: false,
    success: false
  },

  reducers: {
    resetDeleteSuccess: (state) => {
      state.success = false;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleterecord.fulfilled, (state) => {
        state.pending = false;
        state.success = true;
      })
      .addCase(deleterecord.pending, (state) => {
        state.pending = true;
        state.success = false;
      });
  }
});
export const {resetDeleteSuccess}=deleterecordSlice.actions

export default deleterecordSlice.reducer