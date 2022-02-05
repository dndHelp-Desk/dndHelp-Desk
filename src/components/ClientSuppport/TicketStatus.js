import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import Chat from "./Chat";
import { setThreadId, setThreadMessage } from "../../store/TicketsSlice";
import { useDispatch, useSelector } from "react-redux";

const TicketStatus = () => {
  const [inputValue, setValue] = useState("");
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  const threadId = useSelector((state) => state.Tickets.threadId);
  const frequentlyAsked = useSelector((state) => state.Tickets.frequentlyAsked);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  //Check If tickect Exists and obtain messages
  const check = (e) => {
    e.preventDefault();
    dispatch(setThreadId(inputValue));
  };

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

  //Frequenlty Asked Questions ========================
  const questions =
    frequentlyAsked.length >= 1 &&
    frequentlyAsked.map((question) => {
      return (
        <div
          key={question.id}
          className={`bg-slate-600 rounded-lg w-full mt-3 custom-shadow py-4 px-4 text-base font-semibold text-slate-200 flex flex-col justify-between snap_child col-span-1 h-fit ${
            question.question
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(search.toLowerCase().replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          }`}
        >
          <div className=" flex items-center">
            <h3 className="capitalize">{question.question}</h3>
          </div>
          <p className="text-sm font-medium border-t text-slate-300 border-slate-500 p-1 capitalize">
            {question.answer}
          </p>
        </div>
      );
    });

  //Components ==========================================
  return (
    <div
      className={` ${
        location.pathname === "/support" ? "flex" : "hidden"
      } w-full h-full overflow-hidden p-8 space-x-6`}
    >
      <div className="min-h-[500px] 2xl:h-[80%] w-full lg:w-[50%] min-w-[200px] rounded-lg p-4 overflow-hidden">
        <h2 className="text-2xl text-slate-600 font-sans font-bold text-center">
          Welcome back!
        </h2>
        <p className="capitalize text-xs text-center mt-[.5rem] text-slate-500">
          Enter Your Tickect ID to access the chat
        </p>
        <form
          onSubmit={(e) => check(e)}
          className="rounded-lg mt-[1rem] h-10 flex space-x-4 justify-center w-full"
        >
          <input
            type="text"
            name="tickect_id"
            id="tickect_id"
            placeholder="Enter Your Ticket ID  Here ..."
            autoComplete="off"
            className="rounded-md bg-slate-300 outline-none focus:outline-none focus:border-0 border-2 focus:ring-slate-600 text-slate-700 placeholder:text-sm h-full w-[20rem]"
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="h-full px-6 rounded-md bg-blue-700 text-slate-300 font-semibold uppercase text-sm w-[8rem] outline-none focus:outline-none focus:ring focus:border-400 transition-all duration-300 hover:bg-blue-800"
          >
            check
          </button>
        </form>
        <Chat />
      </div>

      {/**Frequantly Asked Questions =============================== */}
      <div className="min-h-[500px] 2xl:h-[80%] w-[50%] hidden lg:block rounded-lg p-4 overflow-hidden">
        <h2 className="text-2xl text-slate-600 font-sans font-semibold text-center underline">
          Frequently Asked Questions
        </h2>

        {/**Search ============================ */}
        <div className="flex bg-slate-300 w-[80%] m-auto h-10 rounded-lg items-center mt-10 justify-center relative">
          <BsSearch className="absolute left-3 text-slate-500 font-semibold" />
          <input
            className="w-full bg-transparent border-2 focus:border-0 rounded-lg pl-10 focus:outline-none outline-none text-slate-500 focus:ring focus:ring-slate-500 transition-h duration-300"
            type="search"
            placeholder="Quick Search ..."
            id="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        {/**Questions ================================== */}
        <div className="grid grid-cols-2 gap-4 py-3  overflow-y-scroll scroll-snap px-2 w-full max-h-[36.5rem]">
          {questions}
        </div>
      </div>
    </div>
  );
};

export default TicketStatus;
