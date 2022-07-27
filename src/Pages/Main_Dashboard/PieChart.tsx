import { FC, useMemo } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const PieCharts: FC = () => {
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );

  const data = useMemo(() => {
    return ["Solved", "Open", "On-hold", "Re-opened"]
      .map((status: any) => ({
        value:
          dashboardData.length >= 1 &&
          (
            (dashboardData?.filter(
              (data) =>
                data?.status
                  ?.toLowerCase()
                  ?.replace(/[^a-zA-Z0-9]/g, "")
                  ?.replace(/\s/g, "") ===
                status
                  ?.toLowerCase()
                  ?.replace(/[^a-zA-Z0-9]/g, "")
                  ?.replace(/\s/g, "")
            ).length /
              dashboardData.length) *
            100
          ).toFixed(0)
            ? dashboardData?.filter(
                (data) =>
                  data?.status
                    ?.toLowerCase()
                    ?.replace(/[^a-zA-Z0-9]/g, "")
                    ?.replace(/\s/g, "") ===
                  status
                    ?.toLowerCase()
                    ?.replace(/[^a-zA-Z0-9]/g, "")
                    ?.replace(/\s/g, "")
              ).length
            : 1,
        name: status,
      }))
      ?.sort((a: any, b: any) => {
        return a.value - b.value;
      });
  }, [dashboardData]);

  //Component ====================
  return (
    <div className="w-full h-full flex flex-col justify-between items-center px-4 p-2">
      <PieChart width={150} height={150}>
        <Pie
          data={data}
          cx={75}
          cy={75}
          innerRadius={45}
          outerRadius={65}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((data, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                data.name === "Solved"
                  ? "#10b981"
                  : data.name === "Open"
                  ? "#2563eb"
                  : data?.name === "On-hold"
                  ? "#facc15"
                  : data?.name === "Re-opened"
                  ? "#dc2626"
                  : "#2563eb"
              }
            />
          ))}
        </Pie>
      </PieChart>
      <div className="h-fit w-full border-t border-slate-300 dark:border-slate-700 grid grid-cols-2 place-content-center gap-2 p-2 pl-4 pt-4">
        {data.map((status, index) => (
          <div
            key={index + status.name}
            className="cols-span-1 row-span-1 flex items-center justify-center space-x-2"
          >
            <div
              style={{
                background:
                  status.name === "Solved"
                    ? "#10b981"
                    : status.name === "Open"
                    ? "#2563eb"
                    : status?.name === "On-hold"
                    ? "#facc15"
                    : status?.name === "Re-opened"
                    ? "#dc2626"
                    : "#2563eb",
              }}
              className="h-3 w-3 rounded-full"
            ></div>
            <span className="w-28 overflow-hidden whitespace-nowrap overflow-ellipsis text-xs text-slate-700 dark:text-slate-300 capitalize">
              ({dashboardData?.length <= 0 ? 0 : status?.value}) {status?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieCharts;
