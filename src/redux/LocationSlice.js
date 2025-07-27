import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: "/",
    id:null,
    deletion:false
  },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
    setid:(state,action)=>{
        state.id=action.payload
    },
    setdeletion:(state,action)=>{
      state.deletion=action.payload
    }
  },
});

export const { setLocation ,setid ,setdeletion} = locationSlice.actions;
export default locationSlice.reducer;
