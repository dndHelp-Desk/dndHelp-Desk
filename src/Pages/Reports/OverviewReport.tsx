import { FC, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import CategoryProgress from "./CategoryProgress";
import TrafficChart from "./TrafficChart";

export type data = any;

const OverviewReport: FC<data> = ({ data }) => {
  const reportsData = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const [option, setOption] = useState<string>("hour");
  const categoriesData = useMemo(() => {
    return (
      categories?.length >= 1 &&
      categories?.map((element) => {
        return {
          name: element,
          value: (
            ((data?.length >= 1 &&
              data?.filter(
                (ticket: any) =>
                  ticket.category.toLowerCase() === element?.name?.toLowerCase()
              )?.length) /
              data?.length) *
            100
          ).toFixed(1),
        };
      })
    );
  }, [categories, data]);

  categoriesData &&
    categoriesData?.sort((a: any, b: any) => {
      return Number(b.value) - Number(a.value);
    });

  //Total Calls Incoming or Outgoing ===========================
  const totalAggregate = useMemo(() => {
    let ids = reportsData?.map((data) => data.ticket_id);
    let idsTwo = data?.map((ticket: any) => ticket.ticket_id);
    return ids?.filter((item) => idsTwo?.includes(item))?.length;
  }, [reportsData, data]);

  //Preping daily count  Data==============
  const solvedTickets =
    data?.length >= 1 &&
    data?.filter(
      (ticket: any) =>
        ticket.status === "solved" &&
        ticket.fcr === "no" &&
        ticket.closed_time?.toString().length === 13
    );

  //Trafiic Chart Data ===============
  const chartData = useMemo(() => {
    return Array.from(
      new Set(
        data?.map((data: any) =>
          option === "day"
            ? new Date(data.date).getDate()
            : new Date(data.date).getHours() + 1
        )
      )
    )?.map((elem) => ({
      name: elem,
      value:
        option === "day"
          ? data?.filter((data: any) => new Date(data.date).getDate() === elem)
              ?.length
          : data?.filter((data: any) => new Date(data.date).getHours() === elem)
              ?.length,
    }));
  }, [data, option]);

  //Sort data =========
  chartData?.sort((a, b) => {
    return Number(a.name) - Number(b.name);
  });

  //Number Spacing ====
  const numberWithSpaces = (x: any) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  };

  //Component =============================
  return (
    <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className=" h-[22rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 pt-6 overflow-hidden rounded-md">
        <div className="text-base dark:text-slate-300 text-slate-800 font-sans dark:font-semibold font-bold uppercase tracking-wider">
          Tickets Statistics
        </div>
        <div className="mt-8 flex space-x-4 px-2 h-14 w-full justify-between  border-b border-slate-300 dark:border-slate-700">
          <div className="dark:text-slate-300 text-slate-900">
            <div className="text-base font-bold text-center uppercase">
              {numberWithSpaces(data?.length)}
            </div>
            <div className="text-[0.65rem] space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              Total Tickets
            </div>
          </div>
          <div className="dark:text-slate-300 text-slate-800">
            <div className="text-base font-bold text-center uppercase">
              {numberWithSpaces(totalAggregate)}
            </div>
            <div className="text-[0.65rem] space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              Total Messages
            </div>
          </div>
          <div className="dark:text-slate-300 text-slate-800">
            <div className="text-base font-bold text-center">
              {`${
                solvedTickets.length >= 1
                  ? (
                      Number(
                        (
                          solvedTickets
                            .map((data: any) => data.closed_time - data.date)
                            .reduce((acc: any, value: any) => acc + value, 0) /
                          solvedTickets.length /
                          60000
                        ).toFixed(0)
                      ) / 60
                    )
                      .toString()
                      .split(".")[0]
                  : 0
              }`}
              <span className="text-xs uppercase">H</span>{" "}
              {`${
                solvedTickets.length >= 1
                  ? Number(
                      (
                        solvedTickets
                          .map(
                            (data: any) =>
                              new Date(data.closed_time).getTime() -
                              new Date(data.date).getTime()
                          )
                          .reduce((acc: any, value: any) => acc + value, 0) /
                        solvedTickets.length /
                        60000
                      ).toFixed(0)
                    ) % 60
                  : 0
              }`}
              <span className="text-xs uppercase">M</span>
            </div>
            <div className="text-[0.65rem] space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              Resolution Time
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4 px-2 min-h-14 w-full justify-between">
          <div className="dark:text-slate-300 text-slate-900 bg-slate-100 dark:bg-slate-750 rounded p-4 border border-slate-300 dark:border-slate-700">
            <div className="text-base font-bold text-center uppercase">
              {numberWithSpaces(
                data?.filter((data: any) => data?.feedback === "like")?.length
              )}
            </div>
            <div className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-700 font-bold text-center uppercase">
              Positive
            </div>
          </div>
          <div className="dark:text-slate-300 text-slate-900 bg-slate-100 dark:bg-slate-750 rounded p-4 border border-slate-300 dark:border-slate-700">
            <div className="text-base font-bold text-center uppercase">
              {numberWithSpaces(
                data?.filter(
                  (data: any) =>
                    data?.feedback !== "like" && data?.feedback !== "dislike"
                )?.length
              )}
            </div>
            <div className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-700 font-bold text-center uppercase">
              Neutral
            </div>
          </div>
          <div className="dark:text-slate-300 text-slate-900 bg-slate-100 dark:bg-slate-750 rounded p-4 border border-slate-300 dark:border-slate-700">
            <div className="text-base font-bold text-center">
              {numberWithSpaces(
                data?.filter((data: any) => data?.feedback === "dislike")
                  ?.length
              )}
            </div>
            <div className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-700 font-bold text-center uppercase">
              Negative
            </div>
          </div>
        </div>
        <div
          className="flex flex-col mt-2 h-44 space-y-2 w-full overflow-hidden rounded-md 
        p-2"
        >
          <p className=" text-center text-xs font-medium tracking-normal text-slate-600 dark:text-slate-400">
            Real-time report it allows you to check the current status of your
            team's workload , availability and valuable insights or statistics
            about your team's performance.
          </p>
        </div>
      </div>

      <div className="col-span-1 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 py-6 overflow-hidden rounded-md flex flex-col justify-between gap-2 px-4 h-[22rem]">
        <div className="text-base dark:text-slate-300 text-slate-800 font-sans dark:font-semibold font-bold uppercase tracking-wider">
          Tickets Per Category
        </div>
        <div className="h-[13.2rem] w-full px-4 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar space-y-3">
          <CategoryProgress data={data} />
        </div>
      </div>

      {/**Traffic trend chart ======================== */}
      <div className=" h-[22rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 overflow-hidden rounded-md">
        <div className="h-full w-full flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="text-base dark:text-slate-300 text-slate-800 font-sans dark:font-semibold font-bold uppercase tracking-wider mt-1">
              Traffic Trend
            </div>
            <select
              onChange={(e) => setOption(e.target.value)}
              className="h-8 w-20 rounded text-xs dark:text-slate-400 text-slate-500 font-semibold p-2 dark:bg-slate-750 bg-slate-50 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option value="hour">Hourly</option>
              <option value="day">Daily</option>
            </select>
          </div>
          <TrafficChart chartData={chartData} option={option} />
        </div>
      </div>
    </div>
  );
};

export default OverviewReport;
