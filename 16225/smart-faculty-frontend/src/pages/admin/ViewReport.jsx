//ViewReport.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ViewReport = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/dashboard');
      setSummary(res.data);
    } catch (err) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ Prevent crash when summary is null
  if (loading || !summary) return <p className="text-white">Loading report...</p>;

  return (
    <div className="text-white space-y-6">
      <h1 className="text-2xl font-bold text-cyan-400 mb-4">📊 Today's Report – {summary.date}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#1e2a4f] p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">👩‍🏫 Faculty Attendance</h2>
          <p>✅ Present: {summary.facultyPresent}</p>
          <p>❌ Absent: {summary.facultyAbsent}</p>
        </div>

        <div className="bg-[#1e2a4f] p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">👨‍🎓 Students</h2>
          <p>🟢 Present: {summary.totalStudentsPresent}</p>
          <p>❌ Absent: {summary.totalStudentsAbsent}</p>
        </div>

        <div className="bg-[#1e2a4f] p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">📚 Classes Held</h2>
          <p>{summary.totalClassesHeld}</p>
        </div>

        <div className="bg-[#1e2a4f] p-4 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold">🔁 Substitutes Assigned</h2>
          <p>{summary.substituteCount}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-yellow-300 mb-2">📝 Student Attendance Details</h2>
        {summary.studentDetails.length === 0 ? (
          <p>No attendance data available for today.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left bg-[#10193a] rounded-xl overflow-hidden">
              <thead className="text-gray-300 bg-[#1e2a4f]">
                <tr>
                  <th className="px-4 py-2">Batch</th>
                  <th className="px-4 py-2">Subject</th>
                  <th className="px-4 py-2">Faculty</th>
                  <th className="px-4 py-2">Students Present</th>
                </tr>
              </thead>
              <tbody>
                {summary.studentDetails.map((entry, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="px-4 py-2">{entry.batch}</td>
                    <td className="px-4 py-2">{entry.subject}</td>
                    <td className="px-4 py-2">{entry.facultyTaught}</td>
                    <td className="px-4 py-2">{entry.studentsPresent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReport;
