import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const CategoryPies = ({ data }) => {
  const theme = useSelector(state => state.UserInfo.theme)
  const series = [data];
  const options = {
    chart: {
      id: "simple-bar",
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "35%",
        },
        dataLabels: {
          show: false,
        },
        track: {
          background: theme === "dark" ? "#1e293b" : "#cbd5e1",
        },
      },
    },
    labels: ["Category"],
    fill: {
      colors: ["#2563eb"],
    },
  };
  return (
    <div>
      <Chart options={options} type="radialBar" series={series} height="100" />
    </div>
  );
};

export default CategoryPies;
