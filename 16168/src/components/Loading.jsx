import React, { useState, useEffect } from 'react';
import loadingIcon from '@/assets/images/loading.svg';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-white">
      <img
        src={loadingIcon}
        alt="Loading..."
        className="w-16 h-16 animate-spin"
      />
    </div>
  );
};

export default Loading;
