import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import NotificationsSlice from "./NotificationsSlice";
import TicketsSlice from "./Tickets_n_Settings_Slice";

export const store = configureStore({
  reducer: {
    UserInfo: UserSlice,
    NotificationsData: NotificationsSlice,
    Tickets: TicketsSlice,
  },
});
