import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialInterface {
  alerts: string | any;
  messages: string | any;
}

const initialState: InitialInterface = {
  alerts: [],
  messages: [],
};

const NotificationsSlice = createSlice({
  name: "NotificationsData",
  initialState,
  reducers: {
    updateAlert: (state, action: PayloadAction<string[] | any[]>) => {
      state.alerts = action.payload;
    },
    setMessages: (state, action: PayloadAction<string[] | any[]>) => {
      state.messages = action.payload;
    },
  },
});
export const { updateAlert, setMessages } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
