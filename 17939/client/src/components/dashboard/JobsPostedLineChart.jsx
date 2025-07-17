import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const JobsPostedLineChart = ({ data }) => {
  // Fallback if data is undefined or not in expected format
  const safeData = Array.isArray(data) ? data : [];

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mt-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Jobs Posted (Last 6 Months)
      </h2>

      {safeData.every((d) => d.jobs === 0) ? (
        <p className="text-gray-500 dark:text-gray-300">
          No job posting data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={safeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="jobs"
              stroke="#6366F1"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default JobsPostedLineChart;
