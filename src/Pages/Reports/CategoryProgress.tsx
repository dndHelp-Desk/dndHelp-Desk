import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { data } from "./OverviewReport";

const CategoryProgress: FC<data> = ({ data }) => {
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );

  const categoriesData = useMemo(() => {
    return categories?.length >= 1
      ? categories
          ?.map((element) => {
            return {
              name: element?.name,
              count: data?.filter(
                (ticket: any) =>
                  ticket.category?.toLowerCase() ===
                  element?.name?.toLowerCase()
              ).length,
              value: (
                (data?.filter(
                  (ticket: any) =>
                    ticket?.category?.toLowerCase() ===
                    element?.name?.toLowerCase()
                )?.length /
                  data?.length) *
                100
              ).toFixed(0),
            };
          })
          .sort((a: any, b: any) => b.value - a.value)
      : [];
  }, [categories, data]);

  return (
    <>
      {categoriesData.length >= 1 &&
        categoriesData?.map((element: any, index) => {
          return (
            <div key={index} className="w-full space-y-1">
              <div className="flex justify-between items-center text-slate-800 dark:text-slate-300 text-xs font-medium tracking-normal capitalize font-sans">
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
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-700 text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80 rounded-full transition-all duration-200"
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
              <div className="flex justify-between items-center text-slate-800 dark:text-slate-300 text-xs font-medium tracking-normal capitalize font-sans">
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
    </>
  );
};

export default CategoryProgress;
