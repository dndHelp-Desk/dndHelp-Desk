import React from "react";
import {
  BsDashCircleDotted,
  BsCheckAll,
  BsArrowClockwise,
  BsEnvelopeOpen,
  BsStopwatch,
  BsPatchCheck,
} from "react-icons/bs";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import { useSelector } from "react-redux";

const TopCards = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const filters = useSelector((state) => state.Tickets.filters);
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const firstMessages =
    allTickets.length >= 1 &&
    allTickets.filter((ticket) => ticket.message_position === 1);

  //Component ==================================
  return (
    <div className="w-full rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-hidden">
      {/**First Pair Of Stats ==================================================== */}
      <div className="col-span-1 h-[7rem] rounded-lg dark:bg-slate-900 bg-slate-100 shadow grid grid-cols-2 p-4 pr-0">
        <div className="col-span-1 border-r dark:border-slate-700 border-slate-300 grid grid-cols-5">
          <div className="col-span-3 flex flex-col justify-center space-y-4">
            <h2 className="dark:text-slate-400 text-slate-500 font-medium font-sans text-xs uppercase">
              Resolved
            </h2>
            <h3 className="dark:text-slate-300 text-slate-600 font-bold font-sans leading-3 text-[1.7rem]">
              20
            </h3>
            <h5
              className={`text-green-600 flex space-x-1 items-center font-bold font-sans text-xs`}
            >
              <span>5</span> <HiTrendingDown />
              <small>Decrease</small>
            </h5>
          </div>
          <div className="col-span-2 flex justify-center pt-0 p-0 sm:p-4">
            <div className="h-8 w-8 rounded-xl custom-shadow  dark:bg-slate-800 bg-slate-300 flex items-center justify-center text-green-600 font-bold text-xl border border-slate-300 dark:border-slate-800">
              <BsCheckAll />
            </div>
          </div>
        </div>
        {/**Second half Kpi ============================== */}
        <div className="grid grid-cols-5 pl-3 col-span-1">
          <div className="col-span-3 flex flex-col justify-center space-y-4">
            <h2 className="dark:text-slate-400 text-slate-500 font-medium font-sans text-xs uppercase">
              FCR
            </h2>
            <h3 className="dark:text-slate-300 text-slate-600 font-bold font-sans leading-3 text-[1.7rem]">
              53
            </h3>
            <h5
              className={`text-green-600 flex space-x-1 items-center font-bold font-sans text-xs`}
            >
              <span>7</span> <HiTrendingDown />
              <small>Decrease</small>
            </h5>
          </div>
          <div className="col-span-2 flex justify-center pt-0 p-0 sm:p-4 pr-3">
            <div className="h-8 w-8 rounded-xl custom-shadow  dark:bg-slate-800 bg-slate-300 flex items-center justify-center text-yellow-600 font-bold text-xl border border-slate-300 dark:border-slate-800">
              <BsPatchCheck />
            </div>
          </div>
        </div>
      </div>

      {/**Second Pair Of Stats ==================================================== */}
      <div className="col-span-1 h-[7rem] rounded-lg dark:bg-slate-900 bg-slate-100 shadow grid grid-cols-2 p-4 pr-0">
        <div className="col-span-1 border-r dark:border-slate-700 border-slate-300 grid grid-cols-5">
          <div className="col-span-3 flex flex-col justify-center space-y-4">
            <h2 className="dark:text-slate-400 text-slate-500 font-medium font-sans text-xs uppercase">
              Overdue
            </h2>
            <h3 className="dark:text-slate-300 text-slate-600 font-bold font-sans leading-3 text-[1.7rem]">
              8
            </h3>
            <h5
              className={`text-green-600 flex space-x-1 items-center font-bold font-sans text-xs`}
            >
              <span>9</span> <HiTrendingDown />
              <small>Decrease</small>
            </h5>
          </div>
          <div className="col-span-2 flex justify-center pt-0 p-0 sm:p-4">
            <div className="h-8 w-8 rounded-xl custom-shadow  dark:bg-slate-800 bg-slate-300 flex items-center justify-center text-red-600 font-bold text-xl border border-slate-300 dark:border-slate-800">
              <BsStopwatch />
            </div>
          </div>
        </div>
        {/**Second half Kpi ============================== */}
        <div className="grid grid-cols-5 pl-3 col-span-1">
          <div className="col-span-3 flex flex-col justify-center space-y-4">
            <h2 className="dark:text-slate-400 text-slate-500 font-medium font-sans text-xs uppercase">
              Re-opened
            </h2>
            <h3 className="dark:text-slate-300 text-slate-600 font-bold font-sans leading-3 text-[1.7rem]">
              12
            </h3>
            <h5
              className={`text-green-600 flex space-x-1 items-center font-bold font-sans text-xs`}
            >
              <span>7</span> <HiTrendingDown />
              <small>Decrease</small>
            </h5>
          </div>
          <div className="col-span-2 flex justify-center pt-0 p-0 sm:p-4 pr-3">
            <div className="h-8 w-8 rounded-xl custom-shadow  dark:bg-slate-800 bg-slate-300 flex items-center justify-center text-red-600 font-bold text-xl border border-slate-300 dark:border-slate-800">
              <BsArrowClockwise />
            </div>
          </div>
        </div>
      </div>

      {/**Third Pair Of Stats ==================================================== */}
      <div className="col-span-1 h-[7rem] rounded-lg dark:bg-slate-900 bg-slate-100 shadow grid grid-cols-2 p-4 pr-0">
        <div className="col-span-1 border-r dark:border-slate-700 border-slate-300 grid grid-cols-5">
          <div className="col-span-3 flex flex-col justify-center space-y-4">
            <h2 className="dark:text-slate-400 text-slate-500 font-medium font-sans text-xs uppercase">
              Open
            </h2>
            <h3 className="dark:text-slate-300 text-slate-600 font-bold font-sans leading-3 text-[1.7rem]">
              19
            </h3>
            <h5
              className={`text-green-600 flex space-x-1 items-center font-bold font-sans text-xs`}
            >
              <span>2</span> <HiTrendingDown />
              <small>Decrease</small>
            </h5>
          </div>
          <div className="col-span-2 flex justify-center pt-0 p-0 sm:p-4">
            <div className="h-8 w-8 rounded-xl custom-shadow dark:bg-slate-800 bg-slate-300 flex items-center justify-center text-blue-600 font-bold text-xl border border-slate-300 dark:border-slate-800">
              <BsEnvelopeOpen />
            </div>
          </div>
        </div>

        {/**Second half Kpi ============================== */}
        <div className="grid grid-cols-5 pl-3 col-span-1">
          <div className="col-span-3 flex flex-col justify-center space-y-4">
            <h2 className="dark:text-slate-400 text-slate-500 font-medium font-sans text-xs uppercase">
              on hold
            </h2>
            <h3 className="dark:text-slate-300 text-slate-600 font-bold font-sans leading-3 text-[1.7rem]">
              3
            </h3>
            <h5
              className={`text-green-600 flex space-x-1 items-center font-bold font-sans text-xs`}
            >
              <span>0</span> <HiTrendingDown />
              <small>Decrease</small>
            </h5>
          </div>
          <div className="col-span-2 flex justify-center pt-0 p-0 sm:p-4 pr-3">
            <div className="h-8 w-8 rounded-xl custom-shadow dark:bg-slate-800 bg-slate-300 flex items-center justify-center text-blue-600 font-bold text-xl border border-slate-300 dark:border-slate-800">
              <BsDashCircleDotted />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
