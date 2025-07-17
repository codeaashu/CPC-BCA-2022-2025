import { geminiClient } from "@/lib/gemini.sdk";

export async function listGeminiModels() {
  try {
    const models = await geminiClient.listModels();
    console.log("Available Gemini models:", models);
    return models;
  } catch (error) {
    console.error("Error listing Gemini models:", error);
    throw error;
  }
}
