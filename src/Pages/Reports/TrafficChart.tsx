import { FC } from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  chartData: any[];
}

const TrafficChart: FC<Props> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%">
      <AreaChart
        height={220}
        data={chartData}
        margin={{
          top: 10,
          right: 0,
          left: 0,
          bottom: 0,
        }}
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
        <Area type="monotone" dataKey="value" stroke="#1d4ed8" fill="#2563eb" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TrafficChart;
