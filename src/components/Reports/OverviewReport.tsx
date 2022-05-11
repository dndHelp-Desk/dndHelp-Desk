import { FC, useState, useMemo } from "react";
import { FaChartBar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import CategoryProgress from "./CategoryProgress";
import TrafficChart from "./TrafficChart";

export type data = any;

const OverviewReport: FC<data> = ({ data}) => {
  const reportsData = useSelector(
    (state: RootState) => state.Tickets.reportsData
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const [option, setOption] = useState<string>("hour");
  const categoriesData = useMemo(() => {
    return (
      categories.length >= 1 &&
      categories.map((element) => {
        return {
          name: element,
          value: (
            ((data.length >= 1 &&
              data.filter(
                (ticket: any) =>
                  ticket.category.toLowerCase() === element.toLowerCase()
              ).length) /
              data.length) *
            100
          ).toFixed(1),
        };
      })
    );
  }, [categories, data]);

  categoriesData &&
    categoriesData.sort((a, b) => {
      return Number(b.value) - Number(a.value);
    });

  //Total Calls Incoming or Outgoing ===========================
  const totalAggregate = useMemo(() => {
    return reportsData.length >= 1 && data.length >= 1
      ? reportsData.filter((ticket: any) =>
          data.some((item: any) => item.ticket_id === ticket.ticket_id)
        ).length
      : 0;
  }, [reportsData, data]);

  //Preping daily count  Data==============
  const solvedTickets =
    data.length >= 1 &&
    data.filter(
      (ticket: any) => ticket.status === "solved" && ticket.fcr === "no"
    );

  //Trafiic Chart Data ===============
  const chartData = useMemo(() => {
    return Array.from(
      new Set(
        data.map((data: any) =>
          option === "day"
            ? new Date(data.date).getDate()
            : new Date(data.date).getHours() + 1
        )
      )
    ).map((elem) => ({
      name: elem,
      value:
        option === "day"
          ? data.filter((data: any) => new Date(data.date).getDate() === elem)
              .length
          : data.filter((data: any) => new Date(data.date).getHours() === elem)
              .length,
    }));
  }, [data, option]);

  //Sort data =========
  chartData.sort((a, b) => {
    return Number(a.name) - Number(b.name);
  });

  //Calculate The resolution Rate ==========
  const ratings: any = useMemo(() => {
    return (
      (data.filter(
        (ticket: any) => ticket.status === "solved" && ticket.reopened === false
      ).length /
        data.length) *
      100
    ).toFixed(1);
  }, [data]);

  //Component =============================
  return (
    <div className="w-full rounded-md grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className=" h-[20rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 pt-6 overflow-hidden rounded-md shadow">
        <h2 className="text-xs dark:text-slate-300 text-slate-900 dark:font-semibold font-bold uppercase tracking-wider">
          Tickets Statistics
        </h2>
        <div className="mt-6 flex space-x-4 px-2 h-14 w-full justify-between  border-b border-slate-300 dark:border-slate-700">
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center uppercase">
              {data.length}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              Total Tickets
            </h4>
          </div>
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center uppercase">
              {totalAggregate}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              Aggregate
            </h4>
          </div>
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center">
              {`${
                solvedTickets.length >= 1
                  ? (
                      Number(
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
                      ) / 60
                    )
                      .toString()
                      .split(".")[0]
                  : 0
              }`}
              <span className="text-xs">hr</span>{" "}
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
              <span className="text-xs">min</span>
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              AV Age of Query
            </h4>
          </div>
        </div>
        <div
          className="flex flex-col mt-2 h-44 space-y-2 w-full overflow-hidden rounded-md 
        p-2"
        >
          <h3 className="text-sm dark:text-slate-300 text-slate-700 font-sans dark:font-medium font-bold capitalize tracking-wider flex items-center space-x-2">
            <span>
              Welcome back, {user[0]?.name && user[0]?.name.split(" ")[0]}
            </span>{" "}
            <FaChartBar className="text-blue-700 text-lg" />
          </h3>
          <p className="text-xs font-medium tracking-normal text-slate-600 dark:text-slate-400">
            More features will be added soon in the meantime explore the reports
            by making use of filters. You can find your current satisfaction
            rating below.
          </p>
          <div className="">
            <h4 className="dark:text-slate-300 text-slate-700 font-semibold text-sm">
              {ratings !== "NaN" ? ratings : "0.0"}%
            </h4>
            <div className="flex w-full items-center text-2xl">
              <span
                className={`${
                  ratings > 20
                    ? "text-yellow-600"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <abbr title="Bad Performer">&#9733;</abbr>
              </span>{" "}
              <span
                className={`${
                  ratings > 40
                    ? "text-yellow-600"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <abbr title="Poor Performer">&#9733;</abbr>
              </span>{" "}
              <span
                className={`${
                  ratings > 60
                    ? "text-yellow-600"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <abbr title="Under Performer">&#9733;</abbr>
              </span>{" "}
              <span
                className={`${
                  ratings > 80
                    ? "text-yellow-600"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <abbr title="Good Performer">&#9733;</abbr>
              </span>{" "}
              <span
                className={`${
                  ratings > 95
                    ? "text-yellow-600"
                    : "text-slate-700 dark:text-slate-300"
                }`}
              >
                <abbr title="Excellent Performer">&#9733;</abbr>
              </span>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1 dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 py-6 overflow-hidden rounded-md shadow flex flex-col gap-2 px-4 h-[20rem]">
        <h2 className="text-xs dark:text-slate-300 text-slate-900 dark:font-semibold font-bold uppercase tracking-wider flex-[2]">
          Tickets Per Category
        </h2>
        <div className="flex-[8] w-full px-4 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
          <CategoryProgress data={data} />
        </div>
      </div>

      {/**Traffic trend chart ======================== */}
      <div className=" h-[20rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 w-full p-4 overflow-hidden rounded-md shadow">
        <div className="h-full w-full flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-xs dark:text-slate-300 text-slate-900 dark:font-semibold font-bold uppercase tracking-wider">
              AVG Traffic
            </h2>
            <select
              onChange={(e) => setOption(e.target.value)}
              className="h-8 w-20 rounded text-xs dark:text-slate-500 text-slate-500 font-semibold p-2  pt-1 dark:bg-slate-900 bg-slate-50 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
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
