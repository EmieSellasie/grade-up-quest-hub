
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award, Volume2, Brain, TrendingUp, ArrowLeft } from "lucide-react";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const stats = [
    { label: "Tasks Completed", value: "12", change: "+3 today" },
    { label: "Points Earned", value: "240", change: "+45 this week" },
    { label: "Quizzes Taken", value: "8", change: "+2 today" },
    { label: "Study Streak", value: "7 days", change: "Keep it up!" }
  ];

  const quickActions = [
    {
      title: "To-Do List",
      description: "Manage your tasks and assignments",
      icon: CheckCircle,
      color: "bg-blue-500/20 border-blue-500/30",
      action: () => onNavigate("todos")
    },
    {
      title: "Rewards",
      description: "Check your achievements and points",
      icon: Award,
      color: "bg-yellow-500/20 border-yellow-500/30",
      action: () => onNavigate("rewards")
    },
    {
      title: "Text-to-Speech",
      description: "Upload files to be read aloud",
      icon: Volume2,
      color: "bg-green-500/20 border-green-500/30",
      action: () => onNavigate("tts")
    },
    {
      title: "Quiz Generator",
      description: "Create quizzes from your materials",
      icon: Brain,
      color: "bg-purple-500/20 border-purple-500/30",
      action: () => onNavigate("quiz")
    },
    {
      title: "Performance Reports",
      description: "View your weekly progress",
      icon: TrendingUp,
      color: "bg-red-500/20 border-red-500/30",
      action: () => onNavigate("reports")
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-gray-300">Ready to grade up today?</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate("landing")}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-green-400 text-sm">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className={`${action.color} backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group`}
                onClick={action.action}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <action.icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    <CardTitle className="text-white text-lg">{action.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
