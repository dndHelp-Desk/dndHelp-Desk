import { FC } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { data } from "./OverviewReport";

const CategoryChart: FC<data> = ({ data }) => {
  const theme = useSelector((state: RootState) => state.UserInfo.theme);
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );

  const series: any = [
    {
      name: "Tickets",
      data: categories
        ?.map(
          (category) =>
            data.length >= 1 &&
            data.filter(
              (data: any) =>
                data.category?.toLowerCase() === category?.toLowerCase()
            )?.length
        )
        .sort((a: any, b: any) => b - a),
    },
  ];

  const options: any = {
    chart: {
      id: "TICKETS PER CATEGORY",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: categories,
    stroke: {
      width: 1,
      curve: "smooth",
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
    xaxis: {
      categories: categories, //will be displayed on the x-asis
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
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
    <div className="h-[90%] overflow-hidden">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="260"
      />
    </div>
  );
};

export default CategoryChart;
