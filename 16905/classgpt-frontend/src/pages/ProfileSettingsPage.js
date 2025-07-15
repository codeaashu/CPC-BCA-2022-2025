import React, { useState } from 'react';

const ProfileSettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('Hinglish');
  const [voice, setVoice] = useState('female');

  return (
    <div className="min-h-screen bg-[#0d0c1d] text-white px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">⚙️ Profile & Settings</h2>

      <div className="max-w-xl mx-auto space-y-6 bg-[#1a182d] p-6 rounded-xl shadow-lg">

        {/* 🌙 Dark Mode */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium flex items-center gap-2">
            🌙 Dark Mode
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-600 after:content-[''] after:absolute after:left-[4px] after:top-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        {/* 🌐 Language Preference */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium flex items-center gap-2">
            🌐 Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#292742] text-white px-4 py-2 rounded"
          >
            <option value="Hinglish">Hinglish</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        {/* 🗣️ Voice Gender */}
        <div className="flex justify-between items-center">
          <label className="text-lg font-medium flex items-center gap-2">
            🗣️ Voice Gender
          </label>
          <select
            value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="bg-[#292742] text-white px-4 py-2 rounded"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
