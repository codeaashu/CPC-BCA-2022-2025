// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import UploadDashboard from './pages/UploadDashboard';
import ResultPage from './pages/ResultPage';
import ChatbotPage from './pages/ChatbotPage';
import StudyDeckPage from './pages/StudyDeckPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import QuizExportPage from './pages/QuizExportPage';
import AdminUploadPage from './pages/AdminUploadPage';
import LoginPage from './pages/LoginPage';

import RequireAuth from './components/RequireAuth';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';

import { StudyProvider } from './context/studyStore';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';

function AppContent() {
  const initAuth = useAuthStore((s) => s.initAuth);

  useEffect(() => {
    initAuth(); // Sync user on reload
  }, []);

  return (
    <>
      <Navbar />
      <AuthModal />
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/chat" element={<ChatbotPage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/quiz-export" element={<QuizExportPage />} />
        <Route path="/admin" element={<AdminUploadPage />} />

        {/* Protected Pages */}
        <Route
          path="/upload"
          element={
            <RequireAuth>
              <UploadDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/study"
          element={
            <RequireAuth>
              <StudyDeckPage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  const theme = useThemeStore((s) => s.theme);

  return (
    <StudyProvider>
      <Router>
        {/* 👇 dark mode class added here on root */}
        <div className={`${theme} min-h-screen transition-colors`}>
          <div className="bg-white text-black dark:bg-[#0d0c1d] dark:text-white min-h-screen">
            <AppContent />
          </div>
        </div>
      </Router>
    </StudyProvider>
  );
}

export default App;
