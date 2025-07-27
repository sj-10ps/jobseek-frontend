import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";


export const uploadskills = createAsyncThunk(
  "skills/uploadskills",
  async (formdata) => {
    const response = await axios.post(`${ip}/uploadskills`, formdata);
    return response.data;
  }
);

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    loading: false,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadskills.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(uploadskills.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      });
  },
});

export default skillsSlice.reducer;
