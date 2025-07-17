import { InterviewFeedbackResult } from "@/types/feedback";
import { Job } from "@/types/feedback";

// ✅ Using REST API directly (no SDK)
class InterviewFeedbackGenerator {
  private jobDetails: Job;
  private transcript: string;
  private questions: string[];
  private userName: string;

  constructor(
    jobDetails: Job,
    transcript: string,
    questions: string[] = [],
    userName: string
  ) {
    this.jobDetails = jobDetails;
    this.transcript = transcript;
    this.questions = Array.isArray(questions) ? questions : [];
    this.userName = userName;
  }

  async generateInterviewSummary() {
    const prompt = `As a senior interview coach, analyze this candidate's overall performance for the following job and transcript. Return only JSON with keys: overall_analysis, notable_strengths, areas_for_improvement, overall_rating (0-10).\n\nJob Data: ${JSON.stringify(this.jobDetails)}\nCandidate's Name: ${this.userName}\nTranscript: ${this.transcript}`;
    const summary = await this.callGemini(prompt);
    // Always return an array for areas_for_improvement
    return {
      ...summary,
      areas_for_improvement: Array.isArray(summary?.areas_for_improvement) ? summary.areas_for_improvement : [],
    };
  }

  async generateScorecard() {
    const prompt = `As a senior interview coach, score this candidate for the following job and transcript. Return only JSON with keys: technical_skills, problem_solving, communication, confidence (each with score 0-10 and commentary).\n\nJob Data: ${JSON.stringify(this.jobDetails)}\nCandidate's Name: ${this.userName}\nTranscript: ${this.transcript}`;
    return await this.callGemini(prompt);
  }

  async generateQuestionFeedback() {
    if (!Array.isArray(this.questions) || this.questions.length === 0) {
      return [];
    }

    const feedbackArr = [];
    for (let i = 0; i < this.questions.length; i++) {
      const question = this.questions[i];
      const prompt = `As an interview coach, evaluate this Q&A for the following job. Return only JSON with keys: question_id, question, candidate_answer, actual_answer, expected_ideal_points, evaluation (score, coverage, missed_points, depth), recommendation.\n\nJob Data: ${JSON.stringify(this.jobDetails)}\nCandidate's Name: ${this.userName}\nQuestion: ${question}\nTranscript: ${this.transcript}`;
      const feedback = await this.callGemini(prompt);
      feedbackArr.push(feedback);
    }

    return feedbackArr;
  }

  async generateFinalRecommendations() {
    const prompt = `As a senior interview coach, provide final recommendations for this candidate and job. Return only JSON with keys: practice_focus_areas, overall_impression, final_tip.\n\nJob Data: ${JSON.stringify(this.jobDetails)}\nCandidate's Name: ${this.userName}\nTranscript: ${this.transcript}`;
    return await this.callGemini(prompt);
  }

  async generateCompleteFeedback(): Promise<InterviewFeedbackResult> {
    const summary = await this.generateInterviewSummary();
    const scorecard = await this.generateScorecard();
    const questionFeedback = await this.generateQuestionFeedback();
    const recommendations = await this.generateFinalRecommendations();

    return {
      interview_summary: summary,
      scorecard: scorecard,
      per_question_feedback: questionFeedback,
      final_recommendations: recommendations,
    };
  }

  async extractAnswerForQuestion(
    question: string,
    index: number
  ): Promise<any> {
    const prompt = `Extract the candidate's exact answer for the following question from the transcript. Return only JSON with key: exact_answer.\n\nQuestion: ${question}\nTranscript: ${this.transcript}`;
    return await this.callGemini(prompt);
  }

  async callGemini(prompt: string): Promise<any> {
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

      return text;
    } catch (error) {
      console.error("Gemini API call failed:", error);
      throw error;
    }
  }
}

export default InterviewFeedbackGenerator;
