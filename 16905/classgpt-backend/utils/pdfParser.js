const pdfParse = require('pdf-parse');

// ✅ Suppress known PDF warning: "TT: undefined function"
const originalWarn = console.warn;
console.warn = function (msg) {
  if (typeof msg === 'string' && msg.includes('TT: undefined function')) {
    return; // ignore only this warning
  }
  originalWarn.apply(console, arguments);
};

exports.extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdfParse(buffer);

    // ✅ Clean text: remove strange warnings, special characters, and trim length
    const cleanText = data.text
      .replace(/TT: undefined function: \d+/g, '')
      .replace(/[^\x00-\x7F]/g, '')  // remove non-ASCII characters
      .replace(/\s+/g, ' ')          // collapse excessive whitespace
      .trim();

    return cleanText.slice(0, 10000); // cap to 3K characters
  } catch (err) {
    console.error('❌ PDF Parse Error:', err.message);
    throw new Error('PDF parsing failed');
  }
};
