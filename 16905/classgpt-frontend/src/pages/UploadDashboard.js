//UploadDashboard.js

import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import TabSwitcher from '../components/TabSwitcher';
import { uploadPdfToBackend } from '../utils/api';
import { useStudy } from '../context/studyStore';
import toast from 'react-hot-toast';

function UploadDashboard() {
  const [file, setFile] = useState(null);
  const [tab, setTab] = useState('pdf');
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(''); // ✅ For auto title/subject

  const navigate = useNavigate();
  const { setTempResult, saveResult } = useStudy(); // ✅ Added saveResult

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // 🛡️ Validate file type
    if (tab === 'pdf' && selectedFile.type !== 'application/pdf') {
      toast.error('⚠️ Please upload a valid PDF file.');
      return;
    }

    if (tab === 'audio' && !selectedFile.type.startsWith('audio/')) {
      toast.error('⚠️ Please upload a valid audio file.');
      return;
    }

    if (
      tab === 'text' &&
      !['text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)
    ) {
      toast.error('⚠️ Please upload a TXT or DOCX file.');
      return;
    }

    setFile(selectedFile);

    // ✅ Set file name without extension as subject/title
    const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, '');
    setFileName(nameWithoutExt);
  };

  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    setFile(null);
    setFileName('');
  };

  const handleGenerate = async () => {
    if (!file) {
      toast.error('⚠️ No file selected.');
      return;
    }

    if (tab !== 'pdf') {
      toast.error('⚠️ Only PDF tab is supported currently.');
      return;
    }

    setLoading(true);
    toast.loading('🔄 Processing file, please wait...', { id: 'process' });

    try {
      const result = await uploadPdfToBackend(file);

      if (!result) throw new Error('No response from server');

      // ✅ Save fileName as title & subject in saved results
      saveResult({
        title: fileName,
        subject: fileName,
        summary: result.summary,
        mcqs: result.mcqs,
        flashcards: result.flashcards,
        voiceUrl: result.voiceUrl,
        date: new Date().toLocaleDateString(),
      });

      // ✅ Temp result for ResultPage
      setTempResult({
        ...result,
        title: fileName,
        subject: fileName,
        date: new Date().toLocaleDateString(),
      });

      toast.success('✅ AI output generated!', { id: 'process' });
      navigate('/result');
    } catch (error) {
      console.error('❌ File Processing Error:', error);
      toast.error('❌ Failed to process file. Try again!', { id: 'process' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-white text-black dark:bg-[#0d0c1d] dark:text-white transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-700 dark:text-purple-400">
        Upload Your Study Material
      </h2>

      <TabSwitcher
        tabs={['pdf', 'text', 'audio']}
        activeTab={tab}
        onSwitch={handleTabSwitch}
      />

      <FileUploader
        tab={tab}
        file={file}
        onFileChange={handleFileChange}
      />

      <div className="flex justify-center mt-10">
        <button
          onClick={handleGenerate}
          disabled={!file || loading}
          className={`px-6 py-3 rounded font-semibold shadow-md transition-all duration-300
            ${file ? 'bg-purple-600 hover:bg-purple-700 text-white scale-105' : 'bg-gray-400 dark:bg-gray-700 text-white cursor-not-allowed'}
          `}
        >
          {loading ? '⏳ Processing...' : '🚀 Generate AI Output'}
        </button>
      </div>
    </div>
  );
}

export default UploadDashboard;
