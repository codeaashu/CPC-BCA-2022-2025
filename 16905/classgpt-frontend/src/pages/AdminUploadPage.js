// src/pages/AdminUploadPage.js
import React, { useState } from 'react';

const AdminUploadPage = () => {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const handleUpload = () => {
    if (file) {
      const fakeLink = `https://classgpt.app/note/${file.name}`;
      setLink(fakeLink);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0c1d] text-white px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">🔐 Admin Upload Panel</h2>

      <div className="max-w-xl mx-auto space-y-6 bg-[#1a182d] p-6 rounded-xl shadow-md text-center">

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700"
        />

        <button
          onClick={handleUpload}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Upload & Generate Link
        </button>

        {link && (
          <div className="mt-4 text-green-400">
            ✅ Link generated: <br />
            <a href={link} className="underline">{link}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUploadPage;
