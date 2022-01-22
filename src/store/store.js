import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import NotificationsSlice from "./NotificationsSlice";

export const store = configureStore({
  reducer: {
    UserInfo: UserSlice,
    NotificationsData: NotificationsSlice,
  },
});
