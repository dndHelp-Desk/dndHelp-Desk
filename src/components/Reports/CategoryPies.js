import React from "react";
import Chart from "react-apexcharts";

const CategoryPies = ({ data }) => {
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
          background: "#1e293b",
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
