const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/ask-hinglish', async (req, res) => {
  const { notes, question } = req.body;

  if (!notes || !question) {
    return res.status(400).json({ error: 'Missing notes or question' });
  }

  const prompt = `
Tum ek educational AI ho jo Hindi-English mix (Hinglish) mein answer karta hai.

Notes:
"""
${notes}
"""

User's Question:
"${question}"

Answer this in Hinglish with simple, relatable examples. Don’t use markdown or heading. Just plain text.
`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 500,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to answer' });
  }
});

module.exports = router;
