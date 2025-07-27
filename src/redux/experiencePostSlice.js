import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";


export const uploadexperience = createAsyncThunk(
  "uploadexperience/uploadexperiencedetails",
  async (formdata) => {
    const response = await axios.post(`${ip}/uploadexperiencedetails`, formdata);
    return response.data;
  }
);


const Experienceslice = createSlice({
  name: "experience",
  initialState: {
    loading: false,
    success: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadexperience.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(uploadexperience.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      });
  },
});

export default Experienceslice.reducer;
