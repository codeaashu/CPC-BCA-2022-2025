import { InterviewFeedbackResult, Job } from "@/types/feedback";
import { Parser } from "@json2csv/plainjs";
import jsPDF from "jspdf";

interface Data {
  job: Job;
  feedback: InterviewFeedbackResult;
}

export function flattenDataAndExportToPDF(data: Data): void {
  try {
    const doc = new jsPDF();
    const job = data.job;
    const summary = data.feedback.interview_summary;
    const recommendations = data.feedback.final_recommendations;

    doc.setFontSize(18);
    doc.text("Interview Feedback Summary", 20, 20);

    doc.setFontSize(12);
    doc.text(`Job Title: ${job.title}`, 20, 35);
    doc.text(`Company: ${job.company}`, 20, 45);
    doc.text(`Location: ${job.location}`, 20, 55);
    doc.text(`Level: ${job.level}`, 20, 65);

    doc.text("Overall Rating: " + summary.overall_rating, 20, 80);
    doc.text("Overall Analysis:", 20, 90);
    doc.text(doc.splitTextToSize(summary.overall_analysis, 170), 20, 100);

    doc.text("\nNotable Strengths:", 20, 120);
    summary.notable_strengths.forEach((point, idx) => {
      doc.text(`- ${point}`, 25, 130 + idx * 10);
    });

    const improvementStart = 130 + summary.notable_strengths.length * 10 + 10;
    doc.text("Areas for Improvement:", 20, improvementStart);
    summary.areas_for_improvement.forEach((point, idx) => {
      doc.text(`- ${point}`, 25, improvementStart + 10 + idx * 10);
    });

    const recommendationStart = improvementStart + 10 + summary.areas_for_improvement.length * 10 + 10;
    doc.text("Final Recommendations:", 20, recommendationStart);
    doc.text(doc.splitTextToSize(recommendations.overall_impression, 170), 20, recommendationStart + 10);

    const finalTipStart = recommendationStart + 30;
    doc.text("Final Tip:", 20, finalTipStart);
    doc.text(doc.splitTextToSize(recommendations.final_tip, 170), 20, finalTipStart + 10);

    doc.save("interview-feedback.pdf");
  } catch (error) {
    console.error("Failed to export PDF:", error);
  }
}

export function flattenDataAndExportToCSV(data: Data): void {
  const flattenedData: any[] = [];

  const jobDetails = {
    jobId: data.job.id,
    jobTitle: data.job.title,
    company: data.job.company,
    location: data.job.location,
    type: data.job.type,
    level: data.job.level,
    description: data.job.description,
    salary: data.job.salary,
    posted: data.job.posted,
    logo: data.job.logo,
    industry: data.job.industry,
    overallRating: data.feedback.interview_summary.overall_rating,
    overallAnalysis: data.feedback.interview_summary.overall_analysis,
    notableStrengths:
      data.feedback.interview_summary.notable_strengths.join("; "),
    areasForImprovement:
      data.feedback.interview_summary.areas_for_improvement.join("; "),
    finalRecommendations:
      data.feedback.final_recommendations.overall_impression,
    practiceFocusAreas:
      data.feedback.final_recommendations.practice_focus_areas.join("; "),
    finalTip: data.feedback.final_recommendations.final_tip,
  };

  flattenedData.push(jobDetails);

  data.feedback.per_question_feedback.forEach((questionFeedback) => {
    const questionDetails = {
      questionId: questionFeedback.question_id,
      question: questionFeedback.question,
      candidateAnswer: questionFeedback.candidate_answer,
      actualAnswer: questionFeedback.actual_answer,
      evaluationScore: questionFeedback.evaluation.score,
      evaluationCoverage: questionFeedback.evaluation.coverage,
      missedPoints: questionFeedback.evaluation.missed_points.join("; "),
      depth: questionFeedback.evaluation.depth,
      recommendation: questionFeedback.recommendation,
    };

    flattenedData.push({ ...jobDetails, ...questionDetails });
  });

  try {
    const fields = [
      { label: "Job ID", value: "jobId" },
      { label: "Job Title", value: "jobTitle" },
      { label: "Company", value: "company" },
      { label: "Location", value: "location" },
      { label: "Type", value: "type" },
      { label: "Level", value: "level" },
      { label: "Description", value: "description" },
      { label: "Salary", value: "salary" },
      { label: "Posted", value: "posted" },
      { label: "Logo", value: "logo" },
      { label: "Industry", value: "industry" },
      { label: "Overall Rating", value: "overallRating" },
      { label: "Overall Analysis", value: "overallAnalysis" },
      { label: "Notable Strengths", value: "notableStrengths" },
      { label: "Areas For Improvement", value: "areasForImprovement" },
      { label: "Final Recommendations", value: "finalRecommendations" },
      { label: "Practice Focus Areas", value: "practiceFocusAreas" },
      { label: "Final Tip", value: "finalTip" },
      { label: "Question ID", value: "questionId" },
      { label: "Question", value: "question" },
      { label: "Candidate Answer", value: "candidateAnswer" },
      { label: "Actual Answer", value: "actualAnswer" },
      { label: "Evaluation Score", value: "evaluationScore" },
      { label: "Evaluation Coverage", value: "evaluationCoverage" },
      { label: "Missed Points", value: "missedPoints" },
      { label: "Depth", value: "depth" },
      { label: "Recommendation", value: "recommendation" },
    ];

    const parser = new Parser({ fields, withBOM: true });
    const csv = parser.parse(flattenedData);

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "feedback.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error(err);
  }
}
