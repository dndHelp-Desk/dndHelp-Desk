import { FC } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { data } from "./OverviewReport";

const CategoryDonut: FC<data> = ({ data }) => {
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );

  const series: any =
    categories.length >= 1 &&
    categories.map(
      (category) =>
        data.length >= 1 &&
        data.filter(
          (data: any) => data.category.toLowerCase() === category.toLowerCase()
        ).length
    );

  const options: any = {
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
