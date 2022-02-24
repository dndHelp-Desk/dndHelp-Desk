import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Filters from "./Filters";
import {
  changePriority,
  changeStatus,
  markAsSeen,
} from "./../Data_Fetching/TicketsnUserData";
import { setThreadId } from "./../../store/TicketsSlice";
import MessageThread from "./MessageThread";

const TicketsList = ({ setDelete, deleteArray }) => {
  const dispatch = useDispatch();
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const user = useSelector((state) => state.UserInfo.member_details);
  const [isChatOpen, setChat] = useState(false);
  const threadId = useSelector((state) => state.Tickets.threadId);

  //Loop Through Each Tickects =================
  const tickets =
    filteredTickets.length >= 1 &&
    filteredTickets.map((ticket) => {
      /**Unread Meassages ================= */
      let ticketReadStatus =
        allTickets.length >= 1 &&
        allTickets.filter(
          (message) =>
            message.ticket_id === ticket.ticket_id &&
            message.readStatus !== "read" &&
            message.from !== "agent"
        );

      /**Mark As read if thread is Active ========== */
      threadId === ticket.ticket_id &&
        ticketReadStatus.length >= 1 &&
        ticketReadStatus.forEach((message) => {
          markAsSeen(message.id, "read");
        });
      /**End ========== */

      return (
        <div
          key={ticket.id}
          className={`w-full h-[5.7rem] relative ${
            user[0].access === "agent" && ticket.agent_email === user[0].email
              ? ""
              : user[0].access === "admin"
              ? ""
              : "hidden"
          } snap_childTwo custom-shadow rounded-lg dark:bg-slate-800  ${
            ticket.ticket_id === threadId
              ? "border-[1px] dark:border-slate-600 border-slate-400"
              : ""
          } bg-slate-200 p-2 space-x-2  flex ${
            (ticket.status && ticket.status.toLowerCase() === "resolved") ||
            (ticket.status && ticket.status.toLowerCase() === "closed")
              ? "dark:opacity-60 opacity-70"
              : ""
          }`}
        >
          {/**Indicate if it's new messsage */}
          {ticketReadStatus.length >= 1 && (
            <div className="absolute left-8 top-1 flex justify-center items-center tracking-wide rounded-sm w-12 bg-blue-600 text-[0.6rem] text-slate-200">
              <span>New : {ticketReadStatus.length}</span>
            </div>
          )}
          {/**End Of Indicate if it's new messsage */}

          <div className="col-span-1 h-full xl:w-[7rem] flex justify-between space-x-2 items-center">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-blue-600 h-3 w-3 shadow-sm  focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer"
              name="mark"
              id="mark"
              checked={deleteArray.includes(ticket.ticket_id) === true ? true : false}
              onChange={(e) =>
                e.target.checked === true
                  ? setDelete([...deleteArray, ticket.ticket_id])
                  : setDelete(deleteArray.filter((data) => data !== ticket.ticket_id))
              }
            />
            <div
              className={`h-8 w-8 lg:h-10 lg:w-10 rounded-xl ${
                new Date(
                  ticket.due_date !== null && ticket.due_date
                ).toISOString() <= new Date().toISOString()
                  ? "border border-red-500"
                  : ""
              } dark:bg-slate-700 bg-slate-500 flex lg:hidden xl:flex justify-center items-center`}
            >
              <abbr title={ticket.recipient_name}>
                <h4 className="text-slate-300 font-semibold text-xl">{`${
                  ticket.recipient_name && ticket.recipient_name.charAt(0)
                }`}</h4>
              </abbr>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setThreadId(ticket.ticket_id));
              window.localStorage.setItem("threadId", JSON.stringify(threadId));
              setChat(true);
              ticketReadStatus.length >= 1 &&
                ticketReadStatus.forEach((message) => {
                  markAsSeen(message.id, "read");
                });
            }}
            className="col-span-5 flex flex-col justify-center h-full w-full px-1 py-1 cursor-pointer"
          >
            <h2 className="dark:text-slate-400 text-slate-500 text-base font-bold font-sans capitalize whitespace-nowrap">
              {ticket.category} {ticket.ticket_id}
            </h2>
            <h5 className="dark:text-slate-400 text-slate-500 text-xs tracking-wide font-base font-sans flex flex-col space-y-1 flex-wrap justify-center capitalize">
              <span className="flex">{`${ticket.branch_company}`}</span>
              <span className="dark:text-slate-500 text-xs text-slate-400">
                Due on {new Date(ticket.due_date).toDateString()}
              </span>
            </h5>
          </div>
          <div className="col-span-5 float-right h-full w-[20rem] hidden md:flex flex-col items-center justify-center space-y-1">
            <div className="w-[10rem] flex items-baseline justify-end">
              <span
                className={`${
                  ticket.priority &&
                  ticket.priority.toLowerCase().trim() === "low"
                    ? "text-green-500"
                    : ticket.priority &&
                      ticket.priority.toLowerCase().trim() === "medium"
                    ? "text-blue-600"
                    : ticket.priority &&
                      ticket.priority.toLowerCase().trim() === "high"
                    ? "text-yellow-500"
                    : "text-red-600"
                }`}
              >
                ■
              </span>{" "}
              <select
                onChange={(e) => changePriority(ticket.id, e.target.value)}
                className="text-xs w-4/5 px-1 text-left bg-transparent border-0 focus:border-0 focus:ring-0 justify-between items-center flex dark:text-slate-400 text-slate-500 focus:outline-none outline-none capitalize"
              >
                <option className="capitalize p-2" value="low">
                  {ticket.priority}
                </option>
                <option className="capitalize p-2" value="low">
                  Low
                </option>
                <option className="capitalize" value="medium">
                  Medium
                </option>
                <option className="capitalize" value="high">
                  High
                </option>
                <option className="capitalize" value="urgent">
                  Urgent
                </option>
              </select>
            </div>
            <div className="w-[10rem] flex items-baseline justify-end">
              <span className="dark:text-slate-400 text-slate-500">↝</span>{" "}
              <select
                onChange={(e) => changeStatus(ticket.id, e.target.value)}
                className="text-xs w-4/5 px-1 text-left bg-transparent border-0 focus:border-0 focus:ring-0 justify-between items-center flex dark:text-slate-400 text-slate-500 focus:outline-none outline-none capitalize"
              >
                <option className="capitalize p-2" value="resolved">
                  {ticket.status}
                </option>
                <option className="capitalize p-2" value="resolved">
                  resolved
                </option>
                <option className="capitalize" value="open">
                  open
                </option>
                <option className="capitalize" value="closed">
                  closed
                </option>
                <option className="capitalize" value="pending">
                  pending
                </option>
              </select>
            </div>
          </div>
        </div>
      );
    });

  //Component ======================================
  return (
    <div className="relative">
      {/**Tickets ========================================== */}
      <div className="flex flex-col lg:flex-row dark:bg-slate-900 bg-slate-100 rounded-xl p-2 space-y-4 lg:space-y-0 lg:space-x-2 space-x-0 ralative">
        <div
          className={`w-full lg:w-[40%] h-[34rem] lg:h-[40rem] flex flex-col gap-2.5 ${
            isChatOpen ? "hidden lg:flex lg:opacity-100 opacity-0" : ""
          }`}
        >
          <div className="w-full dark:bg-slate-800 bg-slate-200 rounded-lg z-0 h-12 p-1">
            <Filters />
          </div>
          <div className="w-full h-full space-y-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar lg:border-t dark:border-slate-800 border-slate-300 pt-3 scroll-snap">
            {tickets}
          </div>
        </div>
        <MessageThread isChatOpen={isChatOpen} setChat={setChat} />
      </div>
    </div>
  );
};

export default TicketsList;
