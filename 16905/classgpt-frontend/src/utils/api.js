//api.js

import axios from 'axios';

// 📤 Upload PDF to Express backend
export const uploadPdfToBackend = async (file) => {
  const formData = new FormData();
  formData.append('file', file); // 👈 matches multer's upload.single('file')

  try {
    const response = await axios.post(
      'http://localhost:5000/api/gpt/upload', // ✅ Correct route
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // ⏱️ Optional: prevent long hangs
      }
    );

    // 🧠 Response: { summary, mcqs, flashcards, voiceUrl }
    return response.data;
  } catch (error) {
    console.error('❌ Upload Error:', error?.response?.data || error.message);
    throw new Error('Failed to upload and process file');
  }
};
