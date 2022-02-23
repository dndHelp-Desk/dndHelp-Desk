import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: { message: "", color: "bg-green-200" },
  messages:[]
};

const NotificationsSlice = createSlice({
  name:"NotificationsData",
  initialState,
  reducers:{
    updateAlert:(state,action)=>{
      state.alert.message = action.payload.message
      state.alert.color = action.payload.color
    },
    setMessages:(state,action)=>{
      state.messages = [...state.messages,action.payload]
    }
  }
})
 export const { updateAlert, setMessages } = NotificationsSlice.actions;

export default NotificationsSlice.reducer