import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import bgImg from '../../assets/cimage-building.png';
import { ThemeContext } from '../../context/ThemeContext';

const Login = () => {
  const [formData, setFormData] = useState({ userId: '', password: '', role: 'student' });
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      toast.success(`Welcome ${res.data.user.role}!`);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('userId', res.data.user.userId);

      if (res.data.user.role === 'admin') navigate('/admin-dashboard');
      else if (res.data.user.role === 'faculty') navigate('/faculty-dashboard');
      else if (res.data.user.role === 'student') navigate('/student-dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Invalid login credentials');
    }
  };

  const handleClickHeader = () => {
    toast('Please login first', { icon: '🔒' });
  };

  return (
    <div
      className={`min-h-screen bg-cover bg-center flex flex-col ${
        darkMode ? 'bg-gray-900 text-white' : ''
      }`}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-black/50 text-white">
        <div className="flex gap-4 text-sm md:text-base">
          <button onClick={handleClickHeader} className="hover:underline">STUDENT</button>
          <button onClick={handleClickHeader} className="hover:underline">FACULTY</button>
          <button onClick={handleClickHeader} className="hover:underline">ADMIN</button>
        </div>
        <button
          onClick={toggleTheme}
          className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      {/* Main Section */}
      <div className="flex-grow flex flex-col md:flex-row justify-end md:items-center items-start md:px-12 p-4 pb-12">
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end space-y-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center md:text-right drop-shadow">
            SMART FACULTY AVAILABILITY INFORMATION SYSTEM
          </h1>

          <form
            onSubmit={handleLogin}
            className="bg-cyan-400 shadow-xl rounded-2xl p-6 md:p-10 w-full max-w-sm space-y-5 text-white"
          >
            <h2 className="text-xl font-bold text-center text-gray-900">LOGIN TO YOUR DASHBOARD</h2>

            <div>
              <label className="text-gray-900 font-medium">User ID :</label>
              <input
                type="text"
                required
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="w-full mt-1 p-2 rounded-full bg-white text-black focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-900 font-medium">Password :</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full mt-1 p-2 rounded-full bg-white text-black focus:outline-none"
              />
            </div>

            <div>
              <label className="text-gray-900 font-medium">Select Role :</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full mt-1 p-2 rounded-full bg-white text-black"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
