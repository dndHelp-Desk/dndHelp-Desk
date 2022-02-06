import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsEnvelope } from "react-icons/bs";
import placeHolderImg from "./images/email-open.png";
import {
  changePriority,
  changeStatus,
} from "./../Data_Fetching/TicketsnUserData";
import { setThreadId } from "./../../store/TicketsSlice";

const TicketsList = ({ searchResults, setModal, setDelete, deleteArray }) => {
  const dispatch = useDispatch();
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const threadId = useSelector((state) => state.Tickets.threadId);
  const activeUser = useSelector((state) => state.UserInfo.member_details);

  //Filter Message in a thread ============================
  const firstMessages =
    allTickets && activeUser[0].access !== "admin"
      ? allTickets.filter(
          (ticket) =>
            ticket.message_position === 1 &&
            ticket.agent_email === activeUser[0].email
        )
      : allTickets
      ? allTickets.filter((ticket) => ticket.message_position === 1)
      : "";

  //Loop Through Each Tickects =================
  const tickets =
    firstMessages.length >= 1 &&
    firstMessages.map((ticket, index) => {
      return (
        <div
          key={ticket.id}
          className={`w-full h-[5rem] snap_childTwo rounded-xl bg-slate-900 p-3 space-x-2 overflow-hidden ${
            ticket.recipient_name &&
            ticket.recipient_name
              .toLowerCase()
              .includes(searchResults.toLowerCase()) === true
              ? "flex"
              : "hidden"
          } ${
            (ticket.status && ticket.status.toLowerCase() === "resolved") ||
            (ticket.status && ticket.status.toLowerCase() === "closed")
              ? "opacity-90"
              : ""
          }`}
        >
          <div className="col-span-1 h-full md:w-[7rem] flex justify-between px-1 items-center">
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
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-xl bg-slate-500 hidden md:flex justify-center items-center">
              <abbr title={ticket.recipient_name}>
                <h4 className="text-slate-300 font-semibold text-xl">{`${
                  ticket.recipient_name && ticket.recipient_name.charAt(0)
                }`}</h4>
              </abbr>
            </div>
          </div>
          <Link
            to="/help-desk/thread"
            onClick={() => {
              dispatch(setThreadId(ticket.ticket_id));
              window.localStorage.setItem("threadId", JSON.stringify(threadId));
            }}
            className="col-span-5  h-full w-full border-l-2 border-slate-600 px-2 py-1"
          >
            <h2 className="text-slate-300 text-base font-bold font-sans capitalize">
              {ticket.category}{" "}
              <span className="text-slate-400 font-medium text-sm">
                {ticket.ticket_id}
              </span>
            </h2>
            <h5 className="text-slate-400 text-xs tracking-wide font-base font-sans flex items-center space-x-1 capitalize">
              <BsEnvelope className="inline" />{" "}
              <span className="">{ticket.recipient_name}</span>{" "}
              <span>{`(${ticket.branch_company})`} •</span>
              <small className="tracking-widest">{`Created on ${new Date(
                ticket.date
              ).toDateString()}`}</small>
            </h5>
          </Link>
          <div className="col-span-5 hidden float-right h-full w-[20rem] md:flex flex-col items-center justify-center space-y-1">
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
                className="text-xs w-4/5 px-1 text-left bg-transparent border-0 focus:border-0 focus:ring-0 justify-between items-center flex text-slate-400 focus:outline-none outline-none capitalize"
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
              <span className="text-slate-400">↝</span>{" "}
              <select
                onChange={(e) => changeStatus(ticket.id, e.target.value)}
                className="text-xs w-4/5 px-1 text-left bg-transparent border-0 focus:border-0 focus:ring-0 justify-between items-center flex text-slate-400 focus:outline-none outline-none capitalize"
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
    <div className="p-1 space-y-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap">
      {/**Do DataPlaceholder  ==========================  */}
      {allTickets.length <= 0 && (
        <div className="bg-slate-900 min-h-[35rem] max-h-[40rem] w-full rounded-xl p-12 flex items-center justify-center">
          <div className="h-[15rem] w-[15rem]">
            <img
              src={placeHolderImg}
              className="h-full w-full object-center object-contain"
              alt="no-tickects"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-slate-300 font-bold text-2xl capitalize font-sans">
              There Are no tickets to display
            </h2>
            <p className="text-base font-sans text-slate-400">
              A data search did not obtain any results.
              <br />
              Create a new ticket or change the date to see previous data.
              <br></br>
            </p>
            <button
              onClick={() => setModal(true)}
              className="bg-blue-600 focus:outline-none outline-none hover:opacity-80 transition-opacity duration-300 rounded-full px-6 py-2 text-slate-300 capitalize font-semibold text-sm tracking-wide"
            >
              new ticket
            </button>
          </div>
        </div>
      )}
      {/**Tickets ========================================== */}
      {tickets}
    </div>
  );
};

export default TicketsList;
