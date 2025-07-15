import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useStudy } from '../context/studyStore'; // ✅ Live data

const QuizExportPage = () => {
  const { tempResult } = useStudy();

  // ✅ Use flashcards for reliable Q&A structure
  const flashcards = tempResult?.flashcards || [];

  const parsedQuestions = flashcards.map((item) => ({
    q: item.q,
    a: item.a || 'N/A',
  }));

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('🧠 ClassGPT Quiz Export', 14, 22);

    const rows = parsedQuestions.map((item, index) => [
      `Q${index + 1}: ${item.q}`,
      `Ans: ${item.a}`,
    ]);

    autoTable(doc, {
      head: [['Question', 'Answer']],
      body: rows,
      startY: 30,
      styles: { fontSize: 12, cellPadding: 4 },
      headStyles: { fillColor: [101, 31, 255] },
    });

    doc.save('classgpt-quiz.pdf');
  };

  if (!parsedQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        ⚠️ No quiz data found. Please generate a result first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0d0c1d] dark:text-white px-6 py-10 transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
        📄 Export Quiz as PDF
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-lg">
        {parsedQuestions.map((item, i) => (
          <div key={i}>
            <strong>Q{i + 1}: {item.q}</strong>
            <br />
            <span className="text-gray-800 dark:text-gray-300">Ans: {item.a}</span>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleExportPDF}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-all"
        >
          📄 Download PDF
        </button>
      </div>
    </div>
  );
};

export default QuizExportPage;
