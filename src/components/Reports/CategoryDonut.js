import React from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const CategoryDonut = ({ data }) => {
  const categories = useSelector((state) => state.Tickets.categories);

  const series =
    categories.length >= 1 &&
    categories.map(
      (category) =>
        data.length >= 1 &&
        data.filter(
          (data) => data.category.toLowerCase() === category.toLowerCase()
        ).length
    );

  const options = {
    chart: {
      id: "TICKETS PER CATEGORY",
    },
    plotOptions: {},
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    colors: ["#2563eb"],
    labels: categories,
    stroke: {
      width: 1,
      curve: "smooth",
    },
  };

  return (
    <div className="h-[90%] overflow-hidden">
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height="250"
      />
    </div>
  );
};

export default CategoryDonut;
