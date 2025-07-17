import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    question_amount = 5,
    title,
    level,
    type,
    company,
    industry,
    description,
    requirements = [],
    responsibilities = [],
  } = await request.json();

  const prompt = `
You are an expert HR interviewer and assessment expert. Your task is to generate thoughtful, specific, and relevant interview questions based on a given job description and its structured details.

Objective:
Generate exactly ${question_amount} high-quality questions to evaluate a candidate’s readiness and fit for the role.

Focus Areas:
- Role Title: ${title}
- Experience Level: ${level}
- Employment Type: ${type}
- Company: ${company}
- Industry: ${industry}
- Core Job Description: ${description}

- Key Requirements: 
${requirements.map((item: string) => `- ${item}`).join("\n")}

- Key Responsibilities: 
${responsibilities.map((item: string) => `- ${item}`).join("\n")}

Guidelines:
  - Start with basic question, and then rise the bar
  - Use the provided job data to craft questions that assess:
    - Required technical skills and tools (from “requirements”)
    - Practical understanding of the role’s responsibilities
    - Candidate’s experience level and fit
    - Behavioral and situational responses relevant to the role
  - Questions should feel realistic, like those asked in actual interviews for this role.
  - Phrase questions professionally and clearly.
  - Do not include duplicate or generic questions.

Avoid:
- Vague or unrelated questions
- Repetition
- Hypothetical tech that’s not mentioned in the job description

Output Format:
Return only the questions in a valid JSON array of strings, like:
["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"]
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.text ||
      data?.text ||
      "";

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { questions: [] };
    }

    return NextResponse.json(
      {
        success: true,
        questions: Array.isArray(parsed) ? parsed : parsed.questions || [],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while generating questions", error);
    return NextResponse.json({
      success: false,
      message: "Error while generating questions",
    });
  }
}
