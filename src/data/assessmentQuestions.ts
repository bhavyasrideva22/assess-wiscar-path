import { AssessmentQuestion } from '../types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Psychometric Section - Interest & Motivation
  {
    id: 'psych_001',
    section: 'psychometric',
    type: 'likert',
    construct: 'interest',
    question: 'I find myself naturally curious about how disruptions (like natural disasters or supplier failures) could impact businesses.',
    scale: 5
  },
  {
    id: 'psych_002',
    section: 'psychometric',
    type: 'likert',
    construct: 'interest',
    question: 'I enjoy analyzing patterns and identifying potential problems before they occur.',
    scale: 5
  },
  {
    id: 'psych_003',
    section: 'psychometric',
    type: 'likert',
    construct: 'conscientiousness',
    question: 'I prefer to have detailed plans and backup strategies when working on important projects.',
    scale: 5
  },
  {
    id: 'psych_004',
    section: 'psychometric',
    type: 'likert',
    construct: 'conscientiousness',
    question: 'I am meticulous in my work and rarely overlook important details.',
    scale: 5
  },
  {
    id: 'psych_005',
    section: 'psychometric',
    type: 'likert',
    construct: 'analytical_thinking',
    question: 'I prefer to base decisions on data and analysis rather than intuition.',
    scale: 5
  },
  {
    id: 'psych_006',
    section: 'psychometric',
    type: 'likert',
    construct: 'risk_tolerance',
    question: 'I am comfortable working in uncertain environments where outcomes cannot be guaranteed.',
    scale: 5
  },
  {
    id: 'psych_007',
    section: 'psychometric',
    type: 'likert',
    construct: 'growth_mindset',
    question: 'I believe that with effort and learning, I can master complex analytical skills.',
    scale: 5
  },

  // Technical Section - Logical & Numerical
  {
    id: 'tech_001',
    section: 'technical',
    type: 'multiple-choice',
    domain: 'logical_reasoning',
    question: 'A company sources from suppliers A, B, and C. If supplier A fails, production drops by 40%. If supplier B fails, production drops by 25%. If supplier C fails, production drops by 35%. What is the primary risk mitigation strategy?',
    options: [
      'Focus only on supplier A since it has the highest impact',
      'Diversify sourcing to reduce dependency on any single supplier',
      'Increase inventory levels for all suppliers',
      'Switch to supplier B as the primary source'
    ],
    correctAnswer: 1
  },
  {
    id: 'tech_002',
    section: 'technical',
    type: 'numerical',
    domain: 'numerical_ability',
    question: 'If a supplier has a 15% probability of delivery delay and each delay costs $25,000, what is the expected annual cost if there are 48 deliveries per year?',
    options: ['$150,000', '$180,000', '$200,000', '$240,000'],
    correctAnswer: 1
  },
  {
    id: 'tech_003',
    section: 'technical',
    type: 'multiple-choice',
    domain: 'domain_knowledge',
    question: 'Which framework is commonly used for enterprise risk management?',
    options: ['SCRUM', 'ISO 31000', 'ITIL', 'Six Sigma'],
    correctAnswer: 1
  },
  {
    id: 'tech_004',
    section: 'technical',
    type: 'scenario',
    domain: 'logical_reasoning',
    question: 'A pharmaceutical company discovers their key ingredient supplier is located in a region prone to earthquakes. The supplier provides 80% of this critical ingredient. What should be the immediate priority?',
    options: [
      'Negotiate better insurance terms with current supplier',
      'Identify and qualify alternative suppliers in different regions',
      'Increase safety stock of the ingredient',
      'Invest in the supplier\'s earthquake-proofing measures'
    ],
    correctAnswer: 1
  },

  // WISCAR Section
  {
    id: 'wiscar_001',
    section: 'wiscar',
    type: 'likert',
    construct: 'will',
    question: 'I am willing to persist through complex analytical work even when it becomes challenging.',
    scale: 5
  },
  {
    id: 'wiscar_002',
    section: 'wiscar',
    type: 'likert',
    construct: 'skill',
    question: 'I have experience working with data analysis tools (Excel, SQL, or similar).',
    scale: 5
  },
  {
    id: 'wiscar_003',
    section: 'wiscar',
    type: 'likert',
    construct: 'cognitive_readiness',
    question: 'I can easily switch between big-picture thinking and detailed analysis.',
    scale: 5
  },
  {
    id: 'wiscar_004',
    section: 'wiscar',
    type: 'likert',
    construct: 'ability_to_learn',
    question: 'I actively seek feedback and use it to improve my work.',
    scale: 5
  },
  {
    id: 'wiscar_005',
    section: 'wiscar',
    type: 'scenario',
    construct: 'real_world_alignment',
    question: 'You discover a potential risk in your supply chain that could impact delivery by 2 weeks. Your preferred first action would be:',
    options: [
      'Immediately escalate to senior management',
      'Gather more data and develop mitigation options before reporting',
      'Contact the supplier directly to discuss solutions',
      'Begin developing alternative sourcing options'
    ],
    correctAnswer: 1
  },
  {
    id: 'wiscar_006',
    section: 'wiscar',
    type: 'likert',
    construct: 'real_world_alignment',
    question: 'I would enjoy working with cross-functional teams (procurement, operations, finance) to solve complex problems.',
    scale: 5
  }
];

export const sectionInfo = {
  psychometric: {
    title: 'Psychological Fit Assessment',
    description: 'Evaluate your personality traits and motivational alignment with supply chain risk assessment roles.',
    duration: '8-10 minutes'
  },
  technical: {
    title: 'Technical Aptitude & Knowledge',
    description: 'Test your analytical abilities and understanding of risk management concepts.',
    duration: '10-12 minutes'
  },
  wiscar: {
    title: 'WISCAR Framework Evaluation',
    description: 'Comprehensive assessment of your Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.',
    duration: '8-10 minutes'
  }
};