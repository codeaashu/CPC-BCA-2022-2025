const { extractTextFromPdf } = require('../utils/pdfParser');
const { getGroqSummary } = require('../utils/groq');
const { generateVoiceBase64 } = require('../utils/ttsElevenLabs');
const { getHinglishExplanation, getHinglishQA } = require('../utils/hinglishAI'); // ✅ NEW imports

exports.summarizePdfHandler = async (req, res) => {
  console.log('📩 /api/pdf/upload endpoint hit');

  try {
    // 1️⃣ Check file
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // 2️⃣ Extract text
    const text = await extractTextFromPdf(req.file.buffer);
    if (!text || text.length < 100) {
      return res.status(400).json({ error: 'PDF content too short or unreadable.' });
    }

    // 3️⃣ Generate AI Output
    const aiResult = await getGroqSummary(text);
    if (!aiResult || !aiResult.summary) {
      return res.status(500).json({ error: 'AI failed to generate valid output.' });
    }

    console.log('🧠 AI Summary:', aiResult.summary.slice(0, 200) + '...');

    // 4️⃣ Generate English voice
    let voiceBase64 = null;
    try {
      voiceBase64 = await generateVoiceBase64(aiResult.summary);
    } catch (err) {
      console.warn('⚠️ English voice skipped:', err.message);
    }

    // 5️⃣ Hinglish Explanation
    let hinglishExplanation = '';
    let hinglishVoiceBase64 = '';
    try {
      hinglishExplanation = await getHinglishExplanation(aiResult.summary);
      hinglishVoiceBase64 = await generateVoiceBase64(hinglishExplanation, 'hi'); // 👈 Hindi voice
    } catch (err) {
      console.warn('⚠️ Hinglish generation skipped:', err.message);
    }

    // 6️⃣ Respond
    res.json({
      summary: aiResult.summary,
      mcqs: aiResult.mcqs || [],
      flashcards: aiResult.flashcards || [],
      voiceBase64,
      hinglishExplanation,
      voiceHinglishBase64: hinglishVoiceBase64,
    });

  } catch (err) {
    console.error('❌ PDF Processing Failed:', err.message);
    res.status(500).json({ error: 'PDF processing failed' });
  }
};
