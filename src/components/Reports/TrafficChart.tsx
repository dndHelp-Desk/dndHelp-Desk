import { FC } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

type chartData = any;

const TrafficChart: FC<chartData> = ({ chartData }) => {
  const theme = useSelector((state: RootState) => state.UserInfo.theme);

  const series = [
    {
      name: "Traffic",
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
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      categories: chartData.map((data: any) => data.name),
      labels: {
        show: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        colors: theme !== "dark" ? ["#1e293b"] : ["#94a3b8"],
        style: {
          colors: theme !== "dark" ? ["#1e293b"] : ["#94a3b8"],
          fontSize: "12px",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 500,
        },
      },
      tooltip: {
        enabled: false,
        formatter: (val: any) => val + ":00hrs",
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: true,
        color: theme !== "dark" ? "#1e293b" : "#94a3b8",
        height: 1,
        width: "100%",
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
    },
    stroke: {
      curve: "smooth",
      width: 2,
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
