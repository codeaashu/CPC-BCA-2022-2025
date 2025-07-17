import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="animate-spin h-20 w-20 rounded-full border-4 border-t-orange-400 border-white/30 shadow-xl backdrop-blur-md bg-white/10 scale-100 hover:scale-110 transition-transform duration-500" />
    </div>
  );
};

export default Loading;
