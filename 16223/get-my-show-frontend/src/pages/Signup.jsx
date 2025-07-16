import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/auth/signup`,
        form
      );
      login(res.data); // auto-login after signup
      toast.success('Account created!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Signup failed';
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="max-w-md w-full bg-secondary rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account 🍿</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-primary text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-primary text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-primary text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-accent hover:bg-pink-600 text-white py-2 rounded font-semibold transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
