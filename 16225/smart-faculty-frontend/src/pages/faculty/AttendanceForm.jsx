// src/pages/faculty/AttendanceForm.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AttendanceForm = ({ facultyId, date }) => {
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    subject: '',
    classTaken: '',
    remarks: '',
  });

  const inputClass = darkMode
    ? 'bg-gray-700 text-white border border-gray-600'
    : 'bg-gray-100 text-black';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/attendance/faculty', {
        ...formData,
        facultyId,
        date,
      });

      toast.success('Attendance submitted');
      setFormData({ subject: '', classTaken: '', remarks: '' });
    } catch (err) {
      console.error(err);
      toast.error('Submission failed');
    }
  };

  return (
    <div className={`p-4 rounded-xl shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <h2 className="text-xl font-semibold mb-4 text-green-400">Submit Class Report</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Subject:</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className={`w-full p-2 rounded ${inputClass}`}
          />
        </div>

        <div>
          <label className="block mb-1">Class Taken (Yes/No):</label>
          <select
            required
            value={formData.classTaken}
            onChange={(e) => setFormData({ ...formData, classTaken: e.target.value })}
            className={`w-full p-2 rounded ${inputClass}`}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Remarks (optional):</label>
          <input
            type="text"
            value={formData.remarks}
            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            className={`w-full p-2 rounded ${inputClass}`}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
