import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";


export const selectedusers = createAsyncThunk(
  "selectedusers/selectedusers",
  async (comid) => {
    const response = await axios.post(`${ip}/selecteduserstotext`, {comid});
    return response.data;
  }
);

const selecteduserslice = createSlice({
  name: "selectedusers",
  initialState: {
    selectedsuccess: false,
    selectedloading: false,
    selecteddata:[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(selectedusers.pending, (state) => {
        state.selectedsuccess = true;
        state.selectedsuccess = false;
      })
      .addCase(selectedusers.fulfilled, (state,action) => {
        state.selectedsuccess = false;
        state.selectedsuccess = true;
        state.selecteddata=action.payload.data
      });
  },
});

const selecteduserreducer=selecteduserslice.reducer
export default  selecteduserreducer;
