import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const OverviewReport = () => {
  const allTickets = useSelector((state) => state.Tickets.allTickets);
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);

  //Preping daily count  Data==============
  let dailyCountObj =
    filteredTickets.length >= 1 &&
    filteredTickets.reduce((result, item) => {
      result[item.date.split(/\D/)[1]] =
        (result[item.date.split(/\D/)[1]] || 0) + 1;
      return result;
    }, {});
  let dailyCountArray = Object.getOwnPropertyNames(dailyCountObj).map(
    (name) => {
      return { name, value: dailyCountObj[name] };
    }
  );
  dailyCountArray.sort((a, b) => Number(a.name) - Number(b.name));



  //Component =============================
  return (
    <div className="col-span-3 min-h-[20rem] dark:bg-slate-900 bg-slate-100 rounded-xl overflow-hidden">
      <div className="h-full w-full p-4 pt-6 grid grid-rows-6 overflow-hidden">
        <div className="row-span-2">
          <h2 className="text-base dark:text-slate-400 text-slate-500 font-semibold tracking-normal">
            Total Messages
          </h2>
          <div className="mt-4 flex space-x-4 h-14 border-b dark:border-slate-800 border-slate-300">
            <div className="dark:text-slate-400 text-slate-500">
              <h4 className="text-xs space-y-2 font-medium capitalize">
                this month
              </h4>
              <h4 className="text-base font-bold text-center capitalize">
                {allTickets.length >= 1 &&
                  allTickets.filter(
                    (data) =>
                      new Date(data.date).getMonth() === new Date().getMonth()
                  ).length}
              </h4>
            </div>
            <div className="dark:text-slate-400 text-slate-500">
              <h4 className="text-xs space-y-2 font-medium capitalize">
                last month
              </h4>
              <h4 className="text-base font-bold text-center capitalize">
                {allTickets.length >= 1 &&
                  allTickets.filter(
                    (data) =>
                      new Date(data.date).getMonth() < new Date().getMonth()
                  ).length}
              </h4>
            </div>
            <div className="dark:text-slate-400 text-slate-500">
              <h4 className="text-xs space-y-2 font-medium capitalize">
                difference
              </h4>
              <h4 className="text-base font-bold text-center capitalize">
                {allTickets.length >= 1 &&
                  allTickets.filter(
                    (data) =>
                      new Date(data.date).getMonth() < new Date().getMonth()
                  ).length -
                    allTickets.filter(
                      (data) =>
                        new Date(data.date).getMonth() === new Date().getMonth()
                    ).length}
              </h4>
            </div>
          </div>
        </div>
        <div className="row-span-4 w-full overflow-hidden">
          <ReactECharts
            style={{ height: "100%", width: "100%" }}
            option={{
              xAxis: {
                show: true,
                type: "category",
                data: dailyCountArray.map((data) => data.name),
                splitLine: {
                  show: false,
                },
                min: 1,
              },
              yAxis: {
                show: true,
                type: "value",
                splitLine: {
                  show: false,
                },
                min: 0,
              },
              series: [
                {
                  data: dailyCountArray.map((data) => data.value),
                  type: "line",
                  smooth: true,
                  showSymbol: false,
                  lineStyle: { width: 2 },
                  areaStyle: {},
                },
              ],
              tooltip: { trigger: "axis", formatter: "{b0} : {c0}" },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewReport;
