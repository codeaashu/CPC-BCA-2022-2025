import React from 'react';

const AuthCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden">
      {children}
    </div>
  );
};

export default AuthCard;
