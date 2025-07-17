import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCards from "../components/dashboard/StatCards";
import ApplicationsPieChart from "../components/dashboard/ApplicationsPieChart";
import JobsPostedLineChart from "../components/dashboard/JobsPostedLineChart";

const RecruiterAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("companyToken");

      if (!token) {
        console.warn("🔒 No token found. Company must login.");
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("/api/analytics/recruiter", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Transform jobsLastSixMonths into chartData format
        if (data?.jobsLastSixMonths?.labels && data?.jobsLastSixMonths?.data) {
          data.jobsLastSixMonths = data.jobsLastSixMonths.labels.map((label, i) => ({
            month: label,
            jobs: data.jobsLastSixMonths.data[i] || 0,
          }));
        } else {
          data.jobsLastSixMonths = [];
        }

        setAnalytics(data);
      } catch (error) {
        console.error("❌ Error fetching analytics:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Loading analytics...</p>;
  if (!analytics) return <p className="p-4 text-red-500">Failed to load analytics data.</p>;

  return (
    <div className="space-y-8">
      <StatCards stats={analytics} />

      <ApplicationsPieChart
        data={Array.isArray(analytics.appsByCategory) ? analytics.appsByCategory : []}
      />

      <JobsPostedLineChart
        data={Array.isArray(analytics.jobsLastSixMonths) ? analytics.jobsLastSixMonths : []}
      />
    </div>
  );
};

export default RecruiterAnalytics;
