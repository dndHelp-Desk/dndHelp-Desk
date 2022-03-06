import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changePriority,
  changeStatus,
  reOpenTicket,
  markAsSeen,
} from "./../Data_Fetching/TicketsnUserData";
import {
  BsBookmarkCheck,
  BsBookmarkX,
  BsBookmark,
} from "react-icons/bs";
import { setThreadId } from "./../../store/TicketsSlice";
import MessageThread from "./MessageThread";
import { updateAlert } from "../../store/NotificationsSlice";
import Navbar from "./Navbar";

const TicketsList = ({ setDelete, deleteArray, setModal }) => {
  const dispatch = useDispatch();
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const filters = useSelector((state) => state.Tickets.filters);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const alerts = useSelector((state) => state.NotificationsData.alerts);
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
          //Filter Added Using Conditional Styling =============================
          className={`w-full h-[5.6rem]  border dark:border-slate-800 border-slate-300 relative rounded-tl-md rounded-bl-md dark:bg-[#1e293b9c]  ${
            ticket.ticket_id === threadId
              ? "border-r-2 dark:border-r-slate-500 border-r-slate-500"
              : ""
          } bg-slate-200 p-2 space-x-2  flex ${
            ticket.branch_company
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(filters.brand.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }
           ${
             ticket.ticket_id
               .toLowerCase()
               .replace(/\s/g, "")
               .includes(filters.ticket_id.toLowerCase().replace(/\s/g, "")) ===
             true
               ? ""
               : "hidden"
           } 
           ${
             ticket.agent_name
               .toLowerCase()
               .replace(/\s/g, "")
               .includes(filters.agent.toLowerCase().replace(/\s/g, "")) ===
             true
               ? ""
               : "hidden"
           } ${
            ticket.category
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(filters.category.toLowerCase().replace(/\s/g, "")) ===
            true
              ? ""
              : "hidden"
          }
          
          ${
            new Date(
              new Date(ticket.date).setDate(new Date(ticket.date).getDate() - 1)
            ).toISOString() >=
              new Date(
                filters.startDate !== null && filters.startDate
              ).toISOString() &&
            new Date(
              new Date(ticket.date).setDate(new Date(ticket.date).getDate() - 1)
            ).toISOString() <=
              new Date(
                filters.endDate !== null && filters.endDate
              ).toISOString()
              ? ""
              : "hidden"
          }`}
        >
          {/**Indicate The ticket is resolved ================*/}
          {ticket.status && ticket.status.toLowerCase() === "solved" && (
            <BsBookmarkCheck className="absolute left-4 top-0 flex justify-center items-center tracking-wide rounded-sm w-4 h-5 text-xs text-blue-500" />
          )}

          {/**Indicate The ticket that is not solved or  overdue ================*/}
          {new Date(ticket.due_date !== null && ticket.due_date).toISOString() >
            new Date().toISOString() &&
            ticket.status &&
            ticket.status.toLowerCase() !== "solved" && (
              <BsBookmark className="absolute left-4 top-0 flex justify-center items-center tracking-wide rounded-sm w-4 h-5 text-xs dark:text-slate-400 text-slate-500" />
            )}

          {/**Indicate The ticket that is  overdue ================*/}
          {new Date(
            ticket.due_date !== null && ticket.due_date
          ).toISOString() <= new Date().toISOString() &&
            ticket.status &&
            ticket.status.toLowerCase() !== "solved" && (
              <BsBookmarkX className="absolute left-4 top-0 flex justify-center items-center tracking-wide rounded-sm w-4 h-5 text-xs text-red-500" />
            )}

          {/**Indicate if it's new messsage ================*/}
          {ticketReadStatus.length >= 1 && (
            <div className="absolute left-8 top-1 flex justify-center items-center tracking-wide rounded-sm w-12 bg-blue-600 text-[0.6rem] text-slate-200">
              <span>New : {ticketReadStatus.length}</span>
            </div>
          )}

          {/**Mark or Unmark Ticket ========================================== */}
          <div className="col-span-1 h-full xl:w-[7rem] flex justify-between space-x-2 items-center">
            <input
              type="checkbox"
              className="rounded  text-blue-600 h-3 w-3 shadow-sm dark:border-slate-700 border-slate-500 dark:bg-slate-400 bg-slate-100 focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer"
              name="mark"
              id="mark"
              checked={
                deleteArray.includes(ticket.ticket_id) === true ? true : false
              }
              onChange={(e) =>
                e.target.checked === true
                  ? setDelete([...deleteArray, ticket.ticket_id])
                  : setDelete(
                      deleteArray.filter((data) => data !== ticket.ticket_id)
                    )
              }
            />
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl dark:bg-slate-800 bg-slate-300 flex lg:hidden xl:flex justify-center items-center border-2 dark:border-slate-600 border-slate-400">
              <abbr title={ticket.recipient_name}>
                <h4 className="dark:text-slate-300 text-slate-500 font-semibold text-xl">{`${
                  ticket.recipient_name && ticket.recipient_name.charAt(0)
                }`}</h4>
              </abbr>
            </div>
          </div>

          {/**Ticket Details ========================================== */}
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
            className="col-span-5 flex flex-col justify-center relative h-full w-full space-y-1 px-1 py-1 cursor-pointer"
          >
            <h2 className="dark:text-slate-300  text-slate-600 text-xs dark:font-semibold font-bold font-sans uppercase whitespace-nowrap">
              {ticket.category} : {ticket.ticket_id}
            </h2>
            <h5 className="dark:text-slate-400 text-slate-500 text-xs tracking-wide font-base font-sans flex flex-col space-y-1 flex-wrap justify-center capitalize">
              <span className="flex">{`${ticket.branch_company}`}</span>
            </h5>
            <small className="dark:text-slate-400 text-slate-500 text-xs">
              Due on {new Date(ticket.due_date).toDateString()}
            </small>
          </div>
          <div className="col-span-5 float-right h-full w-[20rem] hidden md:flex flex-col items-center justify-center space-y-1">
            {/**Ticket Priority ========================================== */}
            <div className="w-[10rem] flex items-baseline justify-end">
              {/**Change Ticket Priority ========================================== */}
              <select
                onChange={(e) => changePriority(ticket.id, e.target.value)}
                className="w-4/5 px-1 text-left bg-transparent border-0 focus:border-0 focus:ring-0 justify-between items-center flex dark:text-slate-400 text-xs text-slate-500 focus:outline-none outline-none capitalize"
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
            {/**Change Ticket Status ========================================== */}
            <div className="w-[10rem] flex items-baseline justify-end">
              <select
                onChange={(e) =>
                  e.target.value === "solved"
                    ? dispatch(
                        updateAlert([
                          ...alerts,
                          {
                            message: "Ticket couldn't resolve.",
                            color: "bg-yellow-200",
                          },
                        ])
                      )
                    : e.target.value === "reopened"
                    ? reOpenTicket(ticket.id, e.target.value, true)
                    : changeStatus(ticket.id, e.target.value)
                }
                className="w-4/5 px-1 text-left bg-transparent border-0 focus:border-0 focus:ring-0 justify-between items-center flex dark:text-slate-400 text-xs text-slate-500 focus:outline-none outline-none capitalize"
              >
                <option className="capitalize p-2" value="resolved">
                  {ticket.status}
                </option>
                <option className="capitalize" value="open">
                  open
                </option>
                <option className="capitalize" value="on hold">
                  on hold
                </option>
                <option className="capitalize p-2" value="solved">
                  solved
                </option>
                <option className="capitalize p-2" value="reopened">
                  reopened
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
      <div className="flex flex-col lg:flex-row dark:bg-slate-900 bg-slate-100 rounded-xl py-2 space-y-4 lg:space-y-0 lg:space-x-2 space-x-0 ralative">
        <div
          className={`w-full lg:w-[40%] h-[34rem] lg:h-[40rem] flex flex-col gap-2.5 pt-1 ${
            isChatOpen ? "hidden lg:flex lg:opacity-100 opacity-0" : ""
          }`}
        >
          <Navbar
            deleteArray={deleteArray}
            setDelete={setDelete}
            setModal={setModal}
          />
          <div className="w-full h-full space-y-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar pt-2 border-t border-slate-200 dark:border-slate-800">
            {tickets}
            {filteredTickets.length <= 0 && (
              <h2 className="font-semibold text-center mt-10 text-lg dark:text-slate-400 text-slate-500 tracking-wide hidden lg:flex flex-col">
                There are no tickets.
              </h2>
            )}
          </div>
        </div>
        <MessageThread isChatOpen={isChatOpen} setChat={setChat} />
      </div>
    </div>
  );
};

export default TicketsList;
