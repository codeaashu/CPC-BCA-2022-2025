import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { LogOut, User, Sun, Moon } from 'lucide-react';

const AdminDashboard = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-[#0b1235] text-white' : 'bg-white text-black'}`}>
      {/* Sidebar */}
      <div className={`w-[200px] ${darkMode ? 'bg-[#141b46]' : 'bg-gray-100'} flex flex-col py-6 px-2 space-y-6 text-center shadow-lg`}>
        <div className="flex flex-col items-center space-y-2">
          <User size={32} />
          <span className="font-bold text-sm leading-4">ADMIN<br />DASHBOARD</span>
        </div>

        <Link to="view-report" className="hover:underline font-medium">Dashboard</Link>
        <Link to="add-student" className="hover:underline font-medium">Student</Link>
        <Link to="add-faculty" className="hover:underline font-medium">Faculty</Link>
        <Link to="add-routine" className="hover:underline font-medium">Routine</Link>
        <Link to="assign-substitute" className="hover:underline font-medium">Substitute</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className={`flex justify-between items-center px-4 py-3 ${darkMode ? 'bg-cyan-800 text-white' : 'bg-cyan-400 text-black'} font-bold shadow`}>
          <h2>WELCOME TO CIMAGE COLLEGE</h2>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} title="Toggle Theme">
              {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} />}
            </button>

            {/* Logout */}
            <button
              onClick={() => navigate('/')}
              className="hover:opacity-80 transition"
              title="Logout"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Nested Content Rendered Here */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
