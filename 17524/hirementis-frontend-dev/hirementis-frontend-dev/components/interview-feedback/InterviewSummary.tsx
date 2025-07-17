import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { InterviewSummary as InterviewSummaryType } from "@/types/feedback";
import { Badge } from "@/components/ui/badge";

interface InterviewSummaryProps {
  summary: InterviewSummaryType;
  getScoreValue: (score: number) => number;
  scoreColor: (score: number) => string;
}

const InterviewSummary: React.FC<InterviewSummaryProps> = ({
  summary,
  getScoreValue,
  scoreColor,
}) => {
  return (
    <Card className="mb-6 overflow-hidden shadow-md border-emerald-100">
      <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-b p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase font-medium opacity-80">
              Overall Rating
            </p>
            <div className="flex items-center gap-3">
              <h1 className="text-5xl font-bold">{summary.overall_rating}</h1>
              <div className="text-sm opacity-80">out of 10</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-sm uppercase font-medium opacity-80">
              Interview Performance
            </p>
            <Badge className="bg-emerald-300 text-emerald-900 hover:bg-emerald-300/80">
              {summary.overall_rating >= 7
                ? "Strong Candidate"
                : summary.overall_rating >= 5
                ? "Potential Candidate"
                : "Needs Improvement"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Analysis Overview</h3>
          <p className="text-gray-700">{summary.overall_analysis}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Notable Strengths</h3>
            <ul className="space-y-2">
              {summary?.notable_strengths?.length > 0
                ? summary.notable_strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 text-green-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-sm">{strength}</span>
                    </li>
                  ))
                : "N/A"}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Areas for Improvement</h3>
            <ul className="space-y-2">
              {(Array.isArray(summary.areas_for_improvement)
                ? summary.areas_for_improvement
                : []
              ).map((area, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1 text-amber-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewSummary;
