import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

type Props = {};

const ProgressBars: FC<Props> = () => {
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const filteredTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  const categoriesData = useMemo(() => {
    return categories.length >= 1
      ? categories
          .map((element) => {
            return {
              name: element,
              value: (
                (filteredTickets?.filter(
                  (ticket) =>
                    ticket?.category?.toLowerCase() ===
                      element?.toLowerCase() &&
                    new Date(ticket.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(ticket.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        31
                      ).getTime()
                ).length /
                  filteredTickets.length) *
                100
              ).toFixed(1),
            };
          })
          .splice(0, 5)
          .sort((a: any, b: any) => b.value - a.value)
      : [];
  }, [categories, filteredTickets]);

  const categoryPreloader = [1, 2, 3, 4, 5].map((index) => {
    return (
      <div key={index} className="w-full">
        <small className="text-slate-700 uppercase font-medium dark:text-slate-400 text-[0.6rem]">
          No Data
        </small>
        <div className="w-full flex items-center justify-between">
          <div
            role="progressbar"
            aria-label="progressbas"
            className="h-2 w-full flex-[3] rounded-full animate-pulse bg-slate-400 dark:bg-slate-700 overflow-hidden"
          ></div>
          <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-semibold text-xs">
            <span>0.0%</span>
          </div>
        </div>
      </div>
    );
  });

  //component ================
  return (
    <div className="col-span-1 h-[20rem] flex flex-col justify-between dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 rounded-md overflow-hidden p-4 py-6">
      <div className="w-full">
        <h1 className="dark:text-slate-300 text-slate-900 text-xs text-center font-bold dark:font-semibold uppercase">
          Top 5 Categories
        </h1>
        <p className="text-center text-xs font-medium tracking-normal text-slate-600 dark:text-slate-400 mt-2">
          Actual figures can be found on the reports page.
        </p>
      </div>
      <div className="flex flex-col mt-2 w-full justify-center gap-1 overflow-hidden rounded-lg px-4">
        {categoriesData.length >= 1 &&
          categoriesData?.map((element: any, index) => {
            return (
              <div key={index} className="w-full">
                <small className="text-slate-800 dark:text-slate-400 text-[0.6rem] font-medium uppercase">
                  {element.name}
                </small>
                <div className="w-full flex items-center justify-between">
                  <div
                    role="progressbar"
                    aria-label="progressbas"
                    className="h-2 w-full flex-[3] rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden"
                  >
                    <div
                      style={{
                        width: `${
                          Number(element.value)
                            ? parseFloat(element.value).toFixed(1)
                            : "0.0"
                        }%`,
                      }}
                      className="h-full bg-blue-700 text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80 rounded-full"
                    >
                      <abbr
                        title={`${element.name} : ${
                          Number(element.value)
                            ? parseFloat(element.value).toFixed(0)
                            : 0.0
                        }%`}
                      >
                        <div className="w-full h-full"></div>
                      </abbr>
                    </div>
                  </div>
                  <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-semibold text-xs">
                    <span>{element.value >= 0.1 ? element.value : "0.0"}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        {/**Preloader ============= */}
        {categoriesData.length <= 0 && categoryPreloader}
      </div>
    </div>
  );
};

export default ProgressBars;
