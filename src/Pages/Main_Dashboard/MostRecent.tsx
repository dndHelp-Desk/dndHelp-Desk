import { FC } from "react";
import { BiHash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { Link } from "react-router-dom";
import { setThreadId } from "../../Redux/Slices/Tickets_n_Settings_Slice";

const MostRecent: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  let activities = dashboardData;
  const noData = [
    {
      category: "No Event",
      status: "none",
      date: new Date().getTime() - 1800000,
      ticket_id: "#123456",
    },
    {
      category: "No Event",
      status: "none",
      date: new Date().getTime() - 3600000,
      ticket_id: "#123456",
    },
    {
      category: "No Event",
      status: "none",
      date: new Date().getTime() - 5400000,
      ticket_id: "#123456",
    },
    {
      category: "No Event",
      status: "none",
      date: new Date().getTime() - 7200000,
      ticket_id: "#123456",
    },
    {
      category: "No Event",
      status: "none",
      date: new Date().getTime() - 7280000,
      ticket_id: "#123456",
    },
  ];

  //Component =================
  return (
    <>
      <div className="w-full h-[75%] p-2 pl-6 pt-6 pr-0 flex flex-col items-center justify-center select-none rounded overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
        {activities.length >= 1 &&
          activities.slice(0, 4).map((activity, index) => {
            return (
              <div
                key={index}
                className="w-full h-20 px-2 pl-6 border-l border-slate-300 dark:border-slate-700 last:border-0 relative"
              >
                <div className="absolute left-[-1rem] top-0 h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-750 p-1">
                  <div className="h-full w-full rounded-full bg-slate-700 dark:bg-slate-700 flex items-center justify-center text-sm text-slate-100">
                    <BiHash />
                  </div>
                </div>
                <article className="text-slate-900 dark:text-slate-300 text-[0.7rem] font-medium tracking-normal uppercase font-sans subpixel-antialiased">
                  <div className="flex items-center justify-between space-y-0 relative">
                    <p className="flex-[6] overflow-hidden whitespace-nowrap overflow-ellipsistext-slate-900 dark:text-slate-300 text-xs font-medium tracking-normal font-sans capitalize">
                      {activity.category}
                    </p>
                    <Link
                      onClick={() => {
                        dispatch(setThreadId(activity?.ticket_id));
                        window.localStorage.setItem(
                          "threadId",
                          JSON.stringify(activity?.ticket_id)
                        );
                      }}
                      to="/app/tickets"
                      className={`absolute right-1 top-1 w-16 px-2 py-[0.2rem] rounded-sm border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-[#33415569] flex justify-center items-center text-[0.65rem]`}
                    >
                      View
                    </Link>
                  </div>
                  <small className="text-slate-900 dark:text-slate-400 text-[0.65rem] font-medium tracking-normal lowercase font-sans">
                    {new Date(activity.date).toLocaleString()}
                  </small>
                </article>
              </div>
            );
          })}

        {/**Preloader ========================== */}
        {activities.length <= 3 &&
          noData.slice(activities.length, 4).map((activity, index) => {
            return (
              <div
                key={index}
                className="w-full h-14 px-2 pl-6 border-l border-slate-300 dark:border-slate-700 last:border-0 relative"
              >
                <div className="absolute left-[-1rem] top-0 h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-750 p-1">
                  <div className="h-full w-full rounded-full bg-slate-700 dark:bg-slate-700 flex items-center justify-center text-xs text-slate-100">
                    <BiHash />
                  </div>
                </div>
                <article className="text-slate-900 dark:text-slate-300 text-[0.7rem] font-medium tracking-normal uppercase font-sans subpixel-antialiased">
                  <div className="flex items-center justify-between space-y-0 relative">
                    <p className="flex-[6] overflow-hidden whitespace-nowrap overflow-ellipsistext-slate-900 dark:text-slate-300 text-xs font-medium tracking-normal font-sans capitalize">
                      {activity.category}
                    </p>
                    <Link
                      to="/app/tickets"
                      className={`absolute right-1 top-1 w-16 px-2 py-[0.2rem] rounded-sm border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-[#33415569] flex justify-center items-center text-[0.65rem]`}
                    >
                      View
                    </Link>
                  </div>
                  <small className="text-slate-900 dark:text-slate-400 text-[0.65rem] font-medium tracking-normal lowercase font-sans">
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
