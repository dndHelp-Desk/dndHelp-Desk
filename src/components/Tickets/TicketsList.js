import React from "react";
import { useSelector } from "react-redux";
import {
  BsEnvelope,
  BsPencilSquare,
} from "react-icons/bs";
import placeHolderImg from "./images/email-open.png";

const TicketsList = ({ searchResults }) => {
  let allTickets = useSelector((state) => state.Tickets.allTickets);

  //Loop Through Each Tickects =================
  const tickets =
    allTickets.length >= 1 &&
    allTickets.map((ticket, index) => {
      return (
        <div
          key={ticket.id}
          className={`w-full border-l-2 ${
            ((ticket.recipient_name).toLowerCase()).includes(searchResults.toLowerCase()) === true
              ? "flex"
              : "hidden"
          } ${
            ticket.priority.toLowerCase().trim() === "low"
              ? "border-green-500"
              : ticket.priority.toLowerCase().trim() === "medium"
              ? "border-blue-600"
              : ticket.priority.toLowerCase().trim() === "high"
              ? "border-yellow-400"
              : "border-red-600"
          } h-[5rem] snap_childTwo rounded-lg bg-slate-900 p-3 space-x-2 overflow-hidden`}
        >
          <div className="col-span-1 h-full md:w-[7rem] flex justify-between px-1 items-center">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-blue-600 h-3 w-3 shadow-sm  focus:border-blue-500 focus:ring focus:ring-offset-0 focus:ring-blue-600 focus:ring-opacity-50"
              name=""
              id=""
            />
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-lg bg-slate-500 hidden md:flex justify-center items-center">
              <h4 className="text-slate-300 font-semibold text-xl">{`${ticket.recipient_name.charAt(
                0
              )}`}</h4>
            </div>
          </div>
          <div className="col-span-5  h-full w-full border-l-2 border-slate-600 px-2 py-1 overflow-hidden">
            <h2 className="text-slate-300 text-base font-bold font-sans capitalize">
              {ticket.category} <span>#{index + 1}</span>
            </h2>
            <h5 className="text-slate-400 max-w-[26rem] whitespace-nowrap overflow-hidden overflow-ellipsis text-xs tracking-wide font-base font-sans flex items-center space-x-1 capitalize">
              <BsEnvelope className="inline" />{" "}
              <span className="">{ticket.recipient_name}</span>{" "}
              <span>{`(${ticket.branch_company})`} •</span>
              <small className="tracking-widest">{`Created on ${new Date(
                ticket.date
              ).toDateString()}`}</small>
            </h5>
          </div>
          <div className="col-span-5 hidden float-right h-full md:flex flex-col items-center justify-center space-y-1">
            <button className="text-xl w-[2rem] px-1 text-left justify-between items-center flex text-slate-400 focus:outline-none outline-none capitalize">
              <BsPencilSquare />
            </button>
          </div>
        </div>
      );
    });

  //Component ======================================
  return (
    <div className="p-1 space-y-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap">
      {/**Do DataPlaceholder  ==========================  */}
      {allTickets.length <= 0 && (
        <div className="bg-slate-900 min-h-[35rem] max-h-[40rem] w-full rounded-lg p-12 flex items-center justify-center">
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
            <button className="bg-blue-600 rounded-full px-6 py-2 text-slate-300 capitalize font-semibold text-sm tracking-wide">
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
