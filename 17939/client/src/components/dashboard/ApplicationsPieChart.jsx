import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#9333EA",
  "#14B8A6",
];

const ApplicationsPieChart = ({ data }) => {
  // ✅ Fallback if data is undefined or not an array
  const safeData = Array.isArray(data) ? data : [];

  // ✅ Correctly map from backend structure
  const chartData = safeData.map((item) => ({
    name: item.category || "Uncategorized",
    value: item.count || 0,
  }));

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Applications by Category
      </h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          No application data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default ApplicationsPieChart;
