import UserSlice from "./Slices/UserSlice";
import NotificationsSlice from "./Slices/NotificationsSlice";
import TicketsSlice from "./Slices/Tickets_n_Settings_Slice";

const rootReducer = {
  UserInfo: UserSlice,
  NotificationsData: NotificationsSlice,
  Tickets: TicketsSlice,
};

export default rootReducer;
