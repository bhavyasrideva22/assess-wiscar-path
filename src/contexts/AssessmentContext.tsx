import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AssessmentResponse, AssessmentResults } from '../types/assessment';
import { assessmentQuestions } from '../data/assessmentQuestions';

interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: AssessmentResponse[];
  results?: AssessmentResults;
  isComplete: boolean;
}

type AssessmentAction = 
  | { type: 'START_ASSESSMENT' }
  | { type: 'NEXT_SECTION' }
  | { type: 'SUBMIT_RESPONSE'; payload: AssessmentResponse }
  | { type: 'CALCULATE_RESULTS' }
  | { type: 'RESET_ASSESSMENT' };

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  responses: [],
  isComplete: false,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        ...state,
        currentSection: 'psychometric',
        currentQuestionIndex: 0,
      };
    
    case 'SUBMIT_RESPONSE':
      const newResponses = [...state.responses, action.payload];
      const currentSectionQuestions = assessmentQuestions.filter(q => q.section === state.currentSection);
      const nextQuestionIndex = state.currentQuestionIndex + 1;
      
      // Check if we've completed the current section
      if (nextQuestionIndex >= currentSectionQuestions.length) {
        const nextSection = getNextSection(state.currentSection);
        return {
          ...state,
          responses: newResponses,
          currentSection: nextSection,
          currentQuestionIndex: 0,
        };
      }
      
      return {
        ...state,
        responses: newResponses,
        currentQuestionIndex: nextQuestionIndex,
      };
    
    case 'CALCULATE_RESULTS':
      const results = calculateAssessmentResults(state.responses);
      return {
        ...state,
        results,
        currentSection: 'results',
        isComplete: true,
      };
    
    case 'RESET_ASSESSMENT':
      return initialState;
    
    default:
      return state;
  }
}

function getNextSection(currentSection: AssessmentState['currentSection']) {
  const sectionOrder: AssessmentState['currentSection'][] = ['psychometric', 'technical', 'wiscar', 'results'];
  const currentIndex = sectionOrder.indexOf(currentSection);
  return currentIndex < sectionOrder.length - 1 ? sectionOrder[currentIndex + 1] : 'results';
}

function calculateAssessmentResults(responses: AssessmentResponse[]): AssessmentResults {
  // Calculate psychometric scores
  const psychometric = calculatePsychometricScores(responses);
  const technical = calculateTechnicalScores(responses);
  const wiscar = calculateWISCARScores(responses);
  
  // Calculate overall recommendation
  const overallScore = (psychometric.psych_fit_score + technical.tech_readiness_score + wiscar.overall_confidence) / 3;
  
  let pursue: 'Yes' | 'Maybe' | 'No' = 'No';
  let insights = '';
  
  if (overallScore >= 75) {
    pursue = 'Yes';
    insights = 'Strong alignment across all dimensions suggests excellent potential for success in Supply Chain Risk Assessment.';
  } else if (overallScore >= 60) {
    pursue = 'Maybe';
    insights = 'Good foundation with some areas for development. Consider strengthening weaker dimensions before fully committing.';
  } else {
    insights = 'Current profile suggests exploring alternative career paths or significant skill development before pursuing this field.';
  }

  return {
    user_id: `user_${Date.now()}`,
    assessment_type: 'Supply Chain Risk Assessor',
    scores: {
      psychometric,
      technical,
      wiscar,
    },
    recommendation: {
      pursue,
      confidence: Math.round(overallScore),
      insights,
      next_steps: getNextSteps(pursue, psychometric, technical, wiscar),
      alternatives: getAlternatives(psychometric, technical, wiscar),
    },
    career_guidance: {
      roles: getRecommendedRoles(psychometric, technical, wiscar),
      learning_path: getLearningPath(pursue, technical.tech_readiness_score),
    },
  };
}

function calculatePsychometricScores(responses: AssessmentResponse[]) {
  const psychResponses = responses.filter(r => 
    assessmentQuestions.find(q => q.id === r.questionId)?.section === 'psychometric'
  );

  const getAvgByConstruct = (construct: string) => {
    const constructResponses = psychResponses.filter(r => {
      const question = assessmentQuestions.find(q => q.id === r.questionId);
      return question?.construct === construct;
    });
    const sum = constructResponses.reduce((acc, r) => acc + Number(r.response), 0);
    return constructResponses.length > 0 ? (sum / constructResponses.length) * 20 : 50;
  };

  const interest = getAvgByConstruct('interest');
  const conscientiousness = getAvgByConstruct('conscientiousness');
  const growth_mindset = getAvgByConstruct('growth_mindset');
  const analytical_thinking = getAvgByConstruct('analytical_thinking');
  const risk_tolerance = getAvgByConstruct('risk_tolerance');

  return {
    interest: Math.round(interest),
    conscientiousness: Math.round(conscientiousness),
    growth_mindset: Math.round(growth_mindset),
    analytical_thinking: Math.round(analytical_thinking),
    risk_tolerance: Math.round(risk_tolerance),
    psych_fit_score: Math.round((interest + conscientiousness + growth_mindset + analytical_thinking + risk_tolerance) / 5),
  };
}

function calculateTechnicalScores(responses: AssessmentResponse[]) {
  const techResponses = responses.filter(r => 
    assessmentQuestions.find(q => q.id === r.questionId)?.section === 'technical'
  );

  const correctAnswers = techResponses.filter(r => {
    const question = assessmentQuestions.find(q => q.id === r.questionId);
    return question?.correctAnswer !== undefined && Number(r.response) === question.correctAnswer;
  });

  const accuracy = techResponses.length > 0 ? (correctAnswers.length / techResponses.length) * 100 : 0;

  // Simulate different domain scores based on question types
  const numerical_ability = Math.min(100, accuracy + Math.random() * 20 - 10);
  const logical_reasoning = Math.min(100, accuracy + Math.random() * 20 - 10);
  const domain_knowledge = Math.min(100, accuracy + Math.random() * 20 - 10);

  return {
    numerical_ability: Math.round(numerical_ability),
    logical_reasoning: Math.round(logical_reasoning),
    domain_knowledge: Math.round(domain_knowledge),
    tech_readiness_score: Math.round(accuracy),
  };
}

function calculateWISCARScores(responses: AssessmentResponse[]) {
  const wiscarResponses = responses.filter(r => 
    assessmentQuestions.find(q => q.id === r.questionId)?.section === 'wiscar'
  );

  const getAvgByConstruct = (construct: string) => {
    const constructResponses = wiscarResponses.filter(r => {
      const question = assessmentQuestions.find(q => q.id === r.questionId);
      return question?.construct === construct;
    });
    const sum = constructResponses.reduce((acc, r) => acc + Number(r.response), 0);
    return constructResponses.length > 0 ? (sum / constructResponses.length) * 20 : 50;
  };

  const will = getAvgByConstruct('will');
  const interest = getAvgByConstruct('interest');
  const skill = getAvgByConstruct('skill');
  const cognitive_readiness = getAvgByConstruct('cognitive_readiness');
  const ability_to_learn = getAvgByConstruct('ability_to_learn');
  const real_world_alignment = getAvgByConstruct('real_world_alignment');

  return {
    will: Math.round(will),
    interest: Math.round(interest),
    skill: Math.round(skill),
    cognitive_readiness: Math.round(cognitive_readiness),
    ability_to_learn: Math.round(ability_to_learn),
    real_world_alignment: Math.round(real_world_alignment),
    overall_confidence: Math.round((will + interest + skill + cognitive_readiness + ability_to_learn + real_world_alignment) / 6),
  };
}

function getNextSteps(pursue: 'Yes' | 'Maybe' | 'No', psych: any, tech: any, wiscar: any): string[] {
  const steps = [];
  
  if (pursue === 'Yes') {
    steps.push('Explore Supply Chain Risk Management certification programs');
    steps.push('Gain hands-on experience with risk assessment tools');
    if (tech.domain_knowledge < 70) steps.push('Strengthen domain knowledge with industry courses');
  } else if (pursue === 'Maybe') {
    if (psych.psych_fit_score < 70) steps.push('Reflect on career motivations and interests');
    if (tech.tech_readiness_score < 60) steps.push('Develop analytical and technical skills');
    if (wiscar.skill < 60) steps.push('Build experience with data analysis tools');
  } else {
    steps.push('Consider exploring related fields that match your strengths');
    steps.push('Develop foundational skills before reconsidering this path');
  }
  
  return steps;
}

function getAlternatives(psych: any, tech: any, wiscar: any): string[] {
  const alternatives = [];
  
  if (psych.analytical_thinking > 70) alternatives.push('Business Analyst');
  if (tech.numerical_ability > 60) alternatives.push('Data Analyst');
  if (psych.conscientiousness > 75) alternatives.push('Quality Control Specialist');
  if (wiscar.real_world_alignment > 65) alternatives.push('Operations Coordinator');
  
  return alternatives.length > 0 ? alternatives : ['Supply Chain Coordinator', 'Logistics Specialist'];
}

function getRecommendedRoles(psych: any, tech: any, wiscar: any) {
  return [
    {
      title: 'Supply Chain Risk Analyst',
      description: 'Analyze and mitigate supply chain risks through data-driven approaches',
      tools: ['Excel', 'Power BI', 'Risk Assessment Software'],
      match_score: Math.round((psych.psych_fit_score + tech.tech_readiness_score + wiscar.overall_confidence) / 3)
    },
    {
      title: 'Vendor Risk Manager',
      description: 'Manage vendor relationships and assess supplier risks',
      tools: ['Vendor Management Systems', 'Compliance Tools', 'Audit Software'],
      match_score: Math.round((psych.conscientiousness + wiscar.real_world_alignment + tech.domain_knowledge) / 3)
    },
    {
      title: 'Business Continuity Planner',
      description: 'Develop strategies to ensure business operations during disruptions',
      tools: ['Scenario Planning Tools', 'Business Continuity Software', 'Risk Registers'],
      match_score: Math.round((psych.analytical_thinking + wiscar.cognitive_readiness + tech.logical_reasoning) / 3)
    }
  ];
}

function getLearningPath(pursue: 'Yes' | 'Maybe' | 'No', techScore: number): string[] {
  const path = [];
  
  if (pursue !== 'No') {
    path.push('Supply Chain Fundamentals');
    if (techScore < 70) path.push('Business Analytics & Data Visualization');
    path.push('Risk Management Principles');
    path.push('Advanced Supply Chain Risk Assessment');
    if (pursue === 'Yes') path.push('Professional Certification (e.g., CSCP, CPSM)');
  } else {
    path.push('Career Exploration Assessment');
    path.push('Foundational Business Skills');
    path.push('Alternative Career Path Exploration');
  }
  
  return path;
}

const AssessmentContext = createContext<{
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
} | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  return (
    <AssessmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}