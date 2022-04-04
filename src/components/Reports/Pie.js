import React from "react";
import ReactECharts from "echarts-for-react";
import { useSelector } from "react-redux";

const Pie = ({ data }) => {
  const theme = useSelector((state) => state.UserInfo.theme);
  const categories = useSelector((state) => state.Tickets.categories);

  //Component ================================
  return (
    <>
      <ReactECharts
        style={{
          height: "100%",
          width: "100%",
        }}
        option={{
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              name: "KPI",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              data:
                categories.length >= 1 &&
                categories
                  .map((category) => ({
                    value:
                      data.length >= 1 &&
                      data.filter(
                        (data) =>
                          data.category.toLowerCase() === category.toLowerCase()
                      ).length,
                    name: category,
                  }))
                  .sort(function (a, b) {
                    return a.value - b.value;
                  }),
              label: {
                color: theme === "dark" ? "#cbd5e1" : "#1e293b",
				width:60
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
    </>
  );
};

export default Pie;
