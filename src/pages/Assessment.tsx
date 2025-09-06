import { useAssessment } from '@/contexts/AssessmentContext';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { SectionTransition } from '@/components/assessment/SectionTransition';
import { ResultsPage } from '@/components/assessment/ResultsPage';
import { assessmentQuestions } from '@/data/assessmentQuestions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Assessment() {
  const { state, dispatch } = useAssessment();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.currentSection === 'intro') {
      navigate('/');
    }
  }, [state.currentSection, navigate]);

  const getCurrentQuestion = () => {
    if (state.currentSection === 'results') return null;
    
    const sectionQuestions = assessmentQuestions.filter(q => q.section === state.currentSection);
    return sectionQuestions[state.currentQuestionIndex];
  };

  const handleSubmitResponse = (response: any) => {
    dispatch({ type: 'SUBMIT_RESPONSE', payload: response });
    
    // Check if we need to show section transition or calculate results
    const currentSectionQuestions = assessmentQuestions.filter(q => q.section === state.currentSection);
    
    if (state.currentQuestionIndex + 1 >= currentSectionQuestions.length) {
      if (state.currentSection === 'wiscar') {
        // Last section completed, calculate results
        setTimeout(() => {
          dispatch({ type: 'CALCULATE_RESULTS' });
        }, 100);
      }
    }
  };

  const handleSectionContinue = () => {
    const sections = ['psychometric', 'technical', 'wiscar'] as const;
    
    if (state.currentSection === 'psychometric' || state.currentSection === 'technical' || state.currentSection === 'wiscar') {
      const currentIndex = sections.indexOf(state.currentSection);
      
      if (currentIndex < sections.length - 1) {
        // Move to next section
        const nextSection = sections[currentIndex + 1];
        // The transition will be handled by the reducer
      } else {
        // Calculate results
        dispatch({ type: 'CALCULATE_RESULTS' });
      }
    }
  };

  const handleRestart = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
    navigate('/');
  };

  // Show results page
  if (state.currentSection === 'results' && state.results) {
    return <ResultsPage results={state.results} onRestart={handleRestart} />;
  }

  // Check if we're between sections (just completed a section)
  const currentSectionQuestions = assessmentQuestions.filter(q => q.section === state.currentSection);
  const isTransitioning = state.currentQuestionIndex >= currentSectionQuestions.length;

  if (isTransitioning && state.currentSection !== 'results' && state.currentSection !== 'intro') {
    const sections = ['psychometric', 'technical', 'wiscar'] as const;
    const currentIndex = sections.indexOf(state.currentSection as any);
    const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : 'results';

    return (
      <SectionTransition
        completedSection={state.currentSection as any}
        nextSection={nextSection}
        onContinue={handleSectionContinue}
      />
    );
  }

  const currentQuestion = getCurrentQuestion();

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBar />
        <QuestionCard 
          question={currentQuestion} 
          onSubmitResponse={handleSubmitResponse}
        />
      </div>
    </div>
  );
}