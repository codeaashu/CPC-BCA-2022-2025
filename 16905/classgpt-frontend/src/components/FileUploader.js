// src/components/FileUploader.js
import React from 'react';

const FileUploader = ({ tab, file, onFileChange }) => {
  const getAcceptedTypes = () => {
    switch (tab) {
      case 'pdf':
        return '.pdf,.doc,.docx'; // PDF, Word
      case 'text':
        return '.txt,.docx';
      case 'audio':
        return 'audio/*';
      default:
        return '*';
    }
  };

  const getLabel = () => {
    if (file) return '📂 File selected below';
    if (tab === 'pdf') return 'Upload Notes (PDF / DOCX)';
    if (tab === 'text') return 'Upload Text File (TXT / DOCX)';
    if (tab === 'audio') return 'Upload Audio (MP3 / WAV)';
    return 'Upload File';
  };

  return (
    <div className="max-w-xl mx-auto border-2 border-dashed border-purple-500 p-8 rounded-xl text-center transition-all duration-300">
      {/* Label above button */}
      <p className={`mb-6 text-sm font-medium ${file ? 'text-green-400' : 'text-gray-400'}`}>
        {getLabel()}
      </p>

      {/* File button */}
      <label
        htmlFor="file-input"
        className="inline-block cursor-pointer px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
      >
        Choose File
        <input
          id="file-input"
          type="file"
          accept={getAcceptedTypes()}
          onChange={onFileChange}
          className="hidden"
        />
      </label>

      {/* Selected file name display */}
      {file && (
        <p className="mt-4 text-purple-300 text-sm font-medium break-words">
          {file.name.length > 50
            ? `${file.name.slice(0, 28)}...${file.name.slice(-14)}`
            : file.name}
        </p>
      )}
    </div>
  );
};

export default FileUploader;
