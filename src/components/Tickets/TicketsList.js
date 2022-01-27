import React from "react";
import { useSelector } from "react-redux";
import { BsEnvelope, BsChevronDown, BsPersonPlus } from "react-icons/bs";

const TicketsList = () => {
  let allTickects = useSelector((state) => state.Tickects.allTickects);

  //Loop Through Each Tickects =================
  const tickects =  allTickects.length >= 1 && allTickects.map((ticket,index)=>{
    return (
      <div
        key={ticket.id}
        className="w-full h-[5rem] snap_childTwo rounded-lg bg-slate-900 p-3 flex space-x-2 overflow-hidden"
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
        <div className="col-span-5  h-full w-full border-l-2 border-slate-600 px-2 py-1">
          <h2 className="text-slate-300 text-base font-bold font-sans capitalize">
            {ticket.category} <span>#{index + 1}</span>
          </h2>
          <h5 className="text-slate-400 text-xs tracking-wide font-base font-sans flex items-center space-x-1 capitalize">
            <BsEnvelope className="inline" />{" "}
            <span className="">{ticket.recipient_name}</span>{" "}
            <span>{`(${ticket.branch_company})`} •</span>
            <small className="tracking-widest">{`Created 2 Days Ago`}</small>
          </h5>
        </div>
        <div className="col-span-5 hidden float-right h-full w-[20rem] md:flex flex-col items-center justify-center space-y-1">
          <button className="text-xs w-[10rem] px-1 text-left justify-between items-center flex text-slate-400 focus:outline-none outline-none">
            <span>
              <span className="text-green-600">▣</span> {ticket.priority}
            </span>{" "}
            <BsChevronDown />
          </button>
          <button className="text-xs w-[10rem] px-1 text-left justify-between items-center flex text-slate-400 focus:outline-none outline-none">
            <span>⇨ {ticket.status}</span> <BsChevronDown />
          </button>
          <button className="text-xs w-[10rem] px-1 text-left justify-between items-center flex text-slate-400 focus:outline-none outline-none">
            <span className="flex items-center space-x-1">
              <BsPersonPlus className="inline" />
              <span>Assign</span>
            </span>{" "}
            <BsChevronDown />
          </button>
        </div>
      </div>
    );
  })

  //Component ======================================
  return (
    <div className="p-1 space-y-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar scroll-snap">
      {allTickects.length <= 0 && (
        <div className="bg-slate-900 min-h-[35rem] max-h-[40rem] w-full rounded-lg"></div>
      )}
      {tickects}
      {tickects}
      {tickects}
    </div>
  );
};

export default TicketsList;
