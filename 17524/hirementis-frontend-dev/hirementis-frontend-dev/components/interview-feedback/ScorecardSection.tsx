import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Scorecard } from "@/types/feedback";

interface ScorecardSectionProps {
  scorecard: Scorecard;
  getScoreValue: (score: number) => number;
  scoreColor: (score: number) => string;
}

const formatSkillName = (name: string): string => {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const ScorecardSection: React.FC<ScorecardSectionProps> = ({
  scorecard,
  getScoreValue,
  scoreColor,
}) => {
  return (
    <Card className="mb-6 overflow-hidden shadow-md border-emerald-100">
      <CardHeader className="bg-gray-50 border-b p-6">
        <CardTitle className="text-xl">Skills Scorecard</CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-5">
          {Object.entries(scorecard).map(([skill, entry], index) => {
            const score = typeof entry?.score === "number" ? entry.score : 0;
            const commentary = entry?.commentary || "No feedback provided.";

            return (
              <div key={index} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{formatSkillName(skill)}</span>
                  <span className="bg-gray-100 text-gray-800 text-sm py-0.5 px-2 rounded-lg font-medium">
                    {score}/10
                  </span>
                </div>

                <Progress
                  value={getScoreValue(score)}
                  className={`h-2 ${scoreColor(score)}`}
                />

                <p className="text-sm text-gray-600">{commentary}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScorecardSection;
