import React from "react";
import {
  BsDashCircleDotted,
  BsCheckAll,
  BsArrowClockwise,
  BsEnvelopeOpen,
  BsStopwatch,
  BsPatchCheck,
} from "react-icons/bs";

const TopCards = ({ data }) => {
  //Component ==================================
  return (
    <div className="w-full rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/**First Pair Of Stats ==================================================== */}
      <div className="col-span-1 h-[7rem] rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 shadow grid grid-cols-2 p-4">
        <div className="col-span-1 border-r dark:border-slate-700 border-slate-300">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
            <h3 className="dark:text-slate-400  flex space-x-4 text-slate-900 font-bold font-sans leading-1 text-[1.7rem]">
              {data.length >= 1
                ? data.filter((data) => data.status === "solved").length
                : 0}
            </h3>
            <h2 className="dark:text-slate-400 text-slate-700 font-semibold font-sans flex items-center space-x-2 text-[11px] uppercase">
              <span>Resolved</span>
              <span className="h-6 w-6 rounded-xl custom-shadow  dark:bg-slate-900 bg-slate-300 flex items-center justify-center font-bold text-sm border border-slate-300 dark:border-slate-800">
                <BsCheckAll />
              </span>
            </h2>
          </div>
        </div>
        {/**Second half Kpi ============================== */}
        <div className="col-span-1">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
            <h3 className="dark:text-slate-400  flex space-x-4 text-slate-900 font-bold font-sans leading-1 text-[1.7rem]">
              {data.length >= 1
                ? data.filter((data) => data.fcr === "yes").length
                : 0}
            </h3>
            <h2 className="dark:text-slate-400 text-slate-700 font-semibold font-sans flex items-center space-x-2 text-[11px] uppercase">
              <span>First-CR</span>
              <span className="h-6 w-6 rounded-xl custom-shadow  dark:bg-slate-900 bg-slate-300 flex items-center justify-center font-bold text-sm border border-slate-300 dark:border-slate-800">
                <BsPatchCheck />
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/**Second Pair Of Stats ==================================================== */}
      <div className="col-span-1 h-[7rem] rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 shadow grid grid-cols-2 p-4">
        <div className="col-span-1 border-r dark:border-slate-700 border-slate-300">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
            <h3 className="dark:text-slate-400  flex space-x-4 text-slate-900 font-bold font-sans leading-1 text-[1.7rem]">
              {data.length >= 1
                ? data.filter(
                    (data) =>
                      new Date(data.due_date).getTime() >=
                        new Date().getTime() && data.status === "open"
                  ).length
                : 0}
            </h3>
            <h2 className="dark:text-slate-400 text-slate-700 font-semibold font-sans flex items-center space-x-2 text-[11px] uppercase">
              <span>Overdue</span>
              <span className="h-6 w-6 rounded-xl custom-shadow  dark:bg-slate-900 bg-slate-300 flex items-center justify-center font-bold text-sm border border-slate-300 dark:border-slate-800">
                <BsStopwatch />
              </span>
            </h2>
          </div>
        </div>
        {/**Second half Kpi ============================== */}
        <div className="col-span-1">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
            <h3 className="dark:text-slate-400  flex space-x-4 text-slate-900 font-bold font-sans leading-1 text-[1.7rem]">
              {data.length >= 1
                ? data.filter((data) => data.reopened === true).length
                : 0}
            </h3>
            <h2 className="dark:text-slate-400 text-slate-700 font-semibold font-sans flex items-center space-x-2 text-[11px] uppercase">
              <span>re-opened</span>
              <span className="h-6 w-6 rounded-xl custom-shadow  dark:bg-slate-900 bg-slate-300 flex items-center justify-center font-bold text-sm border border-slate-300 dark:border-slate-800">
                <BsArrowClockwise />
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/**Third Pair Of Stats ==================================================== */}
      <div className="col-span-1 h-[7rem] rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 shadow grid grid-cols-2 p-4">
        <div className="col-span-1 border-r dark:border-slate-700 border-slate-300">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
            <h3 className="dark:text-slate-400  flex space-x-4 text-slate-900 font-bold font-sans leading-1 text-[1.7rem]">
              {data.length >= 1
                ? data.filter((data) => data.status === "open").length
                : 0}
            </h3>
            <h2 className="dark:text-slate-400 text-slate-700 font-semibold font-sans flex items-center space-x-2 text-[11px] uppercase">
              <span>Open</span>
              <span className="h-6 w-6 rounded-xl custom-shadow  dark:bg-slate-900 bg-slate-300 flex items-center justify-center font-bold text-sm border border-slate-300 dark:border-slate-800">
                <BsEnvelopeOpen />
              </span>
            </h2>
          </div>
        </div>
        {/**Second half Kpi ============================== */}
        <div className="col-span-1">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
            <h3 className="dark:text-slate-400  flex space-x-4 text-slate-900 font-bold font-sans leading-1 text-[1.7rem]">
              {data.length >= 1
                ? data.filter((data) => data.status === "on hold").length
                : 0}
            </h3>
            <h2 className="dark:text-slate-400 text-slate-700 font-semibold font-sans flex items-center space-x-2 text-[11px] uppercase">
              <span>on hold</span>
              <span className="h-6 w-6 rounded-xl custom-shadow  dark:bg-slate-900 bg-slate-300 flex items-center justify-center font-bold text-sm border border-slate-300 dark:border-slate-800">
                <BsDashCircleDotted />
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
