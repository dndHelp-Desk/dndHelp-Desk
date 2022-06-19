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
      roundCaps
      sections={[{ value: Number(data), color: "#2563eb" }]}
      label={
        <Text color="#1d4ed8" weight={700} align="center" size="sm">
          {Number(data)}%
        </Text>
      }
    />
  );
};

export default RadialBar;
