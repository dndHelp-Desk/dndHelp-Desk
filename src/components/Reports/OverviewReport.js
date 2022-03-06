import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const OverviewReport = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const settings = useSelector((state) => state.Tickets.settings);
  const categories = settings.length >= 1 && settings[0].categories;
  const dataArray = [];
  categories.length >= 1 &&
    categories.forEach((element) => {
      dataArray.push({
        name: element,
        value: (
          ((filteredTickets.length >= 1 &&
            filteredTickets.filter(
              (ticket) =>
                ticket.category.toLowerCase() === element.toLowerCase()
            ).length) /
            filteredTickets.length) *
          100
        ).toFixed(1),
      });
    });

  dataArray.sort((a, b) => {
    return Number(b.value) - Number(a.value);
  });

  //Top 5 categories Bar ==================
  const colorPalettes = ["#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa"];
  const topFive = dataArray.length >= 5 ? dataArray.slice(0, 5) : dataArray;
  const category =
    topFive.length >= 1 &&
    topFive.map((element, index) => {
      return (
        <div
          key={index}
          style={{
            width: `${
              Number(element.value)
                ? parseFloat(element.value).toFixed(1)
                : "0.0"
            }%`,
            backgroundColor: `${colorPalettes[index]}`,
          }}
          className="h-full text.[0.15rem] border-r dark:border-slate-800 text-slate-300 relative hover:opacity-80"
        >
          <abbr
            title={`${element.name} : ${
              Number(element.value) ? parseFloat(element.value).toFixed(0) : 0
            }%`}
          >
            <div className="w-full h-full"></div>
          </abbr>
        </div>
      );
    });

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
    <div className="col-span-3 lg:col-span-1  rounded-xl flex flex-col space-y-4">
      <div className="h-[13rem] dark:bg-slate-900 bg-slate-100 w-full p-4 pt-6 overflow-hidden rounded-xl">
        <h2 className="text-base dark:text-slate-400 text-slate-600 font-sans font-semibold tracking-normal">
          Total Tickets
        </h2>
        <div className="mt-4 flex space-x-4 h-14 w-full justify-between border-b dark:border-slate-800 border-slate-300">
          <div className="dark:text-slate-400 text-slate-500">
            <h4 className="text-xs space-y-2 font-medium capitalize">
              current
            </h4>
            <h4 className="text-base font-bold text-center capitalize">
              {filteredTickets.length >= 1 &&
                filteredTickets.filter(
                  (data) =>
                    new Date(data.date).getMonth() === new Date().getMonth()
                ).length}
            </h4>
          </div>
          <div className="dark:text-slate-400 text-slate-500">
            <h4 className="text-xs space-y-2 font-medium capitalize">
              previous
            </h4>
            <h4 className="text-base font-bold text-center capitalize">
              {filteredTickets.length >= 1 &&
                filteredTickets.filter(
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
              {filteredTickets.length >= 1 &&
                filteredTickets.filter(
                  (data) =>
                    new Date(data.date).getMonth() < new Date().getMonth()
                ).length -
                  filteredTickets.filter(
                    (data) =>
                      new Date(data.date).getMonth() === new Date().getMonth()
                  ).length}
            </h4>
          </div>
          <div className="dark:text-slate-400 text-slate-500">
            <h4 className="text-xs space-y-2 font-medium capitalize">
              <span className="hidden sm:inline">Avg</span> Duration
            </h4>
            <h4 className="text-base font-bold text-center capitalize">
              {filteredTickets.length >= 1 &&
                filteredTickets.filter(
                  (data) =>
                    new Date(data.date).getMonth() < new Date().getMonth()
                ).length -
                  filteredTickets.filter(
                    (data) =>
                      new Date(data.date).getMonth() === new Date().getMonth()
                  ).length}
            </h4>
          </div>
        </div>
        <div className="flex flex-col h-20 space-y-2 w-full justify-center">
          <small className="text-xs space-y-2 font-semibold tracking-normal capitalize dark:text-slate-400 text-slate-500">
            Top 5 categories
          </small>
          <div className="h-2 w-full rounded-full dark:bg-slate-700 flex overflow-hidden">
            {category}
          </div>
        </div>
      </div>

      {/**Traffic trend chart ======================== */}
      <div className="h-[18rem] dark:bg-slate-900 bg-slate-100 w-full p-4 overflow-hidden rounded-xl">
        <div className="h-full w-full overflow-hidden">
          <h2 className="text-base dark:text-slate-400 text-slate-600 font-sans font-semibold tracking-normal">
            Daily Traffic
          </h2>
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
