import React from "react";
import { Pie } from "@ant-design/plots";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import "../analytics.scss";

const PieChartPage = () => {
  const { loading, analyticsData, loader } = useSelector(
    (state) => state.analyticsReducer
  );

  // Check if successRate exists and is an object
  if (
    !analyticsData?.successRate ||
    typeof analyticsData?.successRate !== "object"
  ) {
    return <Spin />;
  }

  // Map the successRate object into the required format
  const data = Object.entries(analyticsData.successRate)
    .map(([type, value]) => ({
      type: type || "Unknown", // Default to 'Unknown' if type is null/undefined
      value: value || 0, // Default to 0 if value is null/undefined
    }))
    .filter((entry) => entry.value > 0); // Filter out entries with zero value

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    label: {
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        fill: "#fff",
        textAlign: "center",
      },
    },
    legend: {
      position: "bottom",
    },
    tooltip: {
      showTitle: false,
      formatter: (datum) => {
        const name = datum.type || "Unknown";
        const value = datum.value ? datum.value.toString() : "No Data";
        return { name, value };
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    color: ["#7ebdbe", "#ed5031", "#c2a5f6"],
  };

  return (
    <div className="pieChartContainer">
      <h3 style={{ margin: "20px 0px" }}>Success Rate</h3>
      {loader ? (
        <div className="align-center">
          <Spin />
        </div>
      ) : (
        <Pie {...config} />
      )}
    </div>
  );
};

export default PieChartPage;
