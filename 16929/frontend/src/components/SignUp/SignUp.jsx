// frontend/src/components/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle,FaArrowLeft  } from 'react-icons/fa';

const url = 'http://localhost:4000'

const AwesomeToast = ({ message, icon }) => (
  <div className="animate-slide-in fixed bottom-6 right-6 flex items-center bg-gradient-to-br from-amber-500 to-amber-600 px-6 py-4 rounded-lg shadow-lg border-2 border-amber-300/20">
    <span className="text-2xl mr-3 text-[#2D1B0E]">{icon}</span>
    <span className="font-semibold text-[#2D1B0E]">{message}</span>
  </div>
);

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', icon: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (toast.visible && toast.message === 'Sign Up Successful!') {
      const timer = setTimeout(() => {
        setToast({ visible: false, message: '', icon: null });
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast, navigate]);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
      e.preventDefault();
      console.log('🟢 SignUp handleSubmit fired', formData);
    
      try {
        const res = await axios.post(`${url}/api/user/register`, formData);
        console.log('🟢 register response:', res.data);
    
        // **NEW**: check the actual `success` flag & token
        if (res.data.success && res.data.token) {
          // (optional) persist the JWT from registration
          localStorage.setItem('authToken', res.data.token);
    
          setToast({
            visible: true,
            message: 'Sign Up Successful!',
            icon: <FaCheckCircle />,
          });
    
          // **return early** so you don't fall through
          return;
        }
    
        // if we get here, it was a 200 but `success: false`
        throw new Error(res.data.message || 'Registration failed.');
      } catch (err) {
        console.error('🔴 register error:', err);
        const msg = err.response?.data?.message || err.message || 'Registration failed.';
        setToast({ visible: true, message: msg, icon: <FaCheckCircle /> });
      }
    };
    
    
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a120b] p-4">
      {toast.visible && <AwesomeToast message={toast.message} icon={toast.icon} />}
      <div className="w-full max-w-md bg-gradient-to-br from-[#2D1B0E] to-[#4a372a] p-8 rounded-xl shadow-lg border-4 border-amber-700/30 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-6 hover:scale-105 transition-transform">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#2D1B0E] text-amber-100 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-all duration-200 hover:scale-[1.02]"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-4 flex items-center text-amber-400 hover:text-amber-600 transition-colors transform hover:scale-125"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg hover:scale-105 transition-transform duration-300 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="group inline-flex items-center text-amber-400 hover:text-amber-600 transition-all duration-300"
          >
            <FaArrowLeft className="mr-2 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
            <span className="transform group-hover:-translate-x-2 transition-all duration-300">
              Back To Login
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
