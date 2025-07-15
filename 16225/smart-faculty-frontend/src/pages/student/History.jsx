import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ThemeContext } from '../../context/ThemeContext';

const History = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const studentId = localStorage.getItem('userId');
      if (!studentId) {
        toast.error('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/attendance/student`, {
          params: { studentId }
        });
        setRecords(res.data.reverse());
      } catch (err) {
        console.error('History fetch error:', err);
        toast.error('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const cardClasses = darkMode
    ? 'bg-gray-800 text-white border-gray-600'
    : 'bg-white text-black border-cyan-300';

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-400">📜 Attendance History</h1>
        <button
          onClick={toggleTheme}
          className="bg-white text-black px-4 py-1 rounded-full font-semibold"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <div className="space-y-4">
          {records.map((rec, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 shadow-md ${cardClasses}`}
            >
              <p><strong>📅 Date:</strong> {rec.date}</p>
              <p><strong>📚 Subject:</strong> {rec.subject}</p>
              <p><strong>👨‍🏫 Faculty:</strong> {rec.facultyTaught}</p>
              <p><strong>✅ Class Held:</strong> {rec.classHeld}</p>
              <p><strong>👥 Present:</strong> {rec.studentsPresent}</p>
              <p><strong>❌ Absent:</strong> {rec.studentsAbsent || 'N/A'}</p>
              <p><strong>🧑‍🎓 Batch:</strong> {rec.batch} | <strong>Class:</strong> {rec.className}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
