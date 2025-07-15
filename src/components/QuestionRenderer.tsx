
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type Question } from '@/data/cancerScreeningQuestions';

interface QuestionRendererProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

const QuestionRenderer = ({ question, value, onChange }: QuestionRendererProps) => {
  const renderQuestion = () => {
    const questionText = question.question_text.replace(/\*\*/g, ''); // Remove markdown bold

    switch (question.field_type) {
      case 'text':
        return (
          <div className="space-y-3">
            <Label className="text-base font-medium">{questionText}</Label>
            <Input
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter your answer"
              className="w-full"
            />
          </div>
        );

      case 'toggle':
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">{questionText}</Label>
            <RadioGroup value={value || ''} onValueChange={onChange}>
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                  <Label 
                    htmlFor={`${question.id}-${option}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-3">
            <Label className="text-base font-medium">{questionText}</Label>
            <Select value={value || ''} onValueChange={onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {question.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'multicheck':
        const selectedValues = Array.isArray(value) ? value : [];
        
        return (
          <div className="space-y-4">
            <Label className="text-base font-medium">{questionText}</Label>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <Checkbox
                    id={`${question.id}-${option}`}
                    checked={selectedValues.includes(option)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...selectedValues, option]);
                      } else {
                        onChange(selectedValues.filter((item: string) => item !== option));
                      }
                    }}
                  />
                  <Label 
                    htmlFor={`${question.id}-${option}`}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white">
      {renderQuestion()}
    </div>
  );
};

export default QuestionRenderer;
