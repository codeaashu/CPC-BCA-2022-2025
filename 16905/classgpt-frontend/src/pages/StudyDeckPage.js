import React, { useState } from 'react';
import { useStudy } from '../context/studyStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const StudyDeckPage = () => {
  const [filter, setFilter] = useState('All');
  const [viewDeck, setViewDeck] = useState(null);
  const { savedResults, deleteResult } = useStudy();
  const navigate = useNavigate();

  const filteredDecks =
    filter === 'All'
      ? savedResults
      : savedResults.filter((deck) => deck.subject === filter);

  const uniqueSubjects = ['All', ...new Set(savedResults.map((r) => r.subject))];

  const handleExport = () => {
    toast.success('Exported successfully!');
    setTimeout(() => {
      navigate('/quiz-export');
    }, 1000);
  };

  const handleDelete = async (id, isLocalOnly = false) => {
    if (!id) {
      toast.error('❌ Missing ID for deletion');
      return;
    }

    try {
      if (!isLocalOnly) {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/save/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Delete failed from DB');
      }

      deleteResult(id);

      if (viewDeck && (viewDeck._id === id || viewDeck.id === id)) {
        setViewDeck(null);
      }

      toast.success('🗑️ Deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete');
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-white text-black dark:bg-[#0d0c1d] dark:text-white transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700 dark:text-purple-400">
        📦 My Study Deck
      </h2>

      {/* Filter */}
      <div className="max-w-3xl mx-auto mb-8 flex justify-end">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white text-black dark:bg-[#1a182d] dark:text-white border border-purple-600 px-4 py-2 rounded"
        >
          {uniqueSubjects.map((subject, i) => (
            <option key={i} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDecks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-2">
            No saved results yet.
          </p>
        ) : (
          filteredDecks.map((deck, i) => {
            const id = deck._id || deck.id;
            const isLocalOnly = !deck._id;

            return (
              <div
                key={id || i}
                className="bg-white dark:bg-[#1a182d] p-6 rounded-xl shadow-md hover:scale-[1.02] transition"
              >
                <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400">
                  {deck.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">📅 {deck.date}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">📘 Subject: {deck.subject}</p>

                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    className="text-sm bg-purple-600 px-4 py-1 rounded text-white hover:bg-purple-700"
                    onClick={() => setViewDeck(deck)}
                  >
                    View
                  </button>
                  <button
                    onClick={handleExport}
                    className="text-sm border border-purple-600 px-4 py-1 rounded hover:bg-purple-700 text-purple-600 dark:text-white"
                  >
                    Export
                  </button>
                  <button
                    onClick={() => handleDelete(id, isLocalOnly)}
                    className="text-sm border border-red-600 px-4 py-1 rounded text-red-600 hover:bg-red-600 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {viewDeck && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#1a182d] p-6 rounded-2xl max-w-3xl w-full relative max-h-[90vh] overflow-y-auto text-black dark:text-white shadow-xl">
            <button
              onClick={() => setViewDeck(null)}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-600 dark:text-white hover:text-red-500"
            >
              ✖
            </button>

            <h3 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400">
              {viewDeck.title}
            </h3>

            <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>📘 Subject:</strong> {viewDeck.subject}
            </p>
            <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
              <strong>📅 Date:</strong> {viewDeck.date}
            </p>

            <div className="mb-4">
              <h4 className="text-purple-600 dark:text-purple-400 font-semibold">📝 Summary</h4>
              <p className="text-sm text-gray-800 dark:text-gray-300">{viewDeck.summary}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-purple-600 dark:text-purple-400 font-semibold">❓ MCQs</h4>
              <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-300 space-y-1">
                {viewDeck.mcqs.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-purple-600 dark:text-purple-400 font-semibold mb-2">🃏 Flashcards</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {viewDeck.flashcards.map((fc, i) => (
                  <div key={i} className="bg-purple-800 rounded p-3 text-sm text-white">
                    <strong>Q:</strong> {fc.q}
                    <br />
                    <strong>A:</strong> {fc.a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyDeckPage;
