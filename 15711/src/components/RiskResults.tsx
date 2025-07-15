
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, AlertCircle, Phone, MapPin, Calendar, RefreshCw } from 'lucide-react';

interface RiskLevel {
  level: string;
  color: string;
  message: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

interface RiskResultsProps {
  riskLevel: RiskLevel;
  totalScore: number;
  onRestart: () => void;
  onContinueToNextSteps: () => void;
  answers: Record<string, any>;
  saving?: boolean;
}

const RiskResults = ({ riskLevel, totalScore, onRestart, onContinueToNextSteps, answers, saving = false }: RiskResultsProps) => {
  const getIcon = () => {
    switch (riskLevel.level) {
      case 'High':
        return <AlertTriangle className="h-12 w-12 text-red-600" />;
      case 'Moderate':
        return <AlertCircle className="h-12 w-12 text-orange-600" />;
      case 'Low':
        return <CheckCircle className="h-12 w-12 text-green-600" />;
      default:
        return <CheckCircle className="h-12 w-12 text-green-600" />;
    }
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if (riskLevel.level === 'High') {
      recommendations.push("Schedule an immediate consultation with an oncologist");
      recommendations.push("Consider comprehensive cancer screening tests");
      recommendations.push("Review your family history with a genetic counselor");
    } else if (riskLevel.level === 'Moderate') {
      recommendations.push("Schedule a consultation with your primary care physician");
      recommendations.push("Discuss appropriate screening schedules for your age and risk factors");
      recommendations.push("Consider lifestyle modifications to reduce risk");
    } else {
      recommendations.push("Continue with routine age-appropriate screenings");
      recommendations.push("Maintain healthy lifestyle habits");
      recommendations.push("Stay informed about cancer prevention");
    }
    
    return recommendations;
  };

  const getContinueButtonText = () => {
    if (riskLevel.level === 'High') {
      return 'Find Treatment Centers';
    }
    return 'Continue to Next Steps';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cancer Risk Assessment Results</h1>
          <p className="text-gray-600">Based on your responses, here's your personalized risk evaluation</p>
          {saving && (
            <p className="text-sm text-blue-600 mt-2">Saving results to your profile...</p>
          )}
        </div>

        {/* Risk Level Card */}
        <Card className={`p-8 mb-6 ${riskLevel.bgColor} ${riskLevel.borderColor} border-2`}>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {getIcon()}
            </div>
            <h2 className={`text-3xl font-bold mb-2 ${riskLevel.textColor}`}>
              {riskLevel.level} Risk
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Risk Score: {totalScore} points
            </p>
            <p className={`text-lg ${riskLevel.textColor} font-medium`}>
              {riskLevel.message}
            </p>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-8 mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Recommended Next Steps</h3>
          <ul className="space-y-3">
            {getRecommendations().map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Phone className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">24/7 Helpline</h4>
            <p className="text-sm text-gray-600 mb-3">Speak with a healthcare professional</p>
            <Button variant="outline" size="sm" className="w-full">
              Call Now
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Find Centers</h4>
            <p className="text-sm text-gray-600 mb-3">Locate nearby cancer centers</p>
            <Button variant="outline" size="sm" className="w-full">
              Search
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold mb-2">Book Appointment</h4>
            <p className="text-sm text-gray-600 mb-3">Schedule a consultation</p>
            <Button variant="outline" size="sm" className="w-full">
              Book Now
            </Button>
          </Card>
        </div>

        {/* Important Notice */}
        <Card className="p-6 bg-amber-50 border-amber-200 border-2 mb-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">Important Notice</h4>
              <p className="text-amber-700 text-sm">
                This assessment is for informational purposes only and does not replace professional medical advice. 
                Please consult with qualified healthcare professionals for proper diagnosis and treatment recommendations.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onRestart}
            variant="outline"
            className="flex items-center space-x-2"
            disabled={saving}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retake Assessment</span>
          </Button>
          <Button 
            onClick={onContinueToNextSteps}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            disabled={saving}
          >
            {getContinueButtonText()}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskResults;
