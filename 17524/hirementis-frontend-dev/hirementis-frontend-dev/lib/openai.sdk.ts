import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  // baseURL: process.env.NEXT_PUBLIC_GEMINI_API_BASE_URL,
});
