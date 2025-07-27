// redux/EducationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ip } from './ip';

export const    uploadeducation = createAsyncThunk(
  'education/certification',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${ip}/certification`, formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

const EducationSlice = createSlice({
  name: 'certificate',
  initialState: {
    loading: false,
    success: false,
    error: null,
    data: null,
  },
  reducers: {
    resetEducationState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadeducation.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadeducation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(uploadeducation.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetEducationState } = EducationSlice.actions;
export default EducationSlice.reducer;
