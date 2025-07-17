import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FinalRecommendations as FinalRecommendationsType } from "@/types/feedback";
import { Star, Target, TrendingUp } from "lucide-react";

interface FinalRecommendationsProps {
  recommendations: FinalRecommendationsType;
}

const FinalRecommendations: React.FC<FinalRecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-700">
            <Target className="w-5 h-5 mr-2" />
            Practice Focus Areas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {(Array.isArray(recommendations.practice_focus_areas)
              ? recommendations.practice_focus_areas
              : []
            ).map((area, index) => (
              <li key={index} className="flex items-start">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm sm:text-base text-gray-700">
                  {area}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Overall Impression & Final Tip */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <Star className="w-5 h-5 mr-2" />
              Overall Impression
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              {recommendations.overall_impression}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 ">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              Pro Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-emerald-800 font-medium">
              {recommendations.final_tip}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinalRecommendations;
