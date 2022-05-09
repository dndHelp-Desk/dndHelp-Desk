import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const StatusSummary: FC = () => {
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.dashboardData
  );

  const data = useMemo(() => {
    return dashboardData.length >= 1
      ? [
          {
            value: (
              (dashboardData.filter(
                (data) =>
                  new Date(data.date).getTime() >=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ).getTime() &&
                  new Date(data.date).getTime() <=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      31
                    ).getTime() &&
                  data?.status?.toLowerCase() === "solved"
              ).length /
                dashboardData.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        31
                      ).getTime()
                ).length) *
              100
            ).toFixed(1),
            name: "Solved",
          },
          {
            value: (
              (dashboardData.filter(
                (data) =>
                  new Date(data.date).getTime() >=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ).getTime() &&
                  new Date(data.date).getTime() <=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      31
                    ).getTime() &&
                  data.status === "reopened"
              ).length /
                dashboardData.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        31
                      ).getTime()
                ).length) *
              100
            ).toFixed(1),
            name: "Re-Opened",
          },
          {
            value: (
              (dashboardData.filter(
                (data) =>
                  new Date(data.date).getTime() >=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ).getTime() &&
                  new Date(data.date).getTime() <=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      31
                    ).getTime() &&
                  data?.status?.toLowerCase() === "on hold"
              ).length /
                dashboardData.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        31
                      ).getTime()
                ).length) *
              100
            ).toFixed(1),
            name: "On-Hold",
          },
          {
            value: (
              (dashboardData.filter(
                (data) =>
                  new Date(data.date).getTime() >=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      1
                    ).getTime() &&
                  new Date(data.date).getTime() <=
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      31
                    ).getTime() &&
                  data?.status?.toLowerCase() === "open"
              ).length /
                dashboardData.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        31
                      ).getTime()
                ).length) *
              100
            ).toFixed(1),
            name: "Open",
          },
        ].sort((a: any, b: any) => {
          return a.value - b.value;
        })
      : [];
  }, [dashboardData]);

  //Component =========================
  return (
    <div className="row-span-3 flex flex-col justify-center items-center">
      <h2 className="text-center uppercase font-bold text-[0.7rem] dark:text-slate-300 text-slate-800">
        {
          dashboardData.filter(
            (data) =>
              new Date(data.date).getTime() >=
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  1
                ).getTime() &&
              new Date(data.date).getTime() <=
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  31
                ).getTime()
          ).length
        }{" "}
        tickets
      </h2>
      <div className="w-[7rem] h-[8rem] mt-3 flex flex-col bg-gradient-to-t from-blue-700 to-blue-500 rounded-b shadow-lg">
        {data.length >= 1 &&
          data?.map((status: any, index: number) => {
            return (
              <div
                style={{ height: `calc(${status.value}% + 8px)` }}
                key={index}
                className={`bg-inherit hover:bg-blue-800 last:rounded-b  first:border-t-0 border-t border-slate-100 dark:border-slate-700 relative group`}
              >
                <div className="absolute h-6 w-28 p-2 bottom-[40%] right-[-90%] rounded-sm bg-blue-200 text-[0.65rem] font-semibold hidden group-hover:flex justify-between items-center">
                  <span>{status.name} :</span>
                  <span>{status.value}%</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StatusSummary;
