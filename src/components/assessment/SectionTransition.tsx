import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { sectionInfo } from '@/data/assessmentQuestions';

interface SectionTransitionProps {
  completedSection: 'psychometric' | 'technical' | 'wiscar';
  nextSection: 'psychometric' | 'technical' | 'wiscar' | 'results';
  onContinue: () => void;
}

export function SectionTransition({ completedSection, nextSection, onContinue }: SectionTransitionProps) {
  const getSectionEmoji = (section: string) => {
    switch (section) {
      case 'psychometric':
        return '🧠';
      case 'technical':
        return '⚙️';
      case 'wiscar':
        return '🎯';
      case 'results':
        return '📊';
      default:
        return '✅';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-success" />
          </div>
          <CardTitle className="text-xl">
            {getSectionEmoji(completedSection)} {sectionInfo[completedSection].title} Complete!
          </CardTitle>
          <CardDescription>
            Great progress! You've successfully completed the {sectionInfo[completedSection].title.toLowerCase()} section.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {nextSection !== 'results' ? (
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                {getSectionEmoji(nextSection)} Up Next: {sectionInfo[nextSection].title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {sectionInfo[nextSection].description}
              </p>
              <p className="text-xs text-muted-foreground">
                Estimated time: {sectionInfo[nextSection].duration}
              </p>
            </div>
          ) : (
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <h3 className="font-semibold text-success flex items-center gap-2 mb-2">
                📊 Ready for Results!
              </h3>
              <p className="text-sm text-success/80">
                You've completed all assessment sections. Click below to see your personalized career readiness report.
              </p>
            </div>
          )}

          <Button 
            variant="hero" 
            onClick={onContinue} 
            className="w-full"
            size="lg"
          >
            {nextSection !== 'results' ? `Continue to ${sectionInfo[nextSection].title}` : 'View My Results'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}