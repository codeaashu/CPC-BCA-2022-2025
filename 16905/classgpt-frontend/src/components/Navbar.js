// src/components/Navbar.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useProtectedRedirect } from '../utils/checkLoginAndNavigate';

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = useAuthStore((s) => s.user);
  const toggleModal = useAuthStore((s) => s.toggleModal);
  const logout = useAuthStore((s) => s.logout);
  const tryNavigate = useProtectedRedirect();

  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  const navLinks = [
    { name: 'Upload', path: '/upload' },
    { name: 'My Files', path: '/study' },
    { name: 'Help', path: '/chat' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  // On load: set dark class on <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
   <header className="w-full bg-white text-black dark:bg-[#0d0c1d] dark:text-white shadow px-4 py-4 md:px-8 flex justify-between items-center relative z-50">
      <Link to="/" className="text-2xl font-bold text-purple-500">
        ClassGPT
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link, i) => (
          <button
            key={i}
            onClick={() => tryNavigate(link.path)}
            className="hover:text-purple-400"
          >
            {link.name}
          </button>
        ))}

        <button
          onClick={toggleTheme}
          className="border border-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 text-sm"
        >
          {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
        </button>

        {!user ? (
          <button
            onClick={toggleModal}
            className="px-4 py-1 border border-purple-500 rounded hover:bg-purple-600"
          >
            Log in
          </button>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="px-4 py-1 border border-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
            <span className="ml-3 text-sm text-purple-400 flex items-center gap-1">
              👤 {user.displayName || user.email}
            </span>
          </>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-xl">
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-white text-black dark:bg-[#1a182d] dark:text-white py-6 px-4 flex flex-col space-y-4 md:hidden"
           >
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => {
                  tryNavigate(link.path);
                  setMenuOpen(false);
                }}
                className="text-white hover:text-purple-400 text-left"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => {
                toggleTheme();
              }}
              className="border border-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-white"
            >
              {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
            </button>

            {!user ? (
              <button
                onClick={() => {
                  toggleModal();
                  setMenuOpen(false);
                }}
                className="border border-purple-500 px-4 py-2 rounded hover:bg-purple-600"
              >
                Log in
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="border border-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
