import React from "react";
import ReactECharts from "echarts-for-react";

const OverviewReport = () => {
  return (
    <div className="col-span-3 bg-slate-900 rounded-xl overflow-hidden">
      <div className="h- w-full p-4 pt-6">
        <h2 className="text-base text-slate-400 font-semibold tracking-normal">
          Performance Overview
        </h2>
        <div className="mt-4 flex space-x-4 h-14 border-b border-slate-800">
          <div className="text-slate-400">
            <h4 className="text-xs space-y-2 font-medium capitalize">
              this month
            </h4>
            <h4 className="text-base font-bold text-center capitalize">58 </h4>
          </div>
          <div className="text-slate-400">
            <h4 className="text-xs space-y-2 font-medium capitalize">
              last month
            </h4>
            <h4 className="text-base font-bold text-center capitalize">72 </h4>
          </div>
          <div className="text-slate-400">
            <h4 className="text-xs space-y-2 font-medium capitalize">
              difference
            </h4>
            <h4 className="text-base font-bold text-center capitalize">14 </h4>
          </div>
        </div>
        <ReactECharts
          style={{ height: "20rem", width: "100%" }}
          option={{
            xAxis: {
              show: true,
              type: "category",
              data: [
                "data",
                "data",
                "data",
                "data",
                "data",
                "data",
                "data",
                "data",
                "data",
              ],
              splitLine: {
                show: false,
              },
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
                data: [12, 52, 85, 45, 21, 50, 25, 69, 54],
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
  );
};

export default OverviewReport;
