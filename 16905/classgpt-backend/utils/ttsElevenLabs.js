// utils/ttsElevenLabs.js
const axios = require('axios');
const gTTS = require('gtts');
require('dotenv').config();

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel (English)

exports.generateVoiceBase64 = async (text) => {
  try {
    // 🧠 ElevenLabs API call
    const response = await axios({
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      },
      responseType: 'arraybuffer',
    });

    // 🔁 Convert Buffer to Base64
    const base64Audio = Buffer.from(response.data).toString('base64');
    return base64Audio;

  } catch (err) {
    console.error('❌ ElevenLabs voice generation failed:', err.response?.data || err.message);
    console.warn('⚠️ Falling back to gTTS...');

    // 🧠 Fallback to gTTS
    return new Promise((resolve, reject) => {
      const gtts = new gTTS(text, 'en');
      let chunks = [];

      const stream = gtts.stream();
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64Audio = buffer.toString('base64');
        console.log('✅ Voice generated with gTTS fallback');
        resolve(base64Audio);
      });
      stream.on('error', (err) => {
        console.error('❌ gTTS fallback failed:', err.message);
        reject(new Error('Voice generation failed'));
      });
    });
  }
};
