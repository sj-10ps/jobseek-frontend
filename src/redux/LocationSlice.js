import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    value: "/userhome",
    id:null
  },
  reducers: {
    setLocation: (state, action) => {
      state.value = action.payload;
    },
    setid:(state,action)=>{
        state.id=action.payload
    }
  },
});

export const { setLocation ,setid } = locationSlice.actions;
export default locationSlice.reducer;
