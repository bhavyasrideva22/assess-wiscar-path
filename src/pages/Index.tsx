import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAssessment } from "@/contexts/AssessmentContext";
import heroImage from "@/assets/supply-chain-hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  const { dispatch } = useAssessment();

  const startAssessment = () => {
    dispatch({ type: 'START_ASSESSMENT' });
    navigate('/assessment');
  };

  const features = [
    {
      icon: "🧠",
      title: "Psychometric Analysis",
      description: "Evaluate personality traits and motivational alignment with supply chain risk roles"
    },
    {
      icon: "⚙️", 
      title: "Technical Assessment",
      description: "Test analytical abilities and domain knowledge in risk management"
    },
    {
      icon: "🎯",
      title: "WISCAR Framework",
      description: "Comprehensive evaluation of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
    }
  ];

  const careerRoles = [
    {
      title: "Supply Chain Risk Analyst",
      description: "Analyze and mitigate risks through data-driven approaches",
      salary: "$65,000 - $95,000",
      growth: "15% above average"
    },
    {
      title: "Vendor Risk Manager", 
      description: "Manage vendor relationships and assess supplier risks",
      salary: "$70,000 - $105,000",
      growth: "12% above average"
    },
    {
      title: "Business Continuity Planner",
      description: "Develop strategies for operational resilience",
      salary: "$68,000 - $100,000", 
      growth: "18% above average"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Supply Chain Risk Assessment" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
              Professional Career Assessment
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Should I Learn to Become a<br />
              <span className="bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                Supply Chain Risk Assessor?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Discover your fit for this growing field with our AI-powered assessment that evaluates your psychological profile, technical aptitude, and career readiness.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={startAssessment}
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:scale-105 transform transition-all duration-300 shadow-glow px-8 py-6 text-lg"
              >
                Start Assessment <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Clock className="w-4 h-4" />
                <span className="text-sm">20-30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Supply Chain Risk Assessment */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What is Supply Chain Risk Assessment?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A specialized function that identifies, analyzes, and mitigates risks in the supply chain, 
              ensuring business continuity and compliance through data analysis, risk modeling, and strategic planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Key Responsibilities</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <strong>Risk Identification:</strong> Analyze supply chain vulnerabilities and potential disruption sources
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <strong>Data Analysis:</strong> Use analytics tools to assess probability and impact of various risks
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <strong>Mitigation Planning:</strong> Develop strategies to minimize risk exposure and impact
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <div>
                    <strong>Stakeholder Communication:</strong> Report findings and recommendations to management teams
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Success Traits</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🧠</div>
                    <div className="text-sm font-medium">Analytical Mindset</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="text-sm font-medium">Attention to Detail</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">💬</div>
                    <div className="text-sm font-medium">Communication</div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm font-medium">Resilience</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Comprehensive Assessment Framework</h2>
            <p className="text-xl text-muted-foreground">
              Our scientifically-backed assessment evaluates your readiness across multiple dimensions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-accent transition-all duration-300">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Career Opportunities</h2>
            <p className="text-xl text-muted-foreground">
              Explore the growing field of supply chain risk management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {careerRoles.map((role, index) => (
              <Card key={index} className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <span>{role.title}</span>
                    <TrendingUp className="w-5 h-5 text-success" />
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Salary Range:</span>
                    <Badge variant="secondary">{role.salary}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Job Growth:</span>
                    <Badge variant="outline" className="text-success">{role.growth}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Potential?</h2>
          <p className="text-xl text-accent-foreground/90 mb-8">
            Take our comprehensive assessment and get personalized insights into your career readiness, 
            skill gaps, and learning recommendations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={startAssessment}
              className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 px-8 py-6 text-lg"
            >
              Start Your Assessment <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-6 text-accent-foreground/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">20-30 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
