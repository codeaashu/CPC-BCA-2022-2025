// testGroq.js
require('dotenv').config();
const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

const getGroqSummary = async (prompt) => {
  const messages = [
    {
      role: "system",
      content: "You are an AI assistant. Only respond with pure JSON. Do not explain anything."
    },
    {
      role: "user",
      content: `
Given the following content, generate:
- A summary (3-4 lines)
- 3 multiple choice questions (MCQs)
- 2 flashcards (with 'q' and 'a' keys)

Return EXACTLY this JSON structure:

{
  "summary": "...",
  "mcqs": ["...Q1...", "...Q2...", "...Q3..."],
  "flashcards": [{"q": "...", "a": "..."}, {"q": "...", "a": "..."}]
}

Content:
${prompt}
      `
    }
  ];

  const headers = {
    "Authorization": `Bearer ${GROQ_API_KEY}`,
    "Content-Type": "application/json"
  };

  const body = {
    model: "llama3-70b-8192",
    messages,
    temperature: 0.7
  };

  try {
    const res = await axios.post("https://api.groq.com/openai/v1/chat/completions", body, { headers });
    const content = res.data.choices[0].message.content;

    // Try to parse the response into JSON
    const parsed = JSON.parse(content);
    return parsed;
  } catch (err) {
    console.error('❌ Groq API Error:', err.response?.data || err.message);
    throw err;
  }
};

// Run it
(async () => {
  try {
    const result = await getGroqSummary("India is a country in South Asia. The capital is New Delhi.");
    console.log("✅ Groq Response:", result);
  } catch (e) {
    console.error("❌ Groq Test Failed:", e.message);
  }
})();
