import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const OverviewReport = ({data}) => {
  const settings = useSelector((state) => state.Tickets.settings);
  const categories = settings.length >= 1 && settings[0].categories;
  const dataArray = [];
  categories.length >= 1 &&
    categories.forEach((element) => {
      dataArray.push({
        name: element,
        value: (
          ((data.length >= 1 &&
            data.filter(
              (ticket) =>
                ticket.category.toLowerCase() === element.toLowerCase()
            ).length) /
            data.length) *
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
    data.length >= 1 &&
    data.reduce((result, item) => {
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
  let dailyTraffic = [];
  for (let i = 0; i <= 31; i++) {
    dailyTraffic.push({
      day: i,
      value:
        data.length >= 1 &&
        data.filter((day) => new Date(day.date).getDate() === i)
          .length >= 1
          ? data.filter((day) => new Date(day.date).getDate() === i)
              .length
          : 0,
    });
  }
  //Sort data =========
  dailyTraffic.sort((a, b) => {
    return a.day - b.day;
  });

  //Component =============================
  return (
    <div className="col-span-3 lg:col-span-1  rounded-xl flex flex-col space-y-4">
      <div className="h-[13rem] dark:bg-slate-900 bg-slate-100 w-full p-4 pt-6 overflow-hidden rounded-xl">
        <h2 className="text-sm dark:text-slate-300 text-slate-900 font-sans font-semibold tracking-normal">
          Total Tickets
        </h2>
        <div className="mt-4 flex space-x-4 h-14 w-full justify-between">
          <div className="dark:text-slate-400 text-slate-500">
            <h4 className="text-base font-bold text-center uppercase">
              {data.length >= 1 &&
                data.filter(
                  (data) =>
                    new Date(data.date).getMonth() === new Date().getMonth()
                ).length}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 font-medium uppercase">
              current
            </h4>
          </div>
          <div className="dark:text-slate-400 text-slate-500">
            <h4 className="text-base font-bold text-center uppercase">
              {data.length >= 1 &&
                data.filter(
                  (data) =>
                    new Date(data.date).getMonth() < new Date().getMonth()
                ).length}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 font-medium uppercase">
              previous
            </h4>
          </div>
          <div className="dark:text-slate-400 text-slate-500">
            <h4 className="text-base font-bold text-center capitalize">
              {data.length >= 1 &&
                data.filter(
                  (data) =>
                    new Date(data.date).getMonth() < new Date().getMonth()
                ).length -
                  data.filter(
                    (data) =>
                      new Date(data.date).getMonth() === new Date().getMonth()
                  ).length}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 font-medium uppercase">
              difference
            </h4>
          </div>
        </div>
        <div className="flex flex-col h-16 space-y-2 w-full justify-center">
          <small className="text-xs space-y-2 font-semibold tracking-normal capitalize dark:text-slate-300 text-slate-900">
            Top 5 categories
          </small>
          <div className="h-2.5 w-full rounded-full dark:bg-slate-700 flex overflow-hidden border dark:border-slate-800 border-slate-400">
            {category}
          </div>
        </div>
      </div>

      {/**Traffic trend chart ======================== */}
      <div className="h-[18rem] dark:bg-slate-900 bg-slate-100 w-full p-4 overflow-hidden rounded-xl">
        <div className="h-full w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-sm dark:text-slate-300 text-slate-900 font-sans font-semibold tracking-normal">
              Daily Traffic
            </h2>
            <select className="h-8 w-20 rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none">
              <option>Daily</option>
              <option>Hourly</option>
            </select>
          </div>
          <ReactECharts
            style={{ height: "100%", width: "100%" }}
            option={{
              xAxis: {
                show: true,
                type: "category",
                data: dailyTraffic.map((data) => data.day),
                splitNumber: 1,
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: true,
                  lineStyle: { color: "#64748b" },
                },
                min: 1,
              },
              yAxis: {
                show: true,
                type: "value",
                splitNumber: 1,
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: true,
                  lineStyle: { color: "#64748b" },
                },
                min: 0,
              },
              series: [
                {
                  data: dailyTraffic.map((data) => data.value),
                  type: "line",
                  smooth: true,
                  showSymbol: false,
                  lineStyle: { width: 2 },
                  areaStyle: {},
                },
              ],
              tooltip: {
                trigger: "axis",
                formatter: "Day-{b0} : {c0} Tickets",
                backgroundColor: "#94a3b8",
                borderColor: "#94a3b8",
                textStyle: {
                  color: "#fff",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverviewReport;
