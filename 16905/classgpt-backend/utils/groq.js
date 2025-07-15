//utils groq.js
const axios = require('axios');
require('dotenv').config();

exports.getGroqSummary = async (text) => {
  const prompt = `
You are an educational AI designed to generate academic material from given input.

Return ONLY a valid JSON with this structure:

{
  "summary": "A comprehensive explanation of the topic (minimum 300 words) in formal academic English.",
  "hinglishExplanation": "A simplified explanation of the topic in Hinglish with relatable examples. Use student-friendly, casual tone. Avoid technical jargon unless necessary.",
  "important_points": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
  "keywords": ["Term1", "Term2", "Term3", "Term4", "Term5"],
  "explanation": "A simplified explanation of the topic in beginner-level English.",
  "examples": ["Example 1", "Example 2"],
  "mcqs": [
    "Q1...",
    "Q2...",
    "Q3...",
    "Q4...",
    "Q5..."
  ],
  "flashcards": [
    { "q": "Question 1?", "a": "Answer 1" },
    { "q": "Question 2?", "a": "Answer 2" },
    { "q": "Question 3?", "a": "Answer 3" },
    { "q": "Question 4?", "a": "Answer 4" },
    { "q": "Question 5?", "a": "Answer 5" },
    { "q": "Question 6?", "a": "Answer 6" }
  ]
}

Input:
"""
${text}
"""

Important Rules:
- Only return pure JSON. No markdown, no extra comments, no greetings.
- Make sure the Hinglish explanation is friendly, engaging, and includes real-world comparisons or analogies.
- The summary must be detailed and factually accurate.
`;

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 8000,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const aiText = response.data.choices[0].message.content;
    console.log('📦 Raw Groq Output:', aiText);

    return JSON.parse(aiText); // Will now succeed
  } catch (err) {
    console.error('❌ Groq API Error:', err.response?.data || err.message);
    throw new Error('Groq API failed: ' + err.message);
  }
};
