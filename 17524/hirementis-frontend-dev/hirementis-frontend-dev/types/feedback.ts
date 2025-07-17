export interface QuestionEvaluation {
  score: number;
  coverage: string;
  missed_points: string[];
  depth: string;
}

export interface QuestionFeedback {
  question_id: number;
  question: string;
  candidate_answer: string;
  candidate_answer_summary?: string;
  expected_ideal_points: string[];
  evaluation: QuestionEvaluation;
  recommendation: string;
  actual_answer?: string;
}

export interface ScoreItem {
  score: number;
  commentary: string;
}

export interface Scorecard {
  technical_skills: ScoreItem;
  problem_solving: ScoreItem;
  communication: ScoreItem;
  confidence: ScoreItem;
}

export interface InterviewSummary {
  overall_analysis: string;
  notable_strengths: string[];
  areas_for_improvement: string[];
  overall_rating: number;
}

export interface FinalRecommendations {
  practice_focus_areas: string[];
  overall_impression: string;
  final_tip: string;
}

export interface FeedbackData {
  success: boolean;
  job: Job;
  createdAt: string | number | Date;
  feedback: InterviewFeedbackResult;
}

export interface LLMResponse {
  [key: string]: any;
}

export interface ExtractAnswerResponse extends LLMResponse {
  exact_answer?: string;
}

export interface InterviewSummaryResponse extends LLMResponse {
  overall_analysis: string;
  notable_strengths: string[];
  areas_for_improvement: string[];
  overall_rating: number;
}

export interface ScorecardResponse extends LLMResponse {
  technical_skills: { score: number; commentary: string };
  problem_solving: { score: number; commentary: string };
  communication: { score: number; commentary: string };
  confidence: { score: number; commentary: string };
}

export interface QuestionFeedbackResponse extends LLMResponse {
  question_id: number;
  question: string;
  candidate_answer: string;
  actual_answer: string;
  expected_ideal_points: string[];
  evaluation: {
    score: number;
    coverage: string;
    missed_points: string[];
    depth: string;
  };
  recommendation: string;
}

export interface FinalRecommendationsResponse extends LLMResponse {
  practice_focus_areas: string[];
  overall_impression: string;
  final_tip: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary: string;
  posted: string;
  logo: string;
  industry: string;
}

export interface InterviewFeedbackResult {
  interview_summary: {
    overall_analysis: string;
    notable_strengths: string[];
    areas_for_improvement: string[];
    overall_rating: number; // 0.0 to 10.0
  };

  scorecard: {
    technical_skills: {
      score: number; // 0 to 10
      commentary: string;
    };
    problem_solving: {
      score: number; // 0 to 10
      commentary: string;
    };
    communication: {
      score: number; // 0 to 10
      commentary: string;
    };
    confidence: {
      score: number; // 0 to 10
      commentary: string;
    };
  };

  per_question_feedback: Array<{
    question_id: number;
    question: string;
    candidate_answer: string;
    actual_answer: string;
    expected_ideal_points: string[];
    evaluation: {
      score: number; // 0 to 10
      coverage: string;
      missed_points: string[];
      depth: string;
    };
    recommendation: string;
  }>;

  final_recommendations: {
    practice_focus_areas: string[];
    overall_impression: string;
    final_tip: string;
  };
}
