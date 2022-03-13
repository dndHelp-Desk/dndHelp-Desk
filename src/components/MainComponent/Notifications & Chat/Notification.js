import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import noDataImg from "./../images/no-notifications.svg";
import useClickOutside from "../../../Custom-Hooks/useOnClickOutsideRef";
import { setMessages } from "../../../store/NotificationsSlice";

const Notification = ({ openNotifications, setOpenNotification }) => {
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const user = useSelector((state) => state.UserInfo.member_details);
  const dispatch = useDispatch();
  const panelRef = useClickOutside(() => {
    setOpenNotification(false);
  });
  const notificationMsgs = useSelector(
    (state) => state.NotificationsData.messages
  );

  //Check For New Response ==============================

/* useEffect(() => {
    //Check For New Responses =============================
    allTickets
      .filter(
        (ticket) =>
          ticket.readStatus !== "read" &&
          ticket.from !== "agent" &&
          ticket.agent_name === user[0].email &&
          user[0].access === "agent"
      )
      ?.forEach((element) => {
        dispatch(
          setMessages([
            ...notificationMsgs,
            {
              title: "New Response",
              message: `There is a new repsonse from ${element.user} regarding case with ticket-Id: ${element.ticket_id}`,
              date: `${element.date}`,
            },
          ])
        );
      });

    //Check For New Responses =============================
    allTickets
      .filter(
        (ticket) =>
          ticket.readStatus !== "read" &&
          ticket.from !== "client" &&
          ticket.recipient_email === user[0].email &&
          user[0].access === "client"
      )
      ?.forEach((element) => {
        dispatch(
          setMessages([
            ...notificationMsgs,
            {
              title: "New Response",
              message: `There is a new repsonse from ${element.user} regarding case with ticket-Id: ${element.ticket_id}`,
              date: `${element.date}`,
            },
          ])
        );
      });

    //Check For Assigned Tickets ==============================
    allTickets
      .filter(
        (ticket) =>
          ticket.assigned === true &&
          ticket.assignee_ReadStatus === "not read" &&
        ticket.agent_email === user[0].email
      )?.forEach((element) => {
        dispatch(
          setMessages([
            ...notificationMsgs,
            {
              title: `You've got a new Ticket`,
              message: `You've been sssigned a ticket with id: ${element.ticket_id} by:${element.assigner}`,
              date: `${element.date}`,
            },
          ])
        );
      });
  });*/

  //loop through Notications List =============================
  const notificationList =
    notificationMsgs.length >= 1 &&
    notificationMsgs.map((notif, index) => {
      return (
        <div
          key={index}
          className="w-full rounded-xl dark:bg-slate-700 bg-slate-200 p-2 border dark:border-slate-600 border-slate-400 dark:text-slate-300 text-slate-800"
        >
          <h4 className="dark text-sm font-semibold text-center">
            {notif.title}
          </h4>
          <p className="dark text-xs font-base">{notif.message}.</p>
          <small className="dark text-xs font-semibold text-left dark:text-slate-400 text-slate-700">
            {new Date(notif.date).toDateString()}
          </small>
        </div>
      );
    });

  //Component =========================
  return (
    <div
      ref={panelRef}
      className={`h-[20rem] w-[15rem] z-[999] dark:bg-slate-800 bg-white shadow-2xl rounded-lg p-2 absolute right-2 top-16 after:content-[''] after:fixed after:top-[3.5rem] after:right-[7rem] after:mt-[-15px] after:border-[12px] after:border-t-transparent after:border-r-transparent dark:after:border-b-slate-800 after:border-b-white after:border-l-transparent flex-col items-center lg:border-t dark:border-slate-800 border-slate-300 pt-3 no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap overflow-hidden ${
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
