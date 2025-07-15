const axios = require('axios');
require('dotenv').config();

exports.getHinglishExplanation = async (text) => {
  const prompt = `
Tum ek helpful AI ho. Niche diya gaya explanation ko simple Hinglish (mix Hindi + English) me samjhao jaise ek student ko samjhate ho. Sirf Hinglish me answer do.

"""
${text}
"""

Output:
`;

  try {
    const res = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5,
        max_tokens: 1000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    return res.data.choices[0].message.content.trim();
  } catch (err) {
    console.error('❌ Hinglish Explanation Error:', err.message);
    throw err;
  }
};
