import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ Use `react-dom/client` for React 18
import App from './App';
import './index.css';
import { StudyProvider } from './context/studyStore';
import { Toaster } from 'react-hot-toast';

// ✅ Create root using React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StudyProvider>
    <>
      <Toaster position="top-center" />
      <App />
    </>
  </StudyProvider>
);
