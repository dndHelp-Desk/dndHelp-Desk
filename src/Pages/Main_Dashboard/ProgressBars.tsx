import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const ProgressBars: FC = () => {
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  const categoriesData = useMemo(() => {
    return categories?.length >= 1
      ? categories
          ?.map((element) => {
            return {
              name: element?.name,
              count: dashboardData?.filter(
                (ticket) =>
                  ticket.category?.toLowerCase() ===
                  element?.name?.toLowerCase()
              ).length,
              value: (
                (dashboardData?.filter(
                  (ticket) =>
                    ticket.category?.toLowerCase() ===
                    element?.name?.toLowerCase()
                ).length /
                  dashboardData?.length) *
                100
              ).toFixed(0),
            };
          })
          .sort((a: any, b: any) => b.value - a.value)
          .splice(0, 5)
      : [
          { name: "LATE DELIVERY", value: 0 },
          { name: "FAILED ORDER", value: 0 },
          { name: "INCORRECT ORDER", value: 0 },
          { name: "REFUND", value: 0 },
          { name: "POOR SERVICE (DRIVER)", value: 0 },
        ];
  }, [categories, dashboardData]);

  //component ================
  return (
    <div className="col-span-1 h-[23rem] flex flex-col justify-between dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded overflow-hidden p-4 py-6">
      <div className="w-full">
        <div className="dark:text-slate-300 text-slate-700 text-base tracking-wider text-center font-bold font-sans uppercase">
          Top Categories
        </div>
        <p className="text-center text-sm font-medium font-sans tracking-normal text-slate-600 dark:text-slate-400 mt-2 ">
          Actual figures can be found on the reports page.
        </p>
      </div>
      <div className="flex flex-col space-y-4 mt-2 w-full rounded-lg px-4 pb-6 overflow-hidden">
        {categoriesData?.map((element: any, index) => {
          return (
            <div key={index} className="w-full space-y-1">
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 text-xs font-medium tracking-normal capitalize font-sans">
                <span className="">{element.name}</span>
                <span className="text-[0.65rem]">
                  ({element.count}) {element.value >= 0.1 ? element.value : "0"}
                  %
                </span>
              </div>
              <div
                role="progressbar"
                aria-label="progressbas"
                className="h-2.5 w-full  rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-700"
              >
                <div
                  style={{
                    width: `${
                      Number(element.value)
                        ? parseFloat(element.value).toFixed(0)
                        : "0"
                    }%`,
                  }}
                  className="h-full bg-gradient-to-r from-indigo-600 to-indigo-700 text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80 rounded-full transition-all duration-200"
                >
                  <abbr
                    title={`${element.name} : ${
                      Number(element.value)
                        ? parseFloat(element.value).toFixed(0)
                        : 0
                    }%`}
                  >
                    <div className="w-full h-full"></div>
                  </abbr>
                </div>
              </div>
            </div>
          );
        })}

        {/**Preloaders=== */}
        {categoriesData.length <= 4 &&
          [0, 1, 2, 3, 4, 5].map((index) => {
            return (
              <div key={index} className="w-full space-y-1">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300 text-xs font-medium tracking-normal capitalize font-sans">
                  <span className="">N/A</span>
                  <span className="text-[0.65rem]">(0) 0%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label="progressbas"
                  className="h-2.5 w-full flex-[3] rounded-full border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-700 overflow-hidden"
                ></div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProgressBars;
