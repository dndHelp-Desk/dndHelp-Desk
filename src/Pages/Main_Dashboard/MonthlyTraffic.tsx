import { FC } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface Props {
  monthlyData: any[];
}

const MonthlyTraffic: FC<Props> = ({ monthlyData }) => {
  const theme = useSelector((state: RootState) => state.UserInfo.theme);

  //Component ===================
  return (
    <ResponsiveContainer width="100%">
      <BarChart
        height={250}
        data={monthlyData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        barGap="6"
        barSize={12}
      >
        <XAxis
          dataKey="name"
          style={{
            fontSize: "0.8rem",
            fontFamily: "sans-serif",
            color: "#fff",
          }}
        />
        <Tooltip cursor={false} />
        <Bar
          dataKey="value"
          fill="#2563eb"
          background={{ fill: theme !== "dark" ? "#e2e8f0" : "#334155" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default MonthlyTraffic;
