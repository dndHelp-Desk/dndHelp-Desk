import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const OverviewReport = ({ data }) => {
  const settings = useSelector((state) => state.Tickets.settings);
  const categories = settings.length >= 1 && settings[0].categories;
  const [option, setOption] = useState("hour");
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
  const colorPalettes = ["#1e40af", "#6366f1", "#2563eb", "#3b82f6", "#60a5fa"];
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
          className="h-full text.[0.15rem] border-r dark:border-slate-800 border-slate-400 text-slate-300 relative hover:opacity-80"
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
  let toolTip = option === "day"?"Day":"Time"
  let toolTipEtxra = option === "day"?"":":00Hrs"
  const chartData = [
    ...new Set(
      data.map((data) =>
        option === "day"
          ? new Date(data.date).getDate()
          : new Date(data.date).getHours() + 1
      )
    ),
  ].map((elem) => ({
    name: elem,
    value:
      option === "day"
        ? data.filter((data) => new Date(data.date).getDate() === elem).length
        : data.filter((data) => new Date(data.date).getHours() === elem).length,
    avg_handleTime:
      option === "day"
       //Daily Average handle time Calculation ===============
        ? data.filter((data) => new Date(data.date).getDate() === elem && data.status === "solved" && data.fcr !== "yes").map(data => !(new Date(data.closed_time).getTime() - new Date(data.date).getTime())?0:(new Date(data.closed_time).getTime() - new Date(data.date).getTime())).length >= 1 ?(((data.filter((data) => new Date(data.date).getDate() === elem && data.status === "solved" && data.fcr !== "yes").map(data => !(new Date(data.closed_time).getTime() - new Date(data.date).getTime())?0:(new Date(data.closed_time).getTime() - new Date(data.date).getTime()))).reduce((acc,value) => acc + value,0)/data.filter((data) => new Date(data.date).getDate() === elem).length)/60000).toFixed(0):0
        //Hourly Average handle time Calculation ===============
        : data.filter((data) => new Date(data.date).getHours() === elem && data.status === "solved" && data.fcr !== "yes").map(data => !(new Date(data.closed_time).getTime() - new Date(data.date).getTime())?0:(new Date(data.closed_time).getTime() - new Date(data.date).getTime())).length >= 1?(((data.filter((data) => new Date(data.date).getHours() === elem && data.status === "solved" && data.fcr !== "yes").map(data => !(new Date(data.closed_time).getTime() - new Date(data.date).getTime())?0:(new Date(data.closed_time).getTime() - new Date(data.date).getTime()))).reduce((acc,value) => acc + value,0)/data.filter((data) => new Date(data.date).getHours() === elem).length)/60000).toFixed(0):0
  }));

  //Sort data =========
  chartData.sort((a, b) => {
    return Number(a.name) - Number(b.name);
  });

  //Component =============================
  return (
    <div className="col-span-3 lg:col-span-1  rounded-xl flex flex-col space-y-4">
      <div className="h-[13rem] dark:bg-slate-900 bg-slate-100 w-full p-4 pt-6 overflow-hidden rounded-xl">
        <h2 className="text-xs dark:text-slate-300 text-slate-900 font-sans dark:font-semibold font-bold uppercase tracking-normal">
          Tickets Statistics
        </h2>
        <div className="mt-4 flex space-x-4 px-2 h-14 w-full justify-between">
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center uppercase">
              {
                data.filter(
                  (data) =>
                    new Date(data.date).getMonth() === new Date().getMonth()
                ).length
              }
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              current
            </h4>
          </div>
          <div className="dark:text-slate-400 text-slate-500">
            <h4
              className={`text-base font-semibold text-center capitalize ${
                data.filter(
                  (data) =>
                    new Date(data.date).getMonth() === new Date().getMonth()
                ).length -
                  data.filter(
                    (data) =>
                      new Date(data.date).getMonth() < new Date().getMonth()
                  ).length >=
                0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {data.filter(
                (data) =>
                  new Date(data.date).getMonth() === new Date().getMonth()
              ).length -
                data.filter(
                  (data) =>
                    new Date(data.date).getMonth() < new Date().getMonth()
                ).length}
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              difference
            </h4>
          </div>
          <div className="dark:text-slate-300 text-slate-700">
            <h4 className="text-base font-semibold text-center">
              {`${Number(
                (
                  chartData
                    .map((data) => data.avg_handleTime)
                    .reduce((acc, value) => acc + Number(value), 0) /
                  chartData.length
                ).toFixed(0) / 60
              ).toFixed(0)}`}
              <span className="text-xs">hrs</span>{" "}
              {`${Number(
                (
                  chartData
                    .map((data) => data.avg_handleTime)
                    .reduce((acc, value) => acc + Number(value), 0) /
                  chartData.length
                ).toFixed(0) % 60
              )}`}
              <span className="text-xs">mins</span>
            </h4>
            <h4 className="text-[0.6rem] space-y-2 dark:text-slate-400 text-slate-500 font-semibold text-center uppercase">
              AV Age of Query
            </h4>
          </div>
        </div>
        <div className="flex flex-col h-16 space-y-2 w-full justify-center">
          <small className="text-xs space-y-2 font-semibold tracking-normal capitalize dark:text-slate-300 text-slate-900">
            Top 5 categories
          </small>
          <div className="h-2.5 w-full rounded-full dark:bg-slate-700 bg-slate-200 flex overflow-hidden border dark:border-slate-800 border-slate-400">
            {category}
          </div>
        </div>
      </div>

      {/**Traffic trend chart ======================== */}
      <div className="h-[18rem] dark:bg-slate-900 bg-slate-100 w-full p-4 overflow-hidden rounded-xl">
        <div className="h-full w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="text-xs dark:text-slate-300 text-slate-900 font-sans dark:font-semibold font-bold uppercase tracking-normal">
              Traffic
            </h2>
            <select
              onChange={(e) => setOption(e.target.value)}
              className="h-8 w-20 rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option value="hour">Hourly</option>
              <option value="day">Daily</option>
            </select>
          </div>
          <ReactECharts
            style={{ height: "100%", width: "100%" }}
            option={{
              xAxis: {
                show: true,
                type: "category",
                data: chartData.map((data) => data.name),
                splitNumber: 1,
                splitLine: {
                  show: false,
                },
                axisLine: {
                  show: true,
                  lineStyle: { color: "#64748b" },
                },
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
                  data: chartData.map((data) => data.value),
                  type: "line",
                  smooth: true,
                  showSymbol: false,
                  lineStyle: { width: 2 },
                  areaStyle: {},
                },
              ],
              tooltip: {
                trigger: "axis",
                formatter: `${toolTip} {b0}${toolTipEtxra} : {c0} Tickets`,
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
