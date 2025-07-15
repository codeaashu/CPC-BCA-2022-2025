import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';

const AssignSubstitute = () => {
  const { darkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    originalFaculty: '',
    substituteFaculty: '',
    className: '',
    batch: '',
    subject: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/substitute', formData);
      toast.success('✅ Substitute assigned');
      setFormData({
        originalFaculty: '',
        substituteFaculty: '',
        className: '',
        batch: '',
        subject: '',
      });
    } catch (err) {
      toast.error('❌ Failed to assign substitute');
    }
  };

  const inputClass = 'w-full p-2 rounded bg-white text-black';

  return (
    <div className={`${darkMode ? 'text-white' : 'text-black'} max-w-xl mx-auto p-6`}>
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Assign Substitute Faculty</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Absent Faculty ID (e.g., F002):</label>
          <input
            type="text"
            required
            value={formData.originalFaculty}
            onChange={(e) => setFormData({ ...formData, originalFaculty: e.target.value })}
            placeholder="F002"
            className={inputClass}
          />
        </div>

        <div>
          <label>Substitute Faculty ID (e.g., F001):</label>
          <input
            type="text"
            required
            value={formData.substituteFaculty}
            onChange={(e) => setFormData({ ...formData, substituteFaculty: e.target.value })}
            placeholder="F001"
            className={inputClass}
          />
        </div>

        <div>
          <label>Class:</label>
          <input
            type="text"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            placeholder="e.g., BCA"
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
            placeholder="e.g., AKU Batch 1"
            className={inputClass}
          />
        </div>

        <div>
          <label>Subject:</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g., DBMS"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded"
        >
          Assign Substitute
        </button>
      </form>
    </div>
  );
};

export default AssignSubstitute;
