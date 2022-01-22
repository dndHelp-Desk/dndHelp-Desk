import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: { message: "", color: "bg-green-200" },
};

const NotificationsSlice = createSlice({
  name:"NotificationsData",
  initialState,
  reducers:{
    updateAlert:(state,action)=>{
      state.alert.message = action.payload.message
      state.alert.color = action.payload.color
    }
  }
})
 export const {updateAlert} = NotificationsSlice.actions

export default NotificationsSlice.reducer