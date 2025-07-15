// src/components/DemoModal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DemoModal = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-black rounded-xl w-[90%] max-w-2xl p-4 relative">
            <button onClick={onClose} className="absolute top-2 right-4 text-white text-xl">
              ✖
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your own demo video link
                title="Demo Video"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoModal;
