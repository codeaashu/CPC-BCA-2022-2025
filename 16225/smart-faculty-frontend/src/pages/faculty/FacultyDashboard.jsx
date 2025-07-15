import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ThemeContext } from '../../context/ThemeContext';

const FacultyDashboard = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [substituteToday, setSubstituteToday] = useState(null);
  const [facultyId, setFacultyId] = useState('');
  const [facultyName, setFacultyName] = useState('');

  const date = new Date().toLocaleDateString('en-GB').split('/').join('-');

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (!id || role !== 'faculty') {
      toast.error('Unauthorized. Please login as faculty.');
      return;
    }

    setFacultyId(id);
    fetchAttendanceHistory(id);
    fetchTodaySubstitute(id);
    fetchFacultyName(id);
  }, []);

  const fetchAttendanceHistory = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/faculty/${id}`);
      const history = res.data || [];
      setAttendanceHistory(history);

      const todayRecord = history.find((record) => record.date === date);
      if (todayRecord) setAttendanceMarked(true);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch attendance history');
    }
  };

  const fetchTodaySubstitute = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/substitute/today/faculty/${id}`);
      if (res.status === 200 && res.data) {
        setSubstituteToday(res.data);
      } else {
        setSubstituteToday(null);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setSubstituteToday(null);
      } else {
        console.error(err);
        toast.error("Failed to fetch today's substitute");
      }
    }
  };

  const fetchFacultyName = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/${id}`);
      if (res.data?.name) {
        setFacultyName(res.data.name);
      }
    } catch {
      console.warn('Could not fetch faculty name');
    }
  };

  const markAttendance = async (status) => {
    try {
      await axios.post('http://localhost:5000/api/attendance/faculty', {
        facultyId,
        status,
        classesTaken: '',
        remarks: '',
      });
      toast.success(`Marked as ${status}`);
      setAttendanceMarked(true);
      fetchAttendanceHistory(facultyId);
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error('Attendance already marked today');
        setAttendanceMarked(true);
      } else {
        console.error(err);
        toast.error('Failed to mark attendance');
      }
    }
  };

  const containerClass = darkMode ? 'bg-[#1e1e2f] text-white' : 'bg-white text-black';
  const cardClass = darkMode ? 'bg-[#2c2c40]' : 'bg-gray-100';

  return (
    <div className={`min-h-screen p-6 ${containerClass}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-400">Faculty Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-1 rounded-full bg-yellow-400 text-black font-semibold"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <p className="mb-2 font-medium">📅 Date: {date}</p>
      <p className="mb-6 text-sm">
        👨‍🏫 Faculty ID: <span className="font-mono">{facultyId}</span>
        {facultyName && <> | 👤 Name: <span className="italic">{facultyName}</span></>}
      </p>

      {/* Mark Attendance */}
      <div className={`p-4 rounded-xl shadow mb-6 ${cardClass}`}>
        <h2 className="text-xl font-semibold mb-2">Mark Your Attendance</h2>
        {attendanceMarked ? (
          <p className="text-green-400 font-semibold">✔️ Attendance already marked today</p>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => markAttendance('Present')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              ✅ Present
            </button>
            <button
              onClick={() => markAttendance('Absent')}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              ❌ Absent
            </button>
          </div>
        )}
      </div>

      {/* Substitute Class Today */}
      <div className={`p-4 rounded-xl shadow mb-6 ${cardClass}`}>
        <h2 className="text-xl font-semibold mb-2 text-orange-400">Today's Substitute Assignment</h2>
        {substituteToday ? (
          <p>
            📘 Subject: {substituteToday.subject} <br />
            🏫 Class: {substituteToday.className} <br />
            🎓 Batch: {substituteToday.batch}
          </p>
        ) : (
          <p>No substitute class assigned today.</p>
        )}
      </div>

      {/* Attendance History */}
      <div className={`p-4 rounded-xl shadow mb-6 ${cardClass}`}>
        <h2 className="text-xl font-semibold mb-4">📅 Attendance History</h2>
        {attendanceHistory.length === 0 ? (
          <p>No attendance record found.</p>
        ) : (
          <table className="w-full text-sm border">
            <thead className={darkMode ? 'bg-[#3d3d5c]' : 'bg-gray-200'}>
              <tr>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((record, idx) => (
                <tr key={idx}>
                  <td className="p-2 border">{record.date}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      record.status === 'Present' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
