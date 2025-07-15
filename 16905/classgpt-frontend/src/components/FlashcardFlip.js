// src/components/FlashcardFlip.js
import React, { useState } from 'react';

const FlashcardFlip = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-40 cursor-pointer perspective"
      onClick={() => setFlipped(!flipped)}
    >
      <div className={`transition-transform duration-500 ease-in-out transform-style preserve-3d w-full h-full ${flipped ? 'rotate-y-180' : ''}`}>
        {/* FRONT */}
        <div className="absolute w-full h-full bg-purple-800 rounded-xl text-white p-4 flex items-center justify-center backface-hidden">
          <p className="text-center text-sm font-medium">Q: {question}</p>
        </div>

        {/* BACK */}
        <div className="absolute w-full h-full bg-purple-600 rounded-xl text-white p-4 flex items-center justify-center rotate-y-180 backface-hidden">
          <p className="text-center text-sm font-medium">A: {answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashcardFlip;
