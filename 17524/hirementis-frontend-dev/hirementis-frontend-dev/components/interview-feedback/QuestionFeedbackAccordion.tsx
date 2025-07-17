import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuestionFeedback } from "@/types/feedback";
import Markdown from "react-markdown";
import { AlertCircle, Lightbulb, MessageSquare, Target } from "lucide-react";

interface QuestionFeedbackAccordionProps {
  questions: QuestionFeedback[];
  scoreColor: (score: number) => string;
}

const QuestionFeedbackAccordion: React.FC<QuestionFeedbackAccordionProps> = ({
  questions,
  scoreColor,
}) => {
  return (
    <Card className="mb-6 overflow-hidden shadow-md border-emerald-100 tracking-wider">
      <CardHeader className="bg-gray-50 border-b p-6">
        <CardTitle className="text-xl">Question Analysis</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <Accordion type="single" collapsible className="space-y-4">
          {questions.map((question, index) => {
            const {
              question_id,
              question: questionText,
              candidate_answer = "",
              actual_answer = "No ideal answer available.",
              expected_ideal_points = [],
              evaluation = {
                score: 0,
                coverage: "Not evaluated.",
                missed_points: [],
                depth: "No depth assessment.",
              },
              recommendation = "No recommendation provided.",
            } = question;

            return (
              <AccordionItem
                key={index}
                value={`question-${question_id}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors hover:no-underline">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MessageSquare className="w-5 h-5 text-emerald-600" />
                        <span className="font-extrabold text-gray-900">
                          Question {question_id}
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold mb-3">
                        {questionText || "No question text available."}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs text-white font-semibold ${scoreColor(
                        evaluation.score
                      )}`}
                    >
                      {evaluation.score} / 10
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 py-3 bg-white">
                  <div className="space-y-6">
                    {/* Your Answer */}
                    <div className="space-y-2">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Your Answer:
                        </h4>
                        <p className="text-gray-700 italic">
                          {candidate_answer
                            ? `"${candidate_answer}"`
                            : `"I didn't answer this question."`}
                        </p>
                      </div>

                      {/* Ideal Answer */}
                      <div className="bg-emerald-50 rounded-lg p-4">
                        <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2" />
                          Ideal Answer Approach:
                        </h4>
                        <p className="text-emerald-800 mb-3">
                          {actual_answer}
                        </p>

                        <h5 className="font-semibold text-emerald-900 mb-2">
                          Key Points to Cover:
                        </h5>
                        {expected_ideal_points.length > 0 ? (
                          <ul className="space-y-1">
                            {expected_ideal_points.map((point, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-sm text-emerald-800">{point}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-500">No ideal points listed.</p>
                        )}
                      </div>
                    </div>

                    {/* Evaluation & Missed Points */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Coverage & Depth:
                        </h4>
                        <div className="text-sm text-gray-700 mb-2">
                          <Markdown>{evaluation.coverage}</Markdown>
                        </div>
                        <div className="text-sm text-gray-600">
                          <Markdown>{evaluation.depth}</Markdown>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-2 text-amber-500" />
                          Missed Points:
                        </h4>
                        {evaluation.missed_points.length > 0 ? (
                          <ul className="space-y-1">
                            {evaluation.missed_points.map((point, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-green-600">
                            No major points missed!
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Recommendation:
                      </h4>
                      <p className="text-blue-800 text-sm">{recommendation}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default QuestionFeedbackAccordion;
