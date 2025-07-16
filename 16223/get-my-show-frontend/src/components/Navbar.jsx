import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully', { position: 'top-center' });
  };

  const requireLogin = (e) => {
    e.preventDefault();
    toast.error('Please login first', { position: 'top-center' });
  };

  return (
    <nav className="w-full px-8 py-4 flex justify-between items-center fixed top-0 left-0 z-50 bg-primary bg-opacity-5 text-white">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <span className="text-accent">Get My</span> Show
      </div>

      {/* Navigation Links */}
      <div className="bg-black/50 px-6 py-2 rounded-full flex items-center space-x-6 text-sm font-semibold shadow-sm">
        <Link to="/" className="hover:text-accent transition">Home</Link>

        {user ? (
          <Link to="/movies" className="hover:text-accent transition">Movies</Link>
        ) : (
          <a href="/" onClick={requireLogin} className="hover:text-accent transition">Movies</a>
        )}

        {user ? (
          <Link to="/theatre" className="hover:text-accent transition">Theatres</Link>
        ) : (
          <a href="/" onClick={requireLogin} className="hover:text-accent transition">Theatres</a>
        )}
      </div>

      {/* Search & Auth */}
      <div className="flex items-center gap-4">
        <FiSearch className="text-xl hover:text-accent cursor-pointer" />

        {!user ? (
          <Link
            to="/login"
            className="bg-accent hover:bg-pink-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent text-primary flex items-center justify-center font-bold">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="text-sm font-medium">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-red-500 px-4 py-1 rounded-full text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
