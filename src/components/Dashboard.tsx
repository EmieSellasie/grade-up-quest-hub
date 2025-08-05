import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Volume2, Brain, TrendingUp, ArrowRight } from "lucide-react";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const features = [
    {
      title: "To-Do List",
      description: "Manage your tasks",
      icon: CheckCircle,
      action: () => onNavigate("todos")
    },
    {
      title: "Rewards",
      description: "Track your achievements",
      icon: Award,
      action: () => onNavigate("rewards")
    },
    {
      title: "Text to Speech",
      description: "Listen to your notes",
      icon: Volume2,
      action: () => onNavigate("tts")
    },
    {
      title: "Quiz Generator",
      description: "Create practice quizzes",
      icon: Brain,
      action: () => onNavigate("quiz")
    },
    {
      title: "Reports",
      description: "View your progress",
      icon: TrendingUp,
      action: () => onNavigate("reports")
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-white/80">
            Welcome to your learning hub
          </p>
        </div>

        {/* Feature Grid */}
        <div className="space-y-4 px-4">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white rounded-2xl cursor-pointer group hover:shadow-lg transition-all duration-200"
              onClick={feature.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;