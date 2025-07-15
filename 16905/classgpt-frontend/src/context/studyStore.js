import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // ✅ UUID for local-only entries

// 1️⃣ Create Context
const StudyContext = createContext();

// 2️⃣ Custom Hook
export const useStudy = () => useContext(StudyContext);

// 3️⃣ Provider Component
export const StudyProvider = ({ children }) => {
  const [savedResults, setSavedResults] = useState([]);
  const [tempResult, setTempResult] = useState(null); // 🔄 For live preview before saving

  // 🔁 Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('classgpt_results');
    if (stored) {
      setSavedResults(JSON.parse(stored));
    }
  }, []);

  // 💾 Save to localStorage whenever savedResults changes
  useEffect(() => {
    localStorage.setItem('classgpt_results', JSON.stringify(savedResults));
  }, [savedResults]);

  // ➕ Save a new result
  const saveResult = (result) => {
    // ✅ Assign local ID if no MongoDB _id
    if (!result._id && !result.id) {
      result.id = uuidv4();
    }

    const updated = [result, ...savedResults];
    setSavedResults(updated);
  };

  // 🗑️ Delete by _id or local id
  const deleteResult = (id) => {
    const updated = savedResults.filter(
      (item) => item._id !== id && item.id !== id
    );
    setSavedResults(updated);
  };

  return (
    <StudyContext.Provider
      value={{
        savedResults,
        saveResult,
        deleteResult,
        setSavedResults,
        tempResult,
        setTempResult,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};
