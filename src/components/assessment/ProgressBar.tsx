import { Progress } from '@/components/ui/progress';
import { useAssessment } from '@/contexts/AssessmentContext';
import { assessmentQuestions, sectionInfo } from '@/data/assessmentQuestions';

export function ProgressBar() {
  const { state } = useAssessment();
  
  if (state.currentSection === 'intro' || state.currentSection === 'results') {
    return null;
  }

  const currentSectionQuestions = assessmentQuestions.filter(q => q.section === state.currentSection);
  const currentProgress = (state.currentQuestionIndex / currentSectionQuestions.length) * 100;
  
  // Calculate overall progress across all sections
  const sections = ['psychometric', 'technical', 'wiscar'] as const;
  const currentSectionIndex = sections.indexOf(state.currentSection);
  const questionsPerSection = sections.map(section => 
    assessmentQuestions.filter(q => q.section === section).length
  );
  const totalQuestions = questionsPerSection.reduce((sum, count) => sum + count, 0);
  
  // Questions completed before current section
  const completedQuestions = questionsPerSection
    .slice(0, currentSectionIndex)
    .reduce((sum, count) => sum + count, 0);
  
  // Questions completed in current section
  const currentSectionCompleted = state.currentQuestionIndex;
  
  const overallProgress = ((completedQuestions + currentSectionCompleted) / totalQuestions) * 100;

  return (
    <div className="w-full space-y-4 mb-8">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground capitalize">
          {sectionInfo[state.currentSection].title}
        </span>
        <span className="text-muted-foreground">
          {state.currentQuestionIndex + 1} of {currentSectionQuestions.length}
        </span>
      </div>
      
      <div className="space-y-2">
        <Progress value={currentProgress} className="h-2" />
        <div className="text-xs text-muted-foreground text-center">
          Overall Progress: {Math.round(overallProgress)}%
        </div>
      </div>
    </div>
  );
}