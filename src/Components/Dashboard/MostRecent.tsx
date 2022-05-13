import { FC } from "react";
import { HiOutlineAnnotation } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const MostRecent: FC = () => {
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.dashboardData
  );
  let activities = dashboardData;
  const noData = [
    {
      category: "No Data",
      status: "none",
      date: "4/1/2022, 3:30:17 PM",
      ticket_id: "#123456",
    },
    {
      category: "No Data",
      status: "none",
      date: "4/1/2022, 3:30:17 PM",
      ticket_id: "#123456",
    },
    {
      category: "No Data",
      status: "none",
      date: "4/1/2022, 3:30:17 PM",
      ticket_id: "#123456",
    },
    {
      category: "No Data",
      status: "none",
      date: "4/1/2022, 3:30:17 PM",
      ticket_id: "#123456",
    },
  ];

  //Component =================
  return (
    <>
      <div className="w-full h-[75%] p-2 pl-6 px-4 flex flex-col items-center select-none rounded border border-slate-300 dark:border-slate-700 overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
        {activities.length >= 1 &&
          activities.slice(0, 4).map((activity, index) => {
            return (
              <div
                key={index}
                className="w-full h-12 p-2 pl-6 border-l border-slate-300 dark:border-slate-700 relative"
              >
                <div className="absolute left-[-1rem] top-0 h-8 w-8 rounded-full bg-slate-200 dark:bg-[#222e40] p-1">
                  <div className="h-full w-full rounded-full bg-slate-600 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-100">
                    <HiOutlineAnnotation />
                  </div>
                </div>
                <article className="text-xs font-semibold text-slate-800 dark:text-slate-300 capitalize tracking-wide">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.6rem] uppercase">
                      {activity.category} : {activity.ticket_id}
                    </span>
                    <div
                      className={`w-16 px-2 py-[0.2rem] rounded-sm border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-[#33415569] text-[0.6rem] text-slate-800 dark:text-slate-300 flex justify-center items-center`}
                    >
                      {activity.status}
                    </div>
                  </div>
                  <small className="text-slate-500 dark:text-slate-400">
                    {new Date(activity.date).toLocaleString()}
                  </small>
                </article>
              </div>
            );
          })}

        {/**Preloader ========================== */}
        {activities.length <= 0 &&
          noData.slice(0, 4).map((activity, index) => {
            return (
              <div
                key={index}
                className="w-full h-12 p-2 pl-6 border-l border-slate-300 dark:border-slate-700 relative"
              >
                <div className="absolute left-[-1rem] top-0 h-8 w-8 rounded-full bg-slate-200 dark:bg-[#222e40] p-1">
                  <div className="h-full w-full rounded-full bg-slate-600 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-100">
                    <HiOutlineAnnotation />
                  </div>
                </div>
                <article className="text-xs font-semibold text-slate-800 dark:text-slate-300 capitalize tracking-wide">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[0.6rem] uppercase">
                      {activity.category} : {activity.ticket_id}
                    </span>
                    <div
                      className={`w-16 px-2 py-[0.2rem] rounded-sm border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-[#33415569] text-[0.6rem] text-slate-800 dark:text-slate-400 flex justify-center items-center`}
                    >
                      {activity.status}
                    </div>
                  </div>
                  <small className="text-slate-500 dark:text-slate-400">
                    {new Date(activity.date).toLocaleString()}
                  </small>
                </article>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default MostRecent;
