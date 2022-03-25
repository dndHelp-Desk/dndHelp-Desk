import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const SummaryPie = () => {
  const filteredTickets = useSelector((state) => state.Tickets.filteredTickets);
  const theme = useSelector((state) => state.UserInfo.theme);

  //Component =========================
  return (
    <ReactECharts
      style={{
        height: "100%",
        width: "100%",
      }}
      option={{
        backgroundColor: theme === "dark" ? "#1e293b18" : "#f1f5f9",
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "KPI",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            data: [
              {
                value: filteredTickets.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        30
                      ).getTime() &&
                    data.status.toLowerCase() === "solved"
                ).length,
                name: "Solved",
              },
              {
                value: filteredTickets.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        30
                      ).getTime() &&
                    data.reopened === true
                ).length,
                name: "Re-Opened",
              },
              {
                value: filteredTickets.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        30
                      ).getTime() &&
                    data.status.toLowerCase() === "on hold"
                ).length,
                name: "On-Hold",
              },
              {
                value: filteredTickets.filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        1
                      ).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date().getFullYear(),
                        new Date().getMonth(),
                        30
                      ).getTime() &&
                    data.status.toLowerCase() === "open"
                ).length,
                name: "Open",
              },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            label: {
              color: theme === "dark" ? "#cbd5e1" : "#1e293b",
            },
            labelLine: {
              lineStyle: {
                color: theme === "dark" ? "#cbd5e1" : "#1e293b",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#2563eb",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: 10,
              borderColor: theme === "dark" ? "#94a3b8" : "#475569",
              borderWidth: 1,
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      }}
    />
  );
};

export default SummaryPie;
