import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import noDataImg from "./images/no-notifications.svg";
import {
  HiOutlineX,
  HiAdjustments,
  HiOutlineChatAlt2,
  HiOutlineBell,
} from "react-icons/hi";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import { deleteNotification } from "../../Adapters/Data_Fetching/TicketsnUserData";
import { setUnread } from "../../Redux/Slices/Tickets_n_Settings_Slice";
import { RootState } from "../../Redux/store";

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
          className="w-full rounded dark:bg-slate-900 bg-slate-50 p-2 border dark:border-slate-600 border-slate-400 dark:text-slate-300 text-slate-800 space-y-1 relative tracking-normal flex space-x-2 items-center"
        >
          <div className="h-[32px] w-[32px] max-w-[32px] flex-[2] rounded-full flex justify-center items-center border border-indigo-600 text-indigo-600">
            <HiOutlineBell />
          </div>
          <p className="dark text-xs font-base  flex-[11]">
            <strong>{notif.title}</strong> <br />
            <p>{notif.message}.</p>
            <p className="dark text-[0.6rem] font-semibold text-left dark:text-slate-500 text-slate-500">
              {new Date(notif.date).toLocaleString()}
            </p>
          </p>

          {/**Delete Notification */}
          <button
            onClick={() => deleteNotification(notif.id, user[0].id)}
            className="absolute top-1 right-1 h-4 w-4 rounded-full dark:bg-slate-800 bg-slate-300 dark:text-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center hover:opacity-75 outline-none focus:outline-none border border-slate-800 dark:border-slate-400"
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
          className="w-full rounded dark:bg-slate-900 bg-slate-50 p-2 border dark:border-slate-600 border-slate-400 dark:text-slate-300 text-slate-800 space-y-1 relative tracking-normal flex space-x-2 items-center"
        >
          <div className="h-[32px] w-[32px] max-w-[32px] flex-[2] rounded-full flex justify-center items-center border border-indigo-600 text-indigo-600">
            <HiOutlineChatAlt2 />
          </div>
          <p className="dark text-xs font-base flex-[11]">
            <strong>Conversation with Ticket-ID :</strong>{" "}
            <span className="font-semibold text-indigo-600">{msg.ticket_id}</span>{" "}
            has been updated.
            <p className="dark text-[0.6rem] font-semibold text-left dark:text-slate-500 text-slate-500">
              {new Date(msg.date).toLocaleString()}
            </p>
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
            className="absolute top-1 right-1 h-4 w-4 rounded-full dark:bg-slate-800 bg-slate-300 dark:text-slate-300 text-slate-800 text-xs font-bold flex items-center justify-center hover:opacity-75 outline-none focus:outline-none border border-slate-800 dark:border-slate-400"
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
      className={`h-[30rem] w-[23rem] z-[999] transition-all duration-500 dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300  flex-col items-center pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl rounded p-2 absolute right-2 top-[3.5rem] after:content-[''] after:absolute after:right-[4rem] after:top-[-0.55rem] after:h-4 after:w-4 after:rotate-45 after:bg-inherit after:border-t  after:border-l after:border-inherit ${
        openNotifications === true ? "flex" : "hidden"
      }`}
    >
      <header className="w-full flex justify-between items-center py-2 border-b dark:border-slate-700 border-slate-300">
        <h1 className="text-xs dark:text-slate-400 text-slate-900 font-bold uppercase">
          Notifications
        </h1>
        <HiAdjustments className="text-lg dark:text-slate-400 text-slate-700 font-bold uppercase" />
      </header>
      <div className="mt-2 h-full w-full overflow-x-hidden overflow-y-scroll space-y-2 p-2">
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
