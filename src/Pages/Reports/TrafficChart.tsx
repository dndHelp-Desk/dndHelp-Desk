import { FC } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

type chartData = any;

const TrafficChart: FC<chartData> = ({ chartData, option }) => {
  const theme = useSelector((state: RootState) => state.UserInfo.theme);

  const series = [
    {
      name: "Tickets",
      data: chartData.map((data: any) => data.value),
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
      enabled: false,
    },
    xaxis: {
      type: "category",
      tickAmount: 13,
      categories: chartData.map((data: any) => data.name),
      tooltip: {
        enabled: false,
      },
      labels: {
        show: true,
        rotate: 0,
        style: {
          colors: theme !== "dark" ? "#1e293b" : "#94a3b8",
          fontSize: "12px",
          fontFamily: "sans-serif",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
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
          fontFamily: "sans-serif",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      axisBorder: {
        show: false,
      },
    },
    fill: {
      colors: ["#1d4ed8"],
      opacity: 0.9,
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
    colors: ["#1d4ed8"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      enabled: true,
    },
    markers: {
      size: [4, 7],
      strokeColors: theme !== "dark" ? ["#f8fafc"] : ["#1e293b"],
    },
  };

  return (
    <div className="h-[80%] overflow-hidden">
      <Chart type="area" series={series} options={options} height="100%" />
    </div>
  );
};

export default TrafficChart;
