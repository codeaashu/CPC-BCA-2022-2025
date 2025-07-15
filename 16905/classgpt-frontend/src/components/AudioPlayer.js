
//.components/AudioPlayer

import React from 'react';

const AudioPlayer = ({ src, title = "Voice Note" }) => {
  return (
    <div className="bg-[#1a182d] rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-purple-400">🎧 {title}</h3>
      <audio controls className="w-full mt-2 rounded-lg bg-purple-700">
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p className="text-xs text-gray-500 mt-2">AI reads the summary aloud</p>
    </div>
  );
};

export default AudioPlayer;
