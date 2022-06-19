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
            <div key={index} className="w-full">
              <small className="text-slate-700 dark:text-slate-400 text-[0.65rem] font-medium tracking-normal uppercase">
                {element.name}
              </small>
              <div className="w-full flex items-center justify-between">
                <div
                  role="progressbar"
                  aria-label="progressbas"
                  className="h-2.5 w-full flex-[3] rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md"
                >
                  <div
                    style={{
                      width: `${
                        Number(element.value)
                          ? parseFloat(element.value).toFixed(0)
                          : "0"
                      }%`,
                    }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-700 text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80 rounded-full transition-all duration-200"
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
                <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-bold text-[0.7rem]">
                  <span>{element.value >= 0.1 ? element.value : "0"}%</span>
                </div>
              </div>
            </div>
          );
        })}

      {/**Preloaders=== */}
      {categoriesData.length <= 4 &&
        [0, 1, 2, 3, 4, 5].map((index) => {
          return (
            <div key={index} className="w-full">
              <small className="text-slate-700 dark:text-slate-400 text-[0.65rem] font-medium tracking-normal uppercase">
                N/A
              </small>
              <div className="w-full flex items-center justify-between">
                <div
                  role="progressbar"
                  aria-label="progressbas"
                  className="h-2.5 w-full flex-[3] rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-700 shadow-md"
                ></div>
                <div className="flex-[1] flex justify-end text-slate-700 dark:text-slate-400 font-bold text-[0.7rem]">
                  <span>0%</span>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CategoryProgress;
