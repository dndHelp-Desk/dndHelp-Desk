import React from "react";
import { useSelector } from "react-redux";
import noDataImg from "./../images/no-notifications.svg";
import useClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";

const Notification = ({ openNotifications, setOpenNotification }) => {
  const panelRef = useClickOutside(() => {
    setOpenNotification(false);
  });
  const notificationMsgs = useSelector(
    (state) => state.NotificationsData.messages
  );
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const newReplies = allTickets.filter(
      (ticket) => ticket.readStatus !== "read" && ticket.from !== "agent"
    );

  //loop through Notications List =============================
  const notificationList =
    newReplies.length >= 1 &&
    newReplies.map((notif, index) => {
      return (
        <div
          key={index}
          className="w-full rounded-xl dark:bg-slate-700 bg-slate-200 p-2 border dark:border-slate-600 border-slate-400 dark:text-slate-300 text-slate-800"
        >
          <h4 className="dark text-sm font-semibold text-center">
            {notif.notification}
          </h4>
          <p className="dark text-xs font-base">
            {`There's a new response from ticket with ticket ID: ${notif.ticket_id}.`}
          </p>
          <small className="dark text-xs font-semibold text-left dark:text-slate-400 text-slate-700">
            {new Date(notif.date).toDateString()} | {notif.time}
          </small>
        </div>
      );
    });

  //Component =========================
  return (
    <div
      ref={panelRef}
      className={`h-[20rem] w-[15rem] dark:bg-slate-800 bg-white shadow-2xl rounded-lg p-4 absolute right-2 top-16 after:content-[''] after:fixed after:top-[3.5rem] after:right-[7rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-slate-800 after:border-b-white after:border-l-transparent flex-col items-center space-y-2 overflow-x-hidden overflow-y-scroll lg:border-t dark:border-slate-800 border-slate-300 pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap ${
        openNotifications === true ? "flex" : "hidden"
      }`}
    >
      {notificationMsgs.length <= 0 && newReplies.length <= 0 && (
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
  );
};

export default Notification;
