import { FC } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const RadialBar: FC = () => {
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.dashboardData
  );
  const theme = useSelector((state: RootState) => state.UserInfo.theme);
  const data =
    dashboardData.length >= 1
      ? (
          (dashboardData.filter(
            (data) => data?.status?.toLowerCase() === "solved"
          ).length /
            dashboardData?.length) *
          100
        )?.toFixed(0)
      : 0;

  const series = [Number(data)];

  const options = {
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false,
        },
        track: {
          background: theme === "dark" ? "#334155" : "#e2e8f0",
        },
        label: "Progress",
      },
    },
    colors: ["#2563eb"],
    tooltip: {
      enabled: true,
    },
  };
  return (
    <Chart type="radialBar" series={series} options={options} height="150px" />
  );
};

export default RadialBar;
