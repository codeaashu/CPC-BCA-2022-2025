import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';

const AddRoutine = () => {
  const { darkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    className: '',
    batch: '',
    day: 'Monday',
    subject: '',
    faculty: '',
    time: '',
    semester: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/add-routine', formData);
      toast.success('✅ Routine added successfully');
      setFormData({
        className: '',
        batch: '',
        day: 'Monday',
        subject: '',
        faculty: '',
        time: '',
        semester: '',
      });
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to add routine');
    }
  };

  const inputClass = `w-full p-2 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`;

  return (
    <div className={`${darkMode ? 'text-white' : 'text-black'} max-w-xl mx-auto p-6 rounded-xl`}>
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Add Class Routine</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Class:</label>
          <input
            type="text"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label>Batch:</label>
          <input
            type="text"
            required
            value={formData.batch}
            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label>Day:</label>
          <select
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className={inputClass}
          >
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Subject:</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label>Faculty Name:</label>
          <input
            type="text"
            required
            value={formData.faculty}
            onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label>Time (e.g., 10:00 - 11:00 AM):</label>
          <input
            type="text"
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label>Semester:</label>
          <input
            type="text"
            required
            value={formData.semester}
            onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded"
        >
          Add Routine
        </button>
      </form>
    </div>
  );
};

export default AddRoutine;
