import React from "react";
import { motion } from "framer-motion";

const cards = [
  { title: "Total Jobs", key: "totalJobs", color: "from-indigo-500 to-purple-500" },
  { title: "Applications Received", key: "totalApplications", color: "from-green-500 to-emerald-500" },
  { title: "Active Jobs", key: "activeJobs", color: "from-amber-500 to-yellow-400" }, // ✅ Fixed key
];

const StatCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
          className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-lg`}
        >
          <h2 className="text-lg font-semibold">{card.title}</h2>
          <p className="text-4xl font-bold mt-2">
            {stats?.[card.key] ?? 0}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
