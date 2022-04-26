import { FC } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

type chartData = any;

const TrafficChart: FC<chartData> = ({ chartData, option }) => {
  const theme = useSelector((state: RootState) => state.UserInfo.theme);

  const series = [
    {
      name: "Tickets Per Hour/Day ",
      data: chartData.map((data: any) =>
        (data.value / chartData.length).toFixed(0)
      ),
    },
  ];

  const options: any = {
    chart: {
      zoom: {
        enabled: false,
      },
      stacked: true,
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      type: "category",
      tickAmount: 13,
      categories: chartData.map((data: any) => data.name),
      labels: {
        show: true,
        rotate: 0,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        color: theme !== "dark" ? "#1e293b" : "#94a3b8",
        height: 0.5,
        width: "100%",
        offsetY: 3,
      },
    },
    yaxis: {
      labels: {
        show: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        colors: theme !== "dark" ? ["#1e293b"] : ["#94a3b8"],
        maxHeight: 120,
        style: {
          colors: theme !== "dark" ? ["#1e293b"] : ["#94a3b8"],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      axisBorder: {
        show: false,
      },
    },
    fill: {
      colors: ["#3b82f6"],
      opacity: 0.7,
      type: "solid",
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    colors: ["#2563eb"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
        formatter: (val: any) => (option !== "day" ? val + ":00hrs" : val),
      },
    },
  };

  return (
    <div className="h-[80%] overflow-hidden">
      <Chart
        type="area"
        series={series}
        options={options}
        width="100%"
        className="h-full"
      />
    </div>
  );
};

export default TrafficChart;
