
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Volume2, Brain, TrendingUp, ArrowRight, LogIn, UserPlus, Zap, Star, Target } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

const LandingPage = ({ onGetStarted, onLogin, onSignup }: LandingPageProps) => {
  const features = [
    {
      icon: CheckCircle,
      title: "Smart To-Do Lists",
      description: "Organize tasks with intelligent prioritization and progress tracking"
    },
    {
      icon: Award,
      title: "Rewards System",
      description: "Earn points and unlock achievements as you complete your goals"
    },
    {
      icon: Volume2,
      title: "Text-to-Speech",
      description: "Upload documents and have them read aloud for better learning"
    },
    {
      icon: Brain,
      title: "Smart Quizzes",
      description: "Generate quizzes from your study materials automatically"
    },
    {
      icon: TrendingUp,
      title: "Performance Reports",
      description: "Track your progress with detailed weekly performance analytics"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header with Auth Buttons */}
      <div className="absolute top-6 right-6 z-50 flex gap-3">
        <Button
          onClick={onLogin}
          variant="ghost"
          size="sm"
          className="font-exo text-foreground hover:bg-primary/20 border border-primary/30 neon-border backdrop-blur-md"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Log In
        </Button>
        <Button
          onClick={onSignup}
          size="sm"
          className="cyber-button font-exo"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Sign Up
        </Button>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            {/* Logo/Brand Mark */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="gaming-card p-6 animate-glow-pulse">
                  <Zap className="h-16 w-16 text-primary glow-effect mx-auto" />
                </div>
              </div>
            </div>
            
            <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-8 text-gradient animate-cyber-slide">
              GRADE UP
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Star className="h-6 w-6 text-gaming-gold animate-float" />
              <p className="font-exo text-xl md:text-2xl text-foreground/90 max-w-4xl mx-auto leading-relaxed font-medium">
                The ultimate gamified learning platform powered by AI. Level up your studies, unlock achievements, and dominate your academic goals.
              </p>
              <Star className="h-6 w-6 text-gaming-gold animate-float" style={{animationDelay: '1s'}} />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="cyber-button text-lg px-10 py-6 rounded-xl font-orbitron font-bold group"
              >
                <Target className="mr-3 h-6 w-6 group-hover:animate-level-up" />
                START QUEST
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="text-sm text-muted-foreground font-exo flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-success rounded-full animate-pulse"></span>
                Join 10,000+ students leveling up
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6 text-gradient">
              POWER-UP YOUR LEARNING
            </h2>
            <p className="font-exo text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock your potential with our arsenal of AI-powered features designed for academic domination
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="gaming-card hover-lift group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-300"></div>
                    <feature.icon className="h-16 w-16 text-primary mx-auto relative z-10 group-hover:text-primary-glow transition-colors duration-300" />
                  </div>
                  <h3 className="font-orbitron text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="font-exo text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="gaming-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
            <div className="relative z-10">
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold mb-6 text-gradient">
                READY TO LEVEL UP?
              </h2>
              <p className="font-exo text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students already dominating their studies with Grade Up's AI-powered gaming experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  onClick={onSignup}
                  size="lg"
                  className="cyber-button px-10 py-4 text-lg font-orbitron font-bold"
                >
                  CREATE ACCOUNT
                </Button>
                <Button 
                  onClick={onLogin}
                  variant="outline"
                  size="lg"
                  className="font-exo border-primary/50 text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300 px-10 py-4 rounded-lg font-semibold backdrop-blur-md"
                >
                  SIGN IN
                </Button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="font-exo">Free to start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-exo">AI-powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="font-exo">Instant setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
