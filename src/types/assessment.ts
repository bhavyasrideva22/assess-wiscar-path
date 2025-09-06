export interface AssessmentQuestion {
  id: string;
  section: 'psychometric' | 'technical' | 'wiscar';
  type: 'likert' | 'multiple-choice' | 'scenario' | 'numerical';
  question: string;
  description?: string;
  options?: string[];
  construct?: string; // For psychometric questions
  domain?: string; // For technical questions
  correctAnswer?: number | string; // For technical questions
  scale?: number; // For likert scales (default 5)
}

export interface AssessmentResponse {
  questionId: string;
  response: number | string;
  timestamp: Date;
}

export interface PsychometricScores {
  interest: number;
  conscientiousness: number;
  growth_mindset: number;
  analytical_thinking: number;
  risk_tolerance: number;
  psych_fit_score: number;
}

export interface TechnicalScores {
  numerical_ability: number;
  logical_reasoning: number;
  domain_knowledge: number;
  tech_readiness_score: number;
}

export interface WISCARScores {
  will: number;
  interest: number;
  skill: number;
  cognitive_readiness: number;
  ability_to_learn: number;
  real_world_alignment: number;
  overall_confidence: number;
}

export interface AssessmentResults {
  user_id: string;
  assessment_type: string;
  scores: {
    psychometric: PsychometricScores;
    technical: TechnicalScores;
    wiscar: WISCARScores;
  };
  recommendation: {
    pursue: 'Yes' | 'Maybe' | 'No';
    confidence: number;
    insights: string;
    next_steps: string[];
    alternatives: string[];
  };
  career_guidance: {
    roles: Array<{
      title: string;
      description: string;
      tools: string[];
      match_score?: number;
    }>;
    learning_path: string[];
  };
}

export interface CareerRole {
  title: string;
  description: string;
  coreSkills: string[];
  tools: string[];
  averageSalary?: string;
  growthOutlook?: string;
}