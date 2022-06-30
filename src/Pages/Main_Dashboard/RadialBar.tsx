import { FC } from "react";
import { RingProgress, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const RadialBar: FC = () => {
  const dashboardData = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
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

  return (
    <RingProgress
      size={90}
      thickness={8}
      sections={[{ value: Number(data), color: "#4f46e5" }]}
      label={
        <Text color="#4f46e5" weight={700} align="center" size="sm">
          {Number(data)}%
        </Text>
      }
    />
  );
};

export default RadialBar;
