import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const LoginPage = () => {
  const {
    loginWithGoogle,
    loginWithFacebook,
    jwtLogin,
    jwtSignup,
    isLoading,
  } = useAuthStore();

  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      jwtSignup(form.email, form.password, form.confirmPassword);
    } else {
      jwtLogin(form.email, form.password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0c1d] text-white px-4">
      <div className="max-w-md w-full bg-[#1a182d] p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? 'Create Account' : 'Login'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#0d0c1d] border border-gray-700 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded bg-[#0d0c1d] border border-gray-700 focus:outline-none"
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-[#0d0c1d] border border-gray-700 focus:outline-none"
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white font-semibold"
          >
            {isSignup ? 'Sign Up with Email' : 'Log In with Email'}
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-sm text-gray-400">or continue with</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={loginWithGoogle}
            className="flex items-center justify-center w-full gap-2 border border-gray-600 py-2 rounded hover:bg-[#111] transition"
          >
            <FaGoogle /> Google
          </button>
          <button
            onClick={loginWithFacebook}
            className="flex items-center justify-center w-full gap-2 border border-gray-600 py-2 rounded hover:bg-[#111] transition"
          >
            <FaFacebook /> Facebook
          </button>
        </div>

        <p className="text-sm text-center mt-6 text-gray-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-purple-400 hover:underline"
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
