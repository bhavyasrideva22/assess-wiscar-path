import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { AssessmentResults } from '@/types/assessment';
import { TrendingUp, Users, BookOpen, Target, RotateCcw } from 'lucide-react';

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const { recommendation, scores, career_guidance } = results;
  
  const getRecommendationColor = (pursue: string) => {
    switch (pursue) {
      case 'Yes': return 'success';
      case 'Maybe': return 'warning';
      default: return 'destructive';
    }
  };

  const getRecommendationEmoji = (pursue: string) => {
    switch (pursue) {
      case 'Yes': return '🎉';
      case 'Maybe': return '🤔';
      default: return '💭';
    }
  };

  const ScoreCard = ({ title, score, description, icon }: { title: string; score: number; description: string; icon: string }) => (
    <Card className="hover:shadow-card transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{score}%</span>
          <Badge variant={score >= 75 ? 'default' : score >= 60 ? 'secondary' : 'outline'}>
            {score >= 75 ? 'Excellent' : score >= 60 ? 'Good' : 'Needs Development'}
          </Badge>
        </div>
        <Progress value={score} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  const WISCARRadar = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎯 WISCAR Framework Analysis
        </CardTitle>
        <CardDescription>
          Comprehensive evaluation across six key dimensions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Will</span>
              <span className="font-semibold">{scores.wiscar.will}%</span>
            </div>
            <Progress value={scores.wiscar.will} className="h-2" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Interest</span>
              <span className="font-semibold">{scores.wiscar.interest}%</span>
            </div>
            <Progress value={scores.wiscar.interest} className="h-2" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Skill</span>
              <span className="font-semibold">{scores.wiscar.skill}%</span>
            </div>
            <Progress value={scores.wiscar.skill} className="h-2" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Cognitive Readiness</span>
              <span className="font-semibold">{scores.wiscar.cognitive_readiness}%</span>
            </div>
            <Progress value={scores.wiscar.cognitive_readiness} className="h-2" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Ability to Learn</span>
              <span className="font-semibold">{scores.wiscar.ability_to_learn}%</span>
            </div>
            <Progress value={scores.wiscar.ability_to_learn} className="h-2" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Real-world Alignment</span>
              <span className="font-semibold">{scores.wiscar.real_world_alignment}%</span>
            </div>
            <Progress value={scores.wiscar.real_world_alignment} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Your Assessment Results
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your responses, here's your personalized career readiness analysis for Supply Chain Risk Assessment
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className="border-2 shadow-glow">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              {getRecommendationEmoji(recommendation.pursue)}
              Recommendation: {recommendation.pursue === 'Yes' ? 'Pursue This Career' : recommendation.pursue === 'Maybe' ? 'Consider with Development' : 'Explore Alternatives'}
            </CardTitle>
            <CardDescription>
              Confidence Level: {recommendation.confidence}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <Badge variant={getRecommendationColor(recommendation.pursue) as any} className="text-sm py-1 px-3">
                {recommendation.pursue}
              </Badge>
              <Progress value={recommendation.confidence} className="flex-1 h-3" />
            </div>
            <p className="text-muted-foreground">{recommendation.insights}</p>
          </CardContent>
        </Card>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScoreCard
            title="Psychological Fit"
            score={scores.psychometric.psych_fit_score}
            description="Personality and motivational alignment"
            icon="🧠"
          />
          <ScoreCard
            title="Technical Readiness"
            score={scores.technical.tech_readiness_score}
            description="Analytical abilities and domain knowledge"
            icon="⚙️"
          />
          <ScoreCard
            title="Overall Confidence"
            score={scores.wiscar.overall_confidence}
            description="Comprehensive readiness assessment"
            icon="🎯"
          />
        </div>

        {/* WISCAR Framework */}
        <WISCARRadar />

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Psychometric Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🧠 Psychological Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Interest & Curiosity</span>
                  <span className="font-semibold">{scores.psychometric.interest}%</span>
                </div>
                <Progress value={scores.psychometric.interest} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Conscientiousness</span>
                  <span className="font-semibold">{scores.psychometric.conscientiousness}%</span>
                </div>
                <Progress value={scores.psychometric.conscientiousness} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Growth Mindset</span>
                  <span className="font-semibold">{scores.psychometric.growth_mindset}%</span>
                </div>
                <Progress value={scores.psychometric.growth_mindset} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Technical Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚙️ Technical Abilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Numerical Ability</span>
                  <span className="font-semibold">{scores.technical.numerical_ability}%</span>
                </div>
                <Progress value={scores.technical.numerical_ability} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Logical Reasoning</span>
                  <span className="font-semibold">{scores.technical.logical_reasoning}%</span>
                </div>
                <Progress value={scores.technical.logical_reasoning} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Domain Knowledge</span>
                  <span className="font-semibold">{scores.technical.domain_knowledge}%</span>
                </div>
                <Progress value={scores.technical.domain_knowledge} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Recommended Roles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {career_guidance.roles.map((role, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{role.title}</h4>
                    {role.match_score && (
                      <Badge variant="outline">{role.match_score}% match</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.tools.map((tool, toolIndex) => (
                      <Badge key={toolIndex} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps & Learning Path */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Your Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Next Steps
                </h4>
                <ul className="space-y-2">
                  {recommendation.next_steps.map((step, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Learning Path
                </h4>
                <div className="space-y-2">
                  {career_guidance.learning_path.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                      <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {recommendation.alternatives.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Alternative Career Paths</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.alternatives.map((alt, index) => (
                        <Badge key={index} variant="outline">{alt}</Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onRestart} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Take Assessment Again
          </Button>
          <Button variant="hero" onClick={() => window.print()} className="gap-2">
            📄 Save Results
          </Button>
        </div>
      </div>
    </div>
  );
}