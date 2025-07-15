const express = require('express');
const router = express.Router();
const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

// 📁 English Voice (Summary)
// POST /api/tts/generate
router.post('/generate', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'No text provided for TTS' });
  }

  try {
    const filename = `voice_en_${Date.now()}.mp3`;
    const filepath = path.join(__dirname, '..', 'public', 'voice', filename);
    const gtts = new gTTS(text, 'en');

    gtts.save(filepath, (err) => {
      if (err) {
        console.error('❌ TTS Error:', err);
        return res.status(500).json({ error: 'TTS generation failed' });
      }

      const base64 = fs.readFileSync(filepath, { encoding: 'base64' });
      console.log('✅ English voice file saved:', filename);
      res.json({ voiceBase64: base64, voiceUrl: `/voice/${filename}` });
    });
  } catch (err) {
    console.error('❌ TTS Catch Error:', err);
    res.status(500).json({ error: 'Internal TTS error' });
  }
});


// 📁 Hinglish Voice (Hinglish Explanation)
// POST /api/tts/generate-hinglish
router.post('/generate-hinglish', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'No text provided for Hinglish TTS' });
  }

  try {
    const filename = `voice_hi_${Date.now()}.mp3`;
    const filepath = path.join(__dirname, '..', 'public', 'voice', filename);
    const gtts = new gTTS(text, 'hi'); // Use Hindi to simulate Hinglish voice

    gtts.save(filepath, (err) => {
      if (err) {
        console.error('❌ Hinglish TTS Error:', err);
        return res.status(500).json({ error: 'Hinglish TTS generation failed' });
      }

      const base64 = fs.readFileSync(filepath, { encoding: 'base64' });
      console.log('✅ Hinglish voice file saved:', filename);
      res.json({ voiceBase64: base64, voiceUrl: `/voice/${filename}` });
    });
  } catch (err) {
    console.error('❌ Hinglish TTS Catch Error:', err);
    res.status(500).json({ error: 'Internal Hinglish TTS error' });
  }
});

module.exports = router;
