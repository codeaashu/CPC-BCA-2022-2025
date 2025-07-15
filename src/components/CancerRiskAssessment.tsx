
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { toast } from 'sonner';
import { 
  cancerScreeningQuestions, 
  getStepQuestions, 
  calculateRiskScore, 
  getRiskLevel,
  type Question 
} from '@/data/cancerScreeningQuestions';
import QuestionRenderer from './QuestionRenderer';
import RiskResults from './RiskResults';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const CancerRiskAssessment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const totalSteps = Math.max(...cancerScreeningQuestions.map(q => q.step)) + 1;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentQuestions = getStepQuestions(currentStep, answers);

  // Fetch user profile data and pre-fill answers
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('name, phone_number')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          // Pre-fill the answers for name and mobile number questions
          const preFilledAnswers: Record<string, any> = {};
          
          // Find the name question (usually has "name" in the question text)
          const nameQuestion = cancerScreeningQuestions.find(q => 
            q.question_text.toLowerCase().includes('name') && 
            q.field_type === 'text'
          );
          
          // Find the mobile number question (usually has "mobile" or "phone" in the question text)
          const mobileQuestion = cancerScreeningQuestions.find(q => 
            (q.question_text.toLowerCase().includes('mobile') || 
             q.question_text.toLowerCase().includes('phone')) && 
            q.field_type === 'text'
          );

          if (nameQuestion && data.name) {
            preFilledAnswers[nameQuestion.id] = data.name;
          }

          if (mobileQuestion && data.phone_number) {
            preFilledAnswers[mobileQuestion.id] = data.phone_number;
          }

          // Update answers with pre-filled data
          if (Object.keys(preFilledAnswers).length > 0) {
            setAnswers(prev => ({
              ...prev,
              ...preFilledAnswers
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleAnswer = (questionId: number, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const canProceed = () => {
    return currentQuestions.every(question => {
      const answer = answers[question.id];
      if (question.field_type === 'text') {
        return answer && answer.trim().length > 0;
      }
      return answer !== undefined && answer !== null;
    });
  };

  const saveAssessmentToDatabase = async (riskLevel: any, totalScore: number) => {
    if (!user) {
      console.log('No user found, skipping database save');
      return;
    }

    setSaving(true);
    try {
      // Save to cancer_assessments table
      const { error: assessmentError } = await supabase
        .from('cancer_assessments')
        .insert({
          user_id: user.id,
          risk_level: riskLevel.level,
          total_score: totalScore,
          assessment_data: answers
        });

      if (assessmentError) throw assessmentError;

      // Update user profile with latest assessment info
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          latest_risk_level: riskLevel.level,
          latest_risk_score: totalScore,
          last_assessment_date: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      console.log('Assessment saved successfully');
      toast.success('Assessment results saved to your profile');
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast.error('Failed to save assessment results');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results and save to database
      const { totalScore, hasRedFlags } = calculateRiskScore(answers);
      const riskLevel = getRiskLevel(totalScore, hasRedFlags);
      
      await saveAssessmentToDatabase(riskLevel, totalScore);
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  const handleContinueToNextSteps = () => {
    const { totalScore, hasRedFlags } = calculateRiskScore(answers);
    const riskLevel = getRiskLevel(totalScore, hasRedFlags);
    
    if (riskLevel.level === 'High') {
      navigate('/hospitals');
    } else {
      // For moderate/low risk, redirect to profile or main page
      navigate('/profile');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (isCompleted) {
    const { totalScore, hasRedFlags } = calculateRiskScore(answers);
    const riskLevel = getRiskLevel(totalScore, hasRedFlags);
    
    return <RiskResults 
      riskLevel={riskLevel} 
      totalScore={totalScore} 
      onRestart={handleRestart}
      onContinueToNextSteps={handleContinueToNextSteps}
      answers={answers}
      saving={saving}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Back to Home button */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={handleBackToHome}
            className="flex items-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancer Risk Pre-Screening</h1>
          <p className="text-gray-600">Complete this assessment to understand your cancer risk factors</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Questions Card */}
        <Card className="p-8 shadow-lg">
          <div className="space-y-6">
            {currentQuestions.map((question) => (
              <QuestionRenderer
                key={question.id}
                question={question}
                value={answers[question.id]}
                onChange={(value) => handleAnswer(question.id, value)}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              <span>{currentStep === totalSteps - 1 ? 'Complete Assessment' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Step Indicator */}
        <div className="mt-6 text-center text-sm text-gray-500">
          {currentStep === 0 && "Consent & Basic Information"}
          {currentStep === 1 && "Demographics & Medical History"}
          {currentStep === 2 && "Lifestyle & Family History"}
          {currentStep === 3 && "Environmental & Lifestyle Factors"}
          {currentStep === 4 && "Current Symptoms"}
          {currentStep === 5 && "Screening & Vaccination"}
          {currentStep === 6 && "Gender-Specific Questions"}
          {currentStep === 7 && "Final Details & Contact Information"}
        </div>
      </div>
    </div>
  );
};

export default CancerRiskAssessment;
