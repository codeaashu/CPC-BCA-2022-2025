// DoughnutChart.js
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const allZero = data?.datasets?.[0]?.data?.every((val) => val === 0);

  if (!data || allZero) {
    return <p style={{ textAlign: "center" }}>No data to display</p>;
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "30px auto",
        padding: "10px",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h4 style={{ textAlign: "center", marginBottom: "10px" }}>
        📊 Stock Price Distribution
      </h4>
      <Doughnut data={data} height={300} />
    </div>
  );
}
