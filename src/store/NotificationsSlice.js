import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
  messages: [],
};

const NotificationsSlice = createSlice({
  name:"NotificationsData",
  initialState,
  reducers:{
    updateAlert:(state,action)=>{
      state.alerts = action.payload
    },
    setMessages:(state,action)=>{
      state.messages = [...state.messages,action.payload]
    }
  }
})
 export const { updateAlert, setMessages } = NotificationsSlice.actions;

export default NotificationsSlice.reducer