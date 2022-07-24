import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const StatusSummary: FC = () => {
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  const data = useMemo(() => {
    return dashboardData.length >= 1
      ? ["Solved", "Open", "On-hold", "Re-opened"]
          .map((status: any, index: any) => ({
            value: (
              (dashboardData?.filter(
                (data) =>
                  data?.status
                    ?.toLowerCase()
                    ?.replace(/[^a-zA-Z0-9]/g, "")
                    ?.replace(/\s/g, "") ===
                  status
                    ?.toLowerCase()
                    ?.replace(/[^a-zA-Z0-9]/g, "")
                    ?.replace(/\s/g, "")
              ).length /
                dashboardData.length) *
              100
            ).toFixed(0)
              ? (
                  (dashboardData?.filter(
                    (data) =>
                      data?.status
                        ?.toLowerCase()
                        ?.replace(/[^a-zA-Z0-9]/g, "")
                        ?.replace(/\s/g, "") ===
                      status
                        ?.toLowerCase()
                        ?.replace(/[^a-zA-Z0-9]/g, "")
                        ?.replace(/\s/g, "")
                  ).length /
                    dashboardData.length) *
                  100
                ).toFixed(0)
              : 0,
            name: status,
            color: ["#1d4ed8", "#2563eb", "#47B5FF", "#0284c7"][index],
          }))
          ?.sort((a: any, b: any) => {
            return a.value - b.value;
          })
      : [];
  }, [dashboardData]);

  //Component =========================
  return (
    <div className="mt-20 flex flex-col justify-center items-center relative">
      <div className="text-center text-slate-700 dark:text-slate-300 text-[0.7rem] font-medium tracking-normal capitalize font-sans">
        <div className="text-sm font-semibold dark:font-medium tracking-wider dark:text-slate-300 text-slate-800 mt-2 font-sans">
          {dashboardData?.length} tickets
        </div>
      </div>
      <div className="w-[7.5rem] h-[9rem] border border-inherit dark:border-slate-800 mt-3 flex flex-col bg-gradient-to-t to-blue-600 from-blue-700 dark:bg-gradient-to-t dark:to-blue-600 dark:from-blue-700 rounded-b-md shadow-lg z-[99]">
        {data.length >= 1 &&
          data?.map((status: any, index: number) => {
            return (
              <div
                style={{
                  height: `calc(${status.value}% + 10px)`,
                  backgroundColor: status?.color,
                }}
                key={index}
                className={`bg-inherit duration-200 hover:opacity-80 transition-all last:rounded-b  first:border-t-0 border-t-2 border-slate-100 dark:border-slate-800 relative group`}
              >
                <div className="absolute h-7 w-32 p-2 bottom-[40%] right-[-80%] z-[99] rounded-sm bg-blue-200 text-xs font-semibold hidden group-hover:flex justify-between items-center shadow-xl drop-shadow-xl overflow-hidden whitespace-nowrap">
                  <span>{status.name} </span>
                  <span>{status.value}%</span>
                </div>
              </div>
            );
          })}
      </div>

      {/**Deco boxes ================================ */}
      <div className="absolute h-12 w-12 rounded bg-slate-100 dark:bg-[#33415569] rotate-12 left-4 bottom-10"></div>
      <div className="absolute h-6 w-6 rounded bg-slate-100 dark:bg-[#33415569] rotate-12 left-10 bottom-28"></div>
      <div className="absolute h-12 w-12 rounded bg-slate-100 dark:bg-[#33415569] rotate-45 right-4 bottom-24"></div>
    </div>
  );
};
export default StatusSummary;
