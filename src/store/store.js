import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import NotificationsSlice from "./NotificationsSlice";
import TicketsSlice from "./TicketsSlice";

export const store = configureStore({
  reducer: {
    UserInfo: UserSlice,
    NotificationsData: NotificationsSlice,
    Tickets: TicketsSlice,
  },
});
