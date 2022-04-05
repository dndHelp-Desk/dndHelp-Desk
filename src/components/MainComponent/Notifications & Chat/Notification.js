import React from "react";
import { useSelector} from "react-redux";
import noDataImg from "./../images/no-notifications.svg";
import {HiOutlineX} from "react-icons/hi"
import useClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";
import { deleteNotification } from "../../Data_Fetching/TicketsnUserData";

const Notification = ({ openNotifications, setOpenNotification }) => {
  const panelRef = useClickOutside(() => {
    setOpenNotification(false);
  });
  const notificationMsgs = useSelector(
    (state) => state.NotificationsData.messages
  );
  const user = useSelector((state) => state.UserInfo.member_details);

  //loop through Notications List =============================
  const notificationList =
    notificationMsgs.length >= 1 &&
    notificationMsgs.map((notif) => {
      return (
        <div
          key={notif.id}
          className="w-full rounded-xl dark:bg-slate-700 bg-slate-200 p-2 border dark:border-slate-600 border-slate-400 dark:text-slate-300 text-slate-800 relative"
        >
          <h4 className="dark text-sm font-semibold">{notif.title}</h4>
          <p className="dark text-xs font-base">{notif.message}.</p>
          <small className="dark text-xs font-semibold text-left dark:text-slate-400 text-slate-700">
            {new Date(notif.date).toLocaleString()}
          </small>
          {/**Delete Notification */}
          <button
            onClick={() => deleteNotification(notif.id,user[0].id)}
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
      className={`h-[20rem] w-[18rem] z-[999] dark:bg-slate-700 bg-white border dark:border-slate-700 border-slate-300  flex-col items-center pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap shadow-2xl rounded-lg p-2 fixed right-4 top-[4.2rem] after:content-[''] after:absolute after:right-[5.5rem] after:top-[-0.8rem] after:h-6 after:w-6 after:rotate-45 after:bg-inherit after:border-t  after:border-l after:border-inherit ${
        openNotifications === true ? "flex" : "hidden"
      }`}
    >
      <div className="h-full w-full overflow-x-hidden overflow-y-scroll space-y-2 p-2">
        {notificationMsgs.length <= 0 && (
          <div className="h-full w-full items-center flex flex-col justify-center space-y-4">
            <img
              src={noDataImg}
              alt=""
              className="h-2/4 w-[70%] object-center overflow-hidden"
            />
            <h2 className="text-xs text-center font-semibold dark:text-slate-300 text-slate-700">
              You Have No New Notifications
            </h2>
          </div>
        )}
        {notificationList}
      </div>
    </div>
  );
};

export default Notification;
