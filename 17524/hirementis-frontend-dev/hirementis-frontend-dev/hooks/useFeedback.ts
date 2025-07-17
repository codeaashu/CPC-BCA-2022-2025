"use client";
import { useState, useEffect } from "react";
import { FeedbackData } from "@/types/feedback";
import { getInterviewById } from "@/firebase/actions";
import { auth } from "@/firebase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "./userUser";

// const mockFeedbackData: FeedbackData = {
//   success: true,
//   feedback: {
//     interview_summary: {
//       overall_analysis:
//         "The candidate shows solid foundational understanding of backend development and REST principles. Strengths include clarity of explanation and logical approach to problem-solving. However, system design and deeper architectural thinking need refinement. The communication was structured, but sometimes lacked confidence, especially under ambiguous questions.",
//       notable_strengths: [
//         "Explained caching strategies with clarity and context",
//         "Strong problem-solving flow with verbal reasoning",
//         "Aligned key answers with the job's required skills (e.g., async processing)",
//       ],
//       areas_for_improvement: [
//         "Struggled with open-ended system design questions",
//         "Needs better clarity in articulating trade-offs and constraints",
//         "Could improve confidence in speaking about distributed systems",
//       ],
//       overall_rating: 7.2,
//     },
//     scorecard: {
//       technical_skills: {
//         score: 7,
//         commentary:
//           "Good grasp of backend principles, but lacked depth in scaling strategies and system bottlenecks.",
//       },
//       problem_solving: {
//         score: 8,
//         commentary:
//           "Demonstrated clear logical steps and thought process in algorithmic questions.",
//       },
//       communication: {
//         score: 6,
//         commentary:
//           "Used structured formats (like STAR/PEEL), but delivery lacked assertiveness at times.",
//       },
//       confidence: {
//         score: 5,
//         commentary:
//           "Hesitant during certain answers, especially when unsure. Needs more mock practice to build natural confidence.",
//       },
//       jd_alignment: {
//         score: 7,
//         commentary:
//           "Answered in line with the job expectations; however, depth in some key tech stacks was missing.",
//       },
//     },
//     per_question_feedback: [
//       {
//         question_id: 1,
//         question: "How would you optimize a REST API for performance?",
//         candidate_answer:
//           "Mentioned caching (Redis), async processing, indexing, and reducing payloads.",
//         expected_ideal_points: [
//           "Caching with Redis/memory store",
//           "Proper use of pagination",
//           "Asynchronous processing for long tasks",
//           "Database indexing and query optimization",
//           "Content Delivery Network (CDN)",
//         ],
//         evaluation: {
//           score: 8,
//           coverage: "Covered 4/5 key points well",
//           missed_points: ["CDN usage not discussed"],
//           depth:
//             "Good explanation of caching, but lacked a real-world use case example",
//         },
//         recommendation:
//           "Give examples when talking about techniques (e.g., explain Redis with a user-session example)",
//       },
//       {
//         question_id: 2,
//         question: "Design Twitter backend architecture",
//         candidate_answer:
//           "Mentioned basic components like user service, post service, and timelines. Missed fan-out strategy and DB sharding.",
//         expected_ideal_points: [
//           "Service decomposition",
//           "Timeline generation strategy (fan-in/fan-out)",
//           "Database sharding or partitioning",
//           "Rate limiting and API gateway",
//           "Scalability discussion",
//         ],
//         evaluation: {
//           score: 5,
//           coverage: "Partial coverage (2/5)",
//           missed_points: [
//             "Fan-out on write/read strategies",
//             "Horizontal scaling or DB partitioning",
//             "No mention of rate limits or failover",
//           ],
//           depth:
//             "Too surface-level; needed to go deeper into scale and trade-offs",
//         },
//         recommendation:
//           "Study large-scale system design patterns. Focus on scalability trade-offs (e.g., eventual consistency vs real-time sync)",
//       },
//     ],
//     final_recommendations: {
//       practice_focus_areas: [
//         "Deep-dive into system design (e.g., scale, trade-offs, CAP theorem)",
//         "Mock interviews for open-ended thinking and confidence",
//         "Examples and storytelling in answers (connect real experience)",
//       ],
//       overall_impression:
//         "The candidate is ready for mid-level backend roles but should invest focused time in mastering system design interviews and communication delivery.",
//       final_tip:
//         "Record yourself answering a system design question and critique your explanation clarity and depth. Iterate weekly.",
//     },
//   },
// };

export const useFeedback = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    async function getFeedback() {
      setIsLoading(true);
      try {
        const token = await auth.currentUser?.getIdToken?.();
        const result = await getInterviewById(
          id || "",
          auth.currentUser?.uid || user?.uid || "",
          token
        );
        if (!result.success) {
          setFeedbackData(null);
          router.push("/profile");
          toast.success("You can see all your feedbacks on your profile");
          return;
        }

        setFeedbackData({
          success: true,
          feedback: result.data?.data.feedback,
          job: result.data?.data.job,
          createdAt: result.data?.data.createdAt,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setFeedbackData(null);
      } finally {
        setIsLoading(false);
      }
    }

    getFeedback();
  }, [id, user]);

  const getScoreValue = (score: number): number => {
    return (score / 10) * 100;
  };

  const scoreColor = (score: number): string => {
    if (score >= 8) return "bg-emerald-400";
    if (score >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  return {
    isLoading,
    feedbackData,
    getScoreValue,
    scoreColor,
  };
};
