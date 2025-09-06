import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AssessmentQuestion, AssessmentResponse } from '@/types/assessment';
import { useAssessment } from '@/contexts/AssessmentContext';

interface QuestionCardProps {
  question: AssessmentQuestion;
  onSubmitResponse: (response: AssessmentResponse) => void;
}

export function QuestionCard({ question, onSubmitResponse }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const { state } = useAssessment();

  const handleSubmit = () => {
    if (selectedAnswer === '') return;
    
    onSubmitResponse({
      questionId: question.id,
      response: selectedAnswer,
      timestamp: new Date(),
    });
    setSelectedAnswer('');
  };

  const renderLikertScale = () => {
    const scale = question.scale || 5;
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    
    return (
      <div className="space-y-4">
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {Array.from({ length: scale }, (_, i) => {
            const value = (i + 1).toString();
            return (
              <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={value} id={value} />
                <Label htmlFor={value} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span>{i + 1}</span>
                    <span className="text-sm text-muted-foreground">{labels[i]}</span>
                  </div>
                </Label>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-3">
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} className="mt-1" />
              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer leading-relaxed">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'likert':
        return renderLikertScale();
      case 'multiple-choice':
      case 'scenario':
      case 'numerical':
        return renderMultipleChoice();
      default:
        return renderMultipleChoice();
    }
  };

  const getQuestionTypeIcon = () => {
    switch (question.type) {
      case 'likert':
        return '📊';
      case 'numerical':
        return '🧮';
      case 'scenario':
        return '💼';
      default:
        return '❓';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getQuestionTypeIcon()}</span>
          <CardTitle className="text-lg leading-relaxed">{question.question}</CardTitle>
        </div>
        {question.description && (
          <p className="text-muted-foreground text-sm">{question.description}</p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderQuestionContent()}
        
        <div className="flex justify-end">
          <Button 
            variant="assessment" 
            onClick={handleSubmit}
            disabled={selectedAnswer === ''}
            size="lg"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}