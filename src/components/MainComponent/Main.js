import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Businnes from "./images/businnes.jpg";
import {
  BsArrowRightShort,
  BsDashSquare,
  BsCheckAll,
  BsArrowRepeat,
  BsEnvelopeOpen,
  BsFillHandThumbsUpFill,
} from "react-icons/bs";
import ToDo from "./ToDo";
import Filters from "../Reports/Filters";
import Calendar from "./Calendar";

const Main = () => {
  const location = useLocation();
  let allTickets = useSelector((state) => state.Tickets.allTickets);
  let filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const overDue =
    filteredTickets &&
    filteredTickets.filter(
      (firstMsg) =>
        new Date(firstMsg.due_date).toISOString() <= new Date().toISOString()
    );

  //Overdue Tickets =====================
  const overDueTickets =
    overDue.length >= 1 &&
    overDue.map((ticket) => {
      return (
        <div
          key={ticket.id}
          className="h-10 w-10 rounded-xl dark:bg-slate-800 bg-slate-200 flex cursor-pointer items-center justify-center relative uppercase text-lg dark:text-slate-300 text-slate-500 font-bold custom-shadow"
        >
          <abbr title={ticket.recipient_name}>
            {ticket.recipient_name.charAt(0)}
          </abbr>
          <span className="absolute top-[-.1rem] right-[-.1rem] h-[.6rem] w-[.6rem] rounded-full bg-red-500 border dark:border-slate-900 border-slate-100"></span>
        </div>
      );
    });

  //Component ========================
  return (
    <div
      className={`${
        location.pathname === "/" ? "grid" : "hidden"
      } dark:bg-slate-800 w-[90%] sm:w-full container 2xl:w-[72rem] mt-4 overflow-hidden`}
    >
      <div className="h-[44rem] grid grid-rows-5 gap-4">
        <div className="row-span-2 w-full dark:bg-slate-900 bg-slate-100 rounded-xl grid grid-cols-1 md:grid-cols-3 place-content-center overflow-hidden py-6 p-2 gap-1">
          <div className="col-span-1 rounded-xl h-full w-full grid grid-rows-2 2xl:flex overflow-hidden ">
            <Calendar />
          </div>
          {/** Overdue Tickets ==================================*/}
          <div className="col-span-1 hidden md:grid grid-rows-3 justify-between overflow-hidden px-2">
            {overDue.length >= 1 && (
              <div className="row-span-2 flex flex-col gap-1 pb-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
                <h2 className="text-base font-bold dark:text-slate-400 text-slate-600 capitalize text-center md:text-left">
                  Overdue Tickets
                </h2>
                <p className="text-thin text-slate-500 text-xs lg:text-sm text-center md:text-left">
                  {overDue.length} tickets displayed below are overdue. To
                  resolve these issues please visit the tickets page and filter
                  by clients' name which can be seen if you hover on top of each
                  letters below. Alternatively you can check/hover on top of the
                  highlighted dates on the calendar to see upcoming deadline.
                </p>
              </div>
            )}
            {overDue.length <= 0 && (
              <div className="row-span-2 flex flex-col justify-between pb-2 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
                <h2 className="text-base font-bold dark:text-slate-400 text-slate-600 capitalize text-center md:text-left">
                  Overdue Tickets
                </h2>
                <p className="text-thin text-slate-500 text-sm text-center md:text-left">
                  You all catched up{" "}
                  <BsFillHandThumbsUpFill className="inline text-yellow-500" />
                  .You can check/hover on top of the highlighted dates on the
                  calendar to see upcoming deadline. . Don’t dwell on what went
                  wrong. Instead, focus on what to do next. Spend your energies
                  on moving forward toward finding the answer.
                </p>
              </div>
            )}
            <div className="row-span-1 flex justify-center md:justify-start items-center space-x-1">
              {overDueTickets}
              {overDue.length <= 0 && (
                <>
                  <div className="h-10 w-10 border border-slate-600 rounded-xl dark:bg-slate-800 bg-slate-200 custom-shadow flex cursor-pointer items-center justify-center relative uppercase animate-pulse text-lg dark:text-slate-300 text-slate-500 font-bold"></div>
                  <div className="h-10 w-10 rounded-xl border border-slate-600 dark:bg-slate-800 bg-slate-200 custom-shadow flex cursor-pointer items-center justify-center relative uppercase animate-pulse text-lg dark:text-slate-300 text-slate-500 font-bold"></div>
                  <div className="h-10 w-10 rounded-xl border border-slate-600 dark:bg-slate-800 bg-slate-200 custom-shadow flex cursor-pointer items-center justify-center relative uppercase animate-pulse text-lg dark:text-slate-300 text-slate-500 font-bold"></div>
                </>
              )}
            </div>
          </div>
          {/**End Of Overdue Tickets ==================================*/}

          {/**Manage Contacts ==================================*/}
          <div className="col-span-1 border-l dark:border-slate-700 border-slate-400 hidden md:grid grid-rows-3 px-4 justify-between overflow-hidden">
            <div className="row-span-2 flex flex-col gap-2 pb-2 overflow-hidden">
              <h2 className="text-base font-bold dark:text-slate-400 text-slate-600 capitalize">
                contacts
              </h2>
              <p className="text-thin text-slate-500 text-sm">
                Click below button to manage yours contacts. It is important to
                keep them upto date as it will ensure no email is sent to the
                wrong recipient. All tickets must be added/saved before opening
                a new ticket.
              </p>
            </div>
            <div className="row-span-1 flex items-center space-x-1">
              <Link to="./contacts">
                <button className="dark:bg-slate-800 bg-slate-200 rounded-lg dark:text-slate-400 text-slate-600 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 dark:ring-slate-600 ring-slate-400 dark:hover:ring-blue-600 hover:ring-blue-600 text-xs font-bold h-10 px-4 transition-all duration-300">
                  Manage Contacts
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden">
          <Filters />
        </div>

        {/**Bottom Half ================================ */}
        <div className="row-span-3 rounded-xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <ToDo />
          <div className="col-span-1 hidden md:grid grid-rows-5 dark:bg-slate-900 bg-slate-100 rounded-xl px-2">
            <div className="row-span-2 bg-no-repeat bg-center bg-contain border-b dark:border-slate-700 border-slate-400 flex flex-col justify-center items-center px-4">
              <h2 className="dark:text-slate-400 text-slate-600 text-2xl font-bold capitalize">
                Today's Sumary
              </h2>
              <p className="text-slate-500 text-center text-sm">
                To see more analytics please visit the reports page and you can
                also check the current progress or your tickets in tickets page.
              </p>
            </div>
            <div className="row-span-3 space-y-2 px-4 p-2">
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-2xl">
                    <BsCheckAll />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    Resolved
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "resolved"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-xl">
                    <BsDashSquare />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    Closed
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "closed"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl  dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-xl">
                    <BsArrowRepeat />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    Pending
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "pending"
                    ).length
                  }
                </h5>
              </div>
              <div className="h-12 w-full flex justify-between">
                <div className="flex space-x-2 items-center w-[70%]">
                  <div className="custom-shadow h-10 w-10 rounded-xl dark:bg-slate-800 bg-slate-200 dark:text-slate-300 text-slate-500 flex justify-center items-center text-xl">
                    <BsEnvelopeOpen />
                  </div>
                  <h5 className="dark:text-slate-400 text-slate-500 text-sm font-bold">
                    Open
                  </h5>
                </div>
                <h5 className="dark:text-slate-400 text-slate-500 text-xl font-semibold flex items-center">
                  {
                    allTickets.filter(
                      (data) =>
                        data.message_position === 1 &&
                        data.status &&
                        data.status.toLowerCase() === "open"
                    ).length
                  }
                </h5>
              </div>
            </div>
          </div>
          <div className="col-span-1 dark:bg-slate-900 bg-slate-100 rounded-xl hidden xl:grid grid-rows-2 overflow-hidden place-items-center">
            <img
              className="h-full w-full object-cover object-center rounded-t-xl"
              src={Businnes}
              alt="business"
            />
            <div className="row-span-1 px-4 p-2 space-y-2 overflow-y-hidden">
              <h2 className="md:text-2xl text-lg dark:text-slate-400 text-slate-600 font-bold">
                Biggest Business Trends In 2022
              </h2>
              <p className="text-slate-400 text-sm">
                Here are the eight key trends every company will have to tackle
                in order to succeed.
              </p>
              <button className="bg-blue-700 outline-none focus:outline-none focus:ring focus:ring-blue-600 hover:ring-1 ring-1 ring-blue-800 hover:opacity-90 transition-all  text-sm text-slate-300 font-semibold px-4 py-2 rounded-lg">
                Read more <BsArrowRightShort className="inline text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
