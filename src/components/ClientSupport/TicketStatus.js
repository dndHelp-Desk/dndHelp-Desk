import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chat from "./Chat";
import {BsSearch} from "react-icons/bs"
import { setThreadId, setThreadMessage} from "../../store/TicketsSlice";
import { useDispatch, useSelector } from "react-redux";
import {markAsSeen} from "./DataFetching"

const TicketStatus = () => {
  const [inputValue, setValue] = useState("");
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  const threadId = useSelector((state) => state.Tickets.threadId);
  const dispatch = useDispatch();
  const location = useLocation();

  //Check If tickect Exists and obtain messages
  const check = (e) => {
    e.preventDefault();
    dispatch(setThreadId(inputValue));
  };

  const newMessages =
    allTickets.length >= 1 &&
    allTickets.filter(
      (msg) => msg.from !== "client" && msg.readStatus !== "read" && msg.ticket_id === threadId
    );

    if(navigator.onLine && newMessages.length >= 1){
      newMessages.forEach(msg=>{
        markAsSeen(msg.id,"read")
      })
    }


  useEffect(() => {
    //Filter Thread Messages =====================================
    allTickets.length >= 1 &&
      dispatch(
        setThreadMessage(
          allTickets
            .filter((ticket) => ticket.ticket_id === threadId)
            .sort((a, b) => {
              return Number(a.message_position) - Number(b.message_position);
            })
        )
      );
  }, [dispatch, threadId, allTickets]);

  //Components ==========================================
  return (
    <div
      className={` ${
        location.pathname === "/support" ? "flex" : "hidden"
      } w-full h-full overflow-hidden p-2 md:p-6  justify-center`}
    >
      <div className="min-h-[500px] 2xl:h-[80%] flex flex-col items-center  w-[90%] md:w-full container 2xl:w-[72rem] min-w-[200px] rounded-lg overflow-hidden">
        <h2 className="text-2xl text-slate-600 font-sans font-bold text-center">
          Welcome back!
        </h2>
        <p className="capitalize text-xs text-center mt-[.5rem] text-slate-500">
          Enter Your Tickect ID to join the conversation
        </p>
        <form
          onSubmit={(e) => check(e)}
          className="rounded-lg mt-[1rem] min-h-10 items-center flex  md:space-y-0 space-x-4 sm:justify-center justify-between w-full"
        >
          <input
            type="text"
            name="tickect_id"
            id="tickect_id"
            placeholder="Enter Your Ticket ID  Here ..."
            autoComplete="off"
            className="rounded-md h-10 bg-slate-300 outline-none focus:outline-none focus:border-0 border-2 focus:ring-slate-600 text-slate-700 placeholder:text-sm lg:w-[20rem]"
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="h-10 px-3 md:px-6 flex items-center justify-center space-x-2 rounded-md bg-blue-700 text-slate-300 font-semibold uppercase text-sm md:w-[8rem] outline-none focus:outline-none focus:ring focus:border-400 transition-all duration-300 hover:bg-blue-800"
          >
            <BsSearch className="text-lg font-bold"/><span class="hidden sm:inline">join</span> 
          </button>
        </form>
        <Chat />
      </div>
    </div>
  );
};

export default TicketStatus;
