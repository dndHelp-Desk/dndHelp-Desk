import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import noDataImg from "./../images/no-notifications.svg";
import { HiOutlineX } from "react-icons/hi";
import useClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";
import { deleteNotification } from "../../Data_Fetching/TicketsnUserData";
import { setUnread } from "../../../Redux/Slices/Tickets_n_Settings_Slice";
import { RootState } from "../../../Redux/store";

interface Props {
  openNotifications: boolean;
  setOpenNotification: (openNotifications: boolean) => any;
}

const Notification: FC<Props> = ({
  openNotifications,
  setOpenNotification,
}) => {
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const unread = useSelector((state: RootState) => state.Tickets.unread);
  const notificationMsgs = useSelector(
    (state: RootState) => state.NotificationsData.messages
  );
  const dispatch = useDispatch();
  const panelRef = useClickOutside(() => {
    setOpenNotification(false);
  });

  //loop through Notications List =============================
  const notificationList =
    notificationMsgs.length >= 1 &&
    notificationMsgs.map((notif: any) => {
      return (
        <div
          key={notif.id}
          className="w-full rounded dark:bg-slate-700 bg-slate-50 p-2 border dark:border-slate-600 border-slate-400 dark:text-slate-300 text-slate-800 space-y-2 relative"
        >
          <h4 className="dark text-sm font-semibold">{notif.title}</h4>
          <p className="dark text-xs font-base whitespace-pre-line">
            {notif.message}.
          </p>
          <small className="dark text-[0.6rem] font-semibold text-left dark:text-slate-400 text-slate-700">
            {new Date(notif.date).toLocaleString()}
          </small>
          {/**Delete Notification */}
          <button
            onClick={() => deleteNotification(notif.id, user[0].id)}
            className="absolute top-1 right-1 h-4 w-4 rounded-full dark:bg-slate-800 bg-slate-400 dark:text-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center hover:opacity-75 outline-none focus:outline-none"
          >
            <HiOutlineX />
          </button>
        </div>
      );
    });

  //loop through Unread Messages List =============================
  const unreadMsg =
    unread.length >= 1 &&
    unread.map((msg: any) => {
      return (
        <div
          key={msg.id}
          className="w-full rounded dark:bg-slate-700 bg-slate-50 p-2 px-4 border dark:border-slate-600 border-slate-400 dark:text-slate-300 text-slate-800 space-y-1 relative"
        >
          <h4 className="dark text-xs uppercase font-bold">
            You have a new message !
          </h4>
          <p className="dark text-xs font-base">
            <strong>Ticket ID:</strong> <span>{msg.ticket_id}</span>
          </p>

          <p className="dark text-[0.6rem] font-semibold text-left dark:text-slate-400 text-slate-700">
            {new Date(msg.date).toLocaleString()}
          </p>
          {/**Delete Notification */}
          <button
            onClick={() =>
              dispatch(
                setUnread(
                  unread.filter((message: any) => message.id !== msg.id)
                )
              )
            }
            className="absolute top-1 right-1 h-4 w-4 rounded-full dark:bg-slate-800 bg-slate-400 dark:text-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center hover:opacity-75 outline-none focus:outline-none"
          >
            <HiOutlineX />
          </button>
        </div>
      );
    });

  //Component =========================
  return (
    <div
      role="banner"
      ref={panelRef}
      className={`h-[30rem] w-[23rem] z-[999] transition-all duration-500 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300  flex-col items-center pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl rounded-lg p-2 absolute right-2 top-[4.2rem] after:content-[''] after:absolute after:right-[5.5rem] after:top-[-0.8rem] after:h-6 after:w-6 after:rotate-45 after:bg-inherit after:border-t  after:border-l after:border-inherit ${
        openNotifications === true ? "flex" : "hidden"
      }`}
    >
      <header className="w-full">
        <h1 className="text-center text-sm dark:text-slate-400 text-slate-900 font-bold uppercase">
          Notifications
        </h1>
      </header>
      <div className="h-full w-full overflow-x-hidden overflow-y-scroll space-y-2 p-2">
        {notificationMsgs.length <= 0 && unread.length <= 0 && (
          <div className="h-full w-full items-center flex flex-col justify-center space-y-4">
            <img
              src={noDataImg}
              alt=""
              className="h-2/4 w-[70%] object-center overflow-hidden"
            />
            <h2 className="text-xs text-center font-semibold dark:text-slate-300 text-slate-700 italic">
              Your notifications will appear here
            </h2>
          </div>
        )}
        {unreadMsg}
        {notificationList}
      </div>
    </div>
  );
};

export default Notification;
