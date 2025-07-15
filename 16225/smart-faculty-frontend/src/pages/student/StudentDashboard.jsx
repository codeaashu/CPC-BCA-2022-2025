import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ThemeContext } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [date, setDate] = useState('');
  const [batch, setBatch] = useState('');
  const [className, setClassName] = useState('');
  const [routine, setRoutine] = useState([]);
  const [substitute, setSubstitute] = useState([]);
  const [formData, setFormData] = useState({
    classHeld: '',
    studentsPresent: '',
    totalStudents: '',
    subject: '',
    facultyTaught: '',
  });

  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-GB').split('/').join('-');
    setDate(today);

    if (!userId || role !== 'student') {
      toast.error('User not logged in');
      navigate('/');
    }
  }, [navigate, userId, role]);

  const handleFetchData = async () => {
    if (!batch || !className) {
      toast.error('Please enter both Class and Batch');
      return;
    }

    try {
      const [routineRes, substituteRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/routine/today?batch=${batch}`),
        axios.get(`http://localhost:5000/api/substitute/today?batch=${batch}`)
      ]);

      setRoutine(routineRes.data || []);
      setSubstitute(substituteRes.data || []);
      toast.success('Routine & Substitute fetched!');
    } catch (err) {
      toast.error('Error fetching data');
    }
  };

 const handleAttendanceSubmit = async (e) => {
  e.preventDefault();

  // Check class and batch
  if (!className || !batch) {
    toast.error('Please fill Class and Batch before submitting attendance');
    return;
  }

  const studentsPresent = parseInt(formData.studentsPresent);
  const totalStudents = parseInt(formData.totalStudents);

  if (isNaN(studentsPresent) || isNaN(totalStudents)) {
    return toast.error('Please enter valid numbers');
  }

  if (totalStudents < studentsPresent) {
    return toast.error('Present count cannot exceed total students');
  }

  const studentsAbsent = totalStudents - studentsPresent;

  try {
    await axios.post('http://localhost:5000/api/attendance/student', {
      ...formData,
      studentsPresent,
      totalStudents,
      studentsAbsent,
      batch,
      className,
      studentId: userId,
      date,
    });

    toast.success('Attendance submitted');
    setFormData({
      classHeld: '',
      studentsPresent: '',
      totalStudents: '',
      subject: '',
      facultyTaught: '',
    });
  } catch (err) {
    toast.error('Failed to submit attendance');
  }
};


  const containerClasses = darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const inputClasses = darkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-100 text-black';

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cyan-400">Student Dashboard</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}
          className="px-4 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </button>
      </div>

      <p className="mb-2 font-medium">📅 Date: {date}</p>
      <p className="mb-4 text-sm">👤 Student ID: <span className="font-mono">{userId}</span></p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Class (e.g., BCA)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className={`p-2 rounded ${inputClasses}`}
        />
        <input
          type="text"
          placeholder="Batch (e.g., AKU Batch 1)"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className={`p-2 rounded ${inputClasses}`}
        />
        <button
          onClick={handleFetchData}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      <div className={`mb-6 p-4 rounded-xl shadow ${containerClasses}`}>
        <h2 className="text-xl font-semibold mb-2">Today's Routine</h2>
        {routine.length === 0 ? (
          <p>No routine found</p>
        ) : (
          <ul className="space-y-2">
            {routine.map((r, idx) => (
              <li key={idx} className={`p-2 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                📘 {r.subject} - {r.faculty} ({r.time})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`mb-6 p-4 rounded-xl shadow ${containerClasses}`}>
        <h2 className="text-xl font-semibold mb-2 text-orange-400">Substitute Classes</h2>
        {substitute.length === 0 ? (
          <p>No substitutes today</p>
        ) : (
          <ul className="space-y-2">
            {substitute.map((s, idx) => (
              <li key={idx} className="p-2 rounded bg-yellow-100 text-black">
                🔁 {s.subject}: {s.originalFaculty} ➝ {s.substituteFaculty}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`mb-6 p-4 rounded-xl shadow ${containerClasses}`}>
        <h2 className="text-xl font-semibold mb-4 text-green-400">Submit Attendance</h2>
        <form onSubmit={handleAttendanceSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Class Held?</label>
            <select
              required
              value={formData.classHeld}
              onChange={(e) => setFormData({ ...formData, classHeld: e.target.value })}
              className={`w-full p-2 rounded ${inputClasses}`}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Students Present:</label>
            <input
              type="number"
              required
              value={formData.studentsPresent}
              onChange={(e) => setFormData({ ...formData, studentsPresent: e.target.value })}
              className={`w-full p-2 rounded ${inputClasses}`}
            />
          </div>

          <div>
            <label className="block mb-1">Total Students:</label>
            <input
              type="number"
              required
              value={formData.totalStudents}
              onChange={(e) => setFormData({ ...formData, totalStudents: e.target.value })}
              className={`w-full p-2 rounded ${inputClasses}`}
            />
          </div>

          <div>
            <label className="block mb-1">Subject:</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={`w-full p-2 rounded ${inputClasses}`}
            />
          </div>

          <div>
            <label className="block mb-1">Faculty Taught:</label>
            <input
              type="text"
              required
              value={formData.facultyTaught}
              onChange={(e) => setFormData({ ...formData, facultyTaught: e.target.value })}
              className={`w-full p-2 rounded ${inputClasses}`}
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Attendance
          </button>
        </form>
      </div>

      <div className="text-right mt-4">
        <Link to="/student-dashboard/history">
          <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded">
            📄 View Attendance History
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
