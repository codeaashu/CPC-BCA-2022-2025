import React, { useState } from 'react';
import { useProtectedRedirect } from '../utils/checkLoginAndNavigate';
import { motion } from 'framer-motion';
import DemoModal from '../components/DemoModal';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';
import { useThemeStore } from '../store/themeStore'; // 🌗 for theme (if needed)

function LandingPage() {
  const tryNavigate = useProtectedRedirect();
  const user = useAuthStore((s) => s.user);
  const [showDemo, setShowDemo] = useState(false);

  const handleStart = () => {
    if (!user) {
      toast.error('Please log in first!');
      return;
    }

    tryNavigate('/upload');

    setTimeout(() => {
      const uploadSection = document.getElementById('upload-section');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0d0c1d] dark:text-white font-sans px-4 transition-colors duration-300">
      {/* HERO SECTION */}
      <main className="text-center py-20">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-4 text-purple-600 dark:text-purple-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ClassGPT – Smart Class Companion
        </motion.h2>

        <motion.p
          className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8 text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          AI-based tool for students: Auto-generate summaries, MCQs, flashcards & voice notes from your notes or PDFs.
        </motion.p>

        <motion.div
          className="flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handleStart}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-white font-semibold shadow-lg"
          >
            🚀 Start with Your Notes
          </button>
          <button
            onClick={() => setShowDemo(true)}
            className="border border-purple-500 px-6 py-3 rounded text-purple-700 dark:text-purple-300 hover:bg-purple-500 hover:text-white transition"
          >
            🎬 Watch Demo
          </button>
        </motion.div>
      </main>

      {/* FEATURES SECTION */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-16 max-w-5xl mx-auto">
        {[
          { title: 'Auto Summary', icon: '📄' },
          { title: 'Auto MCQs', icon: '🧮' },
          { title: 'Flashcards', icon: '🃏' },
          { title: 'Voice Notes', icon: '🎧' }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 dark:bg-[#1a182d] p-6 rounded-xl hover:scale-105 transition transform shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h4 className="text-lg font-semibold">{item.title}</h4>
          </motion.div>
        ))}
      </section>

      {/* Demo Video Modal */}
      <DemoModal open={showDemo} onClose={() => setShowDemo(false)} />
    </div>
  );
}

export default LandingPage;
