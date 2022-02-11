import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsEnvelope } from "react-icons/bs";
import Filters from "./Filters";
import {
  changePriority,
  changeStatus,
} from "./../Data_Fetching/TicketsnUserData";
import { setThreadId } from "./../../store/TicketsSlice";
import MessageThread from "./MessageThread";

const TicketsList = ({ setModal, setDelete, deleteArray }) => {
  const dispatch = useDispatch();
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const [isChatOpen, setChat] = useState(false);
  const threadId = useSelector((state) => state.Tickets.threadId);

  //Loop Through Each Tickects =================
  const tickets =
    filteredTickets.length >= 1 &&
    filteredTickets.map((ticket) => {
      return (
        <div
          key={ticket.id}
          className={`w-full h-[5.5rem] snap_childTwo rounded-lg dark:bg-slate-800  ${ticket.ticket_id === threadId?"border-2 dark:border-slate-600 border-slate-400":""} bg-slate-200 p-2 space-x-2 overflow-hidden flex ${
            (ticket.status && ticket.status.toLowerCase() === "resolved") ||
            (ticket.status && ticket.status.toLowerCase() === "closed")
              ? "dark:opacity-60 opacity-70"
              : ""
          }`}
        >
          <div className="col-span-1 h-full xl:w-[7rem] flex justify-between space-x-2 items-center">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-blue-600 h-3 w-3 shadow-sm  focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer"
              name="mark"
              id="mark"
              checked={deleteArray.includes(ticket.id) === true ? true : false}
              onChange={(e) =>
                e.target.checked === true
                  ? setDelete([...deleteArray, ticket.id])
                  : setDelete(deleteArray.filter((data) => data !== ticket.id))
              }
            />
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl dark:bg-slate-700 bg-slate-500 hidden sm:flex lg:hidden xl:flex justify-center items-center">
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
            }}
            className="col-span-5 flex flex-col justify-center h-full w-full border-l-2 dark:border-slate-600 border-slate-400 px-2 py-1 cursor-pointer"
          >
            <h2 className="dark:text-slate-400 text-slate-500 text-base font-bold font-sans capitalize whitespace-nowrap">
              {ticket.category} {ticket.ticket_id}
            </h2>
            <h5 className="dark:text-slate-400 text-slate-500 text-xs tracking-wide font-base font-sans flex flex-col flex-wrap justify-center capitalize">
              <span className="">
                <BsEnvelope className="inline" /> {ticket.recipient_name}
              </span>{" "}
              <span className="flex lg:hidden 2xl:flex">{`${ticket.branch_company}`}</span>
            </h5>
          </div>
          <div className="col-span-5 float-right h-full w-[20rem] flex flex-col items-center justify-center space-y-1">
            <div className="w-[10rem] flex items-baseline justify-end">
              <span
                className={`text-green-600 ${
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
          <div className="w-full dark:bg-slate-800 bg-slate-200 rounded-full z-0 h-12 p-1">
            <Filters />
          </div>
          <div className="w-full h-full space-y-2 overflow-y-scroll border-t dark:border-slate-800 border-slate-300 pt-2 lg:no-scrollbar lg:no-scrollbar::-webkit-scrollbar scroll-snap pr-2 lg:pr-0">
            {tickets}
          </div>
        </div>
        <MessageThread isChatOpen={isChatOpen} setChat={setChat} />
      </div>
    </div>
  );
};

export default TicketsList;
