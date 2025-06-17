
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Volume2, Brain, TrendingUp, ArrowRight, LogIn, UserPlus } from "lucide-react";

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
    <div className="min-h-screen flex flex-col">
      {/* Header with Auth Buttons */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={onLogin}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 border border-white/20"
        >
          <LogIn className="h-4 w-4 mr-2" />
          Log In
        </Button>
        <Button
          onClick={onSignup}
          size="sm"
          className="bg-white text-black hover:bg-gray-200"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Sign Up
        </Button>
      </div>

      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Grade Up
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your study habits with AI-powered tools, gamification, and smart productivity features designed for academic success.
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-4 py-16 bg-gradient-to-t from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Everything you need to excel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-white mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Ready to grade up your study game?</h2>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={onSignup}
            size="lg"
            className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-semibold"
          >
            Create Account
          </Button>
          <Button 
            onClick={onLogin}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8 py-4 rounded-full font-semibold"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
