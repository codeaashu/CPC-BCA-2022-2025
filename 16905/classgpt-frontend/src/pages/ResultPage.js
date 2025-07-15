import React, { useState } from 'react';
import FlashcardFlip from '../components/FlashcardFlip';
import { useStudy } from '../context/studyStore';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const tabs = ['Summary', 'Hinglish', 'MCQs', 'Flashcards', 'Details'];

const ResultPage = () => {
  const { tempResult } = useStudy();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Summary');
  const [expanded, setExpanded] = useState(false);
  const [showHinglish, setShowHinglish] = useState(true);
  const [question, setQuestion] = useState('');
  const [hinglishAnswer, setHinglishAnswer] = useState('');
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);

  const voiceDataURI = tempResult?.voiceBase64 ? `data:audio/mpeg;base64,${tempResult.voiceBase64}` : null;
  const voiceHinglishURI = tempResult?.voiceHinglishBase64 ? `data:audio/mpeg;base64,${tempResult.voiceHinglishBase64}` : null;

  const askHinglish = async () => {
    if (!question.trim()) return;
    setLoadingAnswer(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/ask/ask-hinglish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: tempResult.hinglishExplanation,
          question,
        }),
      });
      const data = await res.json();
      setHinglishAnswer(data.answer || 'No answer received');
    } catch (err) {
      setHinglishAnswer('❌ Failed to get response.');
    } finally {
      setLoadingAnswer(false);
    }
  };

  const handleSave = async () => {
    if (!tempResult?.summary || !tempResult?.mcqs?.length) {
      toast.error('⚠️ Incomplete or empty result');
      return;
    }

    const payload = {
      ...tempResult,
      title: 'AI Output - ' + new Date().toLocaleDateString(),
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      setIsSaving(true);
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      toast.success('✅ Saved!');
      setTimeout(() => navigate('/study'), 1500);
    } catch (err) {
      toast.error('❌ Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  if (!tempResult) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">⚠️ No result found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0c1d] text-black dark:text-white px-4 py-8 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">📄 AI-Generated Results</h2>

      {/* Tabs */}
      <div className="flex justify-center mb-8 gap-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 text-sm ${
              activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-[#1f1b2e] dark:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Summary Tab */}
        {activeTab === 'Summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-4xl mx-auto bg-gray-100 dark:bg-[#1a182d] p-6 rounded-xl shadow"
          >
            <h3 className="text-xl font-semibold mb-4">📝 Summary</h3>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {expanded || tempResult.summary.length < 400
                ? tempResult.summary
                : tempResult.summary.slice(0, 400) + '...'}
              {tempResult.summary.length > 400 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="ml-2 text-blue-400 underline"
                >
                  {expanded ? 'Show Less' : 'Read More'}
                </button>
              )}
            </p>
            {voiceDataURI && (
              <div className="mt-4">
                <audio controls className="w-full rounded shadow-md">
                  <source src={voiceDataURI} type="audio/mpeg" />
                </audio>
                <p className="text-xs text-gray-500 mt-1">🔊 AI reads the summary aloud</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Hinglish Tab */}
        {activeTab === 'Hinglish' && (
          <motion.div
            key="hinglish"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-4xl mx-auto bg-gray-100 dark:bg-[#1a182d] p-6 rounded-xl shadow"
          >
            <h3 className="text-xl font-semibold mb-4">🇮🇳 Hinglish Explanation</h3>
            <p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">{tempResult.hinglishExplanation}</p>
            {voiceHinglishURI && (
              <div className="mt-4">
                <audio controls className="w-full rounded">
                  <source src={voiceHinglishURI} type="audio/mpeg" />
                </audio>
                <p className="text-xs text-gray-500 mt-1">🎧 Hinglish voice note</p>
              </div>
            )}

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">🤔 Ask from Notes</h4>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="p-2 rounded bg-white dark:bg-[#28243d] text-sm border border-gray-300 dark:border-gray-600"
                  placeholder="Ask in Hinglish..."
                />
                <button
                  onClick={askHinglish}
                  className="self-start bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm"
                >
                  Ask
                </button>
                {loadingAnswer ? (
                  <p className="text-sm italic text-gray-400 mt-2">⏳ Generating answer...</p>
                ) : hinglishAnswer && (
                  <p className="text-sm text-gray-800 dark:text-gray-300 mt-2">{hinglishAnswer}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* MCQs Tab */}
        {activeTab === 'MCQs' && (
          <motion.div
            key="mcqs"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-3xl mx-auto bg-gray-100 dark:bg-[#1a182d] p-6 rounded-xl shadow"
          >
            <h3 className="text-xl font-semibold mb-4">❓ Auto-MCQs</h3>
            <ul className="list-disc list-inside text-sm space-y-2">
              {tempResult.mcqs.map((q, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {q}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Flashcards Tab */}
        {activeTab === 'Flashcards' && (
          <motion.div
            key="flashcards"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-5xl mx-auto bg-gray-100 dark:bg-[#1a182d] p-6 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">🃏 Flashcards</h3>
              <button
                onClick={() => setShowFlashcards(!showFlashcards)}
                className="text-sm text-blue-400 underline"
              >
                {showFlashcards ? 'Hide All' : 'Show All'}
              </button>
            </div>
            {showFlashcards && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tempResult.flashcards.map((fc, i) => (
                  <FlashcardFlip key={i} question={fc.q} answer={fc.a} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Keywords, Takeaways, Examples Tab */}
        {activeTab === 'Details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-4xl mx-auto grid gap-6"
          >
            {tempResult.keywords && (
              <div>
                <h3 className="text-xl font-semibold mb-2">🔑 Keywords</h3>
                <div className="flex flex-wrap gap-2">
                  {tempResult.keywords.map((k, i) => (
                    <span
                      key={i}
                      className="bg-purple-200 dark:bg-purple-700 text-sm text-black dark:text-white px-3 py-1 rounded-full"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {tempResult.important_points && (
              <div>
                <h3 className="text-xl font-semibold mb-2">📌 Key Points</h3>
                <ul className="list-disc list-inside text-sm space-y-2">
                  {tempResult.important_points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}
            {tempResult.examples?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">🧪 Examples</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {tempResult.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-semibold transition disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : '📥 Export & Save'}
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
