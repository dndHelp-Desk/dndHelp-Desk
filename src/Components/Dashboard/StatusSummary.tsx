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
          .map((status) => ({
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
            ).toFixed(0),
            name: status,
          }))
          ?.sort((a: any, b: any) => {
            return a.value - b.value;
          })
      : [];
  }, [dashboardData]);

  //Component =========================
  return (
    <div className="row-span-3 flex flex-col justify-center items-center relative">
      <h2 className="text-center uppercase font-bold text-[0.7rem] dark:text-slate-300 text-slate-800">
        {dashboardData?.length} tickets
      </h2>
      <div className="w-[7rem] h-[8rem] border border-inherit dark:border-slate-800 mt-3 flex flex-col bg-gradient-to-t from-blue-700 to-blue-500 rounded-b-md shadow-lg z-[99]">
        {data.length >= 1 &&
          data?.map((status: any, index: number) => {
            return (
              <div
                style={{ height: `calc(${status.value}% + 10px)` }}
                key={index}
                className={`bg-inherit transition-all duration-200 hover:bg-blue-800 last:rounded-b  first:border-t-0 border-t-2 border-slate-100 dark:border-slate-800 relative group`}
              >
                <div className="absolute h-6 w-28 p-2 bottom-[40%] right-[-90%] rounded-sm bg-blue-200 text-[0.65rem] font-semibold hidden group-hover:flex justify-between items-center shadow-xl drop-shadow-xl">
                  <span>{status.name} :</span>
                  <span>{status.value}%</span>
                </div>
              </div>
            );
          })}
      </div>

      {/**Deco boxes ================================ */}
      <div className="absolute h-12 w-12 rounded-md bg-slate-100 dark:bg-[#33415569] rotate-12 left-4 bottom-10"></div>
      <div className="absolute h-6 w-6 rounded-md bg-slate-100 dark:bg-[#33415569] rotate-12 left-10 bottom-28"></div>
      <div className="absolute h-12 w-12 rounded-md bg-slate-100 dark:bg-[#33415569] rotate-45 right-4 bottom-24"></div>
    </div>
  );
};

export default StatusSummary;
