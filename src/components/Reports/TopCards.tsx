import { FC } from "react";
import {
  BsDashCircleDotted,
  BsCheckAll,
  BsArrowClockwise,
  BsEnvelopeOpen,
  BsStopwatch,
  BsPatchCheck,
} from "react-icons/bs";

interface Props {
  data: any;
}

const TopCards: FC<Props> = ({ data }) => {
  //Component ==================================
  return (
    <div className="w-full rounded-xl grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/**First Pair Of Stats ==================================================== */}
      <div className="col-span-1 h-[7rem] rounded-md dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 shadow grid grid-cols-2 p-4">
        <div className="col-span-1 border-r dark:border-slate-700 border-slate-300">
          <div className="w-full h-full flex flex-col justify-center items-center space-y-1">
            <h1 className="dark:text-slate-300 text-slate-900 font-bold font-sans leading-1 text-[1.7rem] flex items-end justify-center space-x-2 w-full">
              <span>
                {data.length >= 1
                  ? data.filter((data: any) => data.status === "solved").length
                  : 0}
              </span>
              <span className="pb-[0.4rem] text-[0.65rem] dark:text-slate-400 text-slate-600">
                {data.length >= 1
                  ? (
                      (data.filter((data: any) => data.status === "solved")
                        .length /
                        data.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </h1>
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
            <h1 className="dark:text-slate-300 text-slate-900 font-bold font-sans leading-1 text-[1.7rem] flex items-end justify-center space-x-2 w-full">
              <span>
                {data.length >= 1
                  ? data.filter((data: any) => data.fcr === "yes").length
                  : 0}
              </span>
              <span className="pb-[0.4rem] text-[0.65rem] dark:text-slate-400 text-slate-600">
                {data.length >= 1
                  ? (
                      (data.filter((data: any) => data.fcr === "yes").length /
                        data.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </h1>
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
            <h1 className="dark:text-slate-300 text-slate-900 font-bold font-sans leading-1 text-[1.7rem] flex items-end justify-center space-x-2 w-full">
              <span>
                {data.length >= 1
                  ? data.filter(
                      (data: any) =>
                        new Date(data.due_date).getTime() >=
                          new Date().getTime() && data.status === "open"
                    ).length
                  : 0}
              </span>
              <span className="pb-[0.4rem] text-[0.65rem] dark:text-slate-400 text-slate-600">
                {data.length >= 1
                  ? (
                      (data.filter(
                        (data: any) =>
                          new Date(data.due_date).getTime() >=
                            new Date().getTime() && data.status === "open"
                      ).length /
                        data.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </h1>
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
            <h1 className="dark:text-slate-300 text-slate-900 font-bold font-sans leading-1 text-[1.7rem] flex items-end justify-center space-x-2 w-full">
              <span>
                {data.length >= 1
                  ? data.filter((data: any) => data.reopened === true).length
                  : 0}
              </span>
              <span className="pb-[0.4rem] text-[0.65rem] dark:text-slate-400 text-slate-600">
                {data.length >= 1
                  ? (
                      (data.filter((data: any) => data.reopened === true)
                        .length /
                        data.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </h1>
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
            <h1 className="dark:text-slate-300 text-slate-900 font-bold font-sans leading-1 text-[1.7rem] flex items-end justify-center space-x-2 w-full">
              <span>
                {data.length >= 1
                  ? data.filter((data: any) => data.status === "open").length
                  : 0}
              </span>
              <span className="pb-[0.4rem] text-[0.65rem] dark:text-slate-400 text-slate-600">
                {data.length >= 1
                  ? (
                      (data.filter((data: any) => data.status === "open")
                        .length /
                        data.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </h1>
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
            <h1 className="dark:text-slate-300 text-slate-900 font-bold font-sans leading-1 text-[1.7rem] flex items-end justify-center space-x-2 w-full">
              <span>
                {data.length >= 1
                  ? data.filter((data: any) => data.status === "on hold").length
                  : 0}
              </span>
              <span className="pb-[0.4rem] text-[0.65rem] dark:text-slate-400 text-slate-600">
                {data.length >= 1
                  ? (
                      (data.filter((data: any) => data.status === "on hold")
                        .length /
                        data.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </h1>
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
