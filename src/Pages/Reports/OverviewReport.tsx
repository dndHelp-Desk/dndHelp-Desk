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
    return (
      option === "day"
        ? [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
          ]
        : option === "month"
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12]
        : [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23, 24,
          ]
    )?.map((elem) => ({
      name:
        option !== "day" && option !== "month"
          ? elem + ":00"
          : option === "month"
          ? [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ][elem - 1]
          : elem,
      value:
        option === "day"
          ? data?.filter((data: any) => new Date(data.date).getDate() === elem)
              ?.length
          : option === "month"
          ? data?.filter(
              (data: any) => new Date(data.date).getMonth() + 1 === elem
            )?.length
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
    <div className="w-full rounded-md grid grid-cols-2 lg:grid-cols-6 gap-4">
      {/**Tickets Summary ================ */}
      <div className="col-span-2 h-[23rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 pt-6 overflow-hidden rounded-md">
        <div className="text-base dark:text-slate-300 text-slate-800 font-sans dark:font-semibold font-bold uppercase tracking-wider">
          Tickets Summary
        </div>
        <div className="mt-4 p-2 px-6 grid grid-cols-2 grid-rows-3 w-full h-[18rem]">
          <div className="col-span-1 row-span-1 border-b dark:border-slate-700 border-slate-300 flex flex-col justify-center items-center dark:text-slate-300 text-slate-900">
            <div className="text-lg font-bold text-center uppercase">
              {numberWithSpaces(data?.length)}
            </div>
            <div className="text-xs tracking-wider space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              Total Tickets
            </div>
          </div>
          <div className="col-span-1 row-span-1 border-b dark:border-slate-700 border-slate-300 flex flex-col justify-center items-center dark:text-slate-300 text-slate-800">
            <div className="text-lg font-bold text-center uppercase">
              {numberWithSpaces(totalAggregate)}
            </div>
            <div className="text-xs tracking-wider space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              Total Messages
            </div>
          </div>
          <div className="col-span-1 row-span-1 flex flex-col justify-center items-center dark:text-slate-300 text-slate-800">
            <div className="text-lg font-bold text-center">
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
            <div className="text-xs tracking-wider space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              Resolution Time
            </div>
          </div>
          <div className="col-span-1 row-span-1 flex flex-col justify-center items-center dark:text-slate-300 text-slate-800">
            <div className="text-lg font-bold text-center">
              {Number((Number(totalAggregate) / data?.length)?.toFixed(2)) > 1
                ? (Number(totalAggregate) / data?.length)?.toFixed(2)
                : 0}
            </div>
            <div className="text-xs tracking-wider space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              Avg responses
            </div>
          </div>
          {/**Ratings ==================== */}
          <div className="col-span-1 row-span-1 border-t dark:border-slate-700 border-slate-300 flex flex-col justify-center items-center dark:text-slate-300 text-slate-800">
            <div className="text-lg font-bold text-center">
              {data?.filter((data: any) => data?.feedback === "like").length}
            </div>
            <div className="text-xs tracking-wider space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              negative feedback
            </div>
          </div>
          <div className="col-span-1 row-span-1 border-t dark:border-slate-700 border-slate-300 flex flex-col justify-center items-center dark:text-slate-300 text-slate-800">
            <div className="text-lg font-bold text-center">
              {data?.filter((data: any) => data?.feedback === "dislike").length}
            </div>
            <div className="text-xs tracking-wider space-y-2 dark:text-slate-400 text-slate-700 font-sans font-semibold text-center capitalize">
              positive feedback
            </div>
          </div>
        </div>
      </div>

      {/**Tickets By Category ================================= */}
      <div className="col-span-2 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 py-6 overflow-hidden rounded-md flex flex-col justify-between gap-2 px-4 h-[23rem]">
        <div className="text-base dark:text-slate-300 text-slate-800 font-sans dark:font-semibold font-bold uppercase tracking-wider">
          Tickets Per Category
        </div>
        <div className="h-[15rem] w-full px-4 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar space-y-5">
          <CategoryProgress data={data} />
        </div>
      </div>

      {/**Traffic trend chart ======================== */}
      <div className="col-span-2 h-[23rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 overflow-hidden rounded-md">
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
              <option value="month">Monthly</option>
            </select>
          </div>
          <TrafficChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default OverviewReport;
