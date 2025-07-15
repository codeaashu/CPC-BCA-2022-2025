// src/components/DeckModal.js
import React from 'react';

const DeckModal = ({ isOpen, onClose, deck }) => {
  if (!isOpen || !deck) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-[#1a182d] text-white p-6 rounded-lg w-full max-w-2xl relative shadow-lg">
        <button onClick={onClose} className="absolute top-3 right-4 text-xl text-gray-400 hover:text-white">✖</button>
        <h3 className="text-xl font-bold text-purple-400 mb-2">{deck.title}</h3>
        <p className="text-sm text-gray-500 mb-4">Subject: {deck.subject} | Date: {deck.date}</p>

        <div className="text-sm space-y-3">
          <p><strong>Summary:</strong> {deck.summary}</p>
          <p><strong>MCQs:</strong></p>
          <ul className="list-disc list-inside">
            {deck.mcqs?.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
          <p><strong>Flashcards:</strong></p>
          <ul className="list-disc list-inside">
            {deck.flashcards?.map((fc, i) => (
              <li key={i}>{fc}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DeckModal;
