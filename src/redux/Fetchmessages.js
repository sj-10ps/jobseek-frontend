import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip } from "./ip";

// 🔁 Fetch list of message senders (you already have this)
export const fetchmessagesenders = createAsyncThunk(
  "fetchmessage/fetchmessagesenders",
  async (id) => {
    const response = await axios.get(`${ip}/fetchmessagesenders/${id}`);
    return response.data;
  }
);

// 📥 Fetch conversation between two users
export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async ({ senderId, receiverId }) => {
    const response = await axios.get(`${ip}/messages/${senderId}/${receiverId}`);
    return response.data;
  }
);

// 📤 Send a message
export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async ({ senderId, receiverId, text }) => {
    const response = await axios.post(`${ip}/messagespost`, { senderId, receiverId, text });
    return response.data;
  }
);

// 🧠 Redux Slice
const messageslice = createSlice({
  name: 'messages',
  initialState: {
    message: [],
    messagesenders: [],
    messageloading: false,
    messagesuccess: false,
    messagesending: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔁 Fetch message senders
      .addCase(fetchmessagesenders.pending, (state) => {
        state.messageloading = true;
        state.messagesuccess = false;
      })
      .addCase(fetchmessagesenders.fulfilled, (state, action) => {
        state.messageloading = false;
        state.messagesuccess = true;
        state.messagesenders = action.payload.data;
      })

      // 📥 Fetch messages between two users
      .addCase(fetchMessages.pending, (state) => {
        state.messageloading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messageloading = false;
        state.message = action.payload.data; // message list
      })

      // 📤 Send message
      .addCase(sendMessage.pending, (state) => {
        state.messagesending = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messagesending = false;
        state.messagesuccess = true;
        // optionally you could push the message locally if response returns it
      });
  },
});

const messagereducer = messageslice.reducer;
export default messagereducer;
