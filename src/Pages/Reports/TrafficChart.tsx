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
        show: false,
        rotate: 0,
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
      custom: function ({
        series,
        seriesIndex,
        dataPointIndex,
      }: {
        series: any;
        seriesIndex: any;
        dataPointIndex: any;
      }) {
        return (
          '<div class="text-xs font-semibold bg-slate-50 p-2">' +
          "<span>" +
          "&nbsp;" +
          (option !== "hour" ? "Day " : "Hour | ") +
          chartData.map((data: any) => data.name)[dataPointIndex] +
          (option === "hour" ? ":00" : "") +
          " &nbsp; - &nbsp;" +
          series[seriesIndex][dataPointIndex] +
          "&nbsp;" +
          "Ticket/s" +
          "</span>" +
          "</div>"
        );
      },
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
