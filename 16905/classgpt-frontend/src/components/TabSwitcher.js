// src/components/TabSwitcher.js
import React from 'react';

const TabSwitcher = ({ tabs, activeTab, onSwitch }) => {
  return (
    <div className="flex justify-center space-x-4 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSwitch(tab)}
          aria-pressed={activeTab === tab}
          title={`Switch to ${tab.toUpperCase()} mode`}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200
            ${activeTab === tab
              ? 'bg-purple-600 text-white shadow-md scale-105'
              : 'bg-[#1a182d] text-gray-300 hover:bg-[#292747]'}
          `}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default TabSwitcher;
