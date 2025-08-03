
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award, Volume2, Brain, TrendingUp, ArrowLeft, Zap, Trophy, Target, Star, Crown, ArrowRight } from "lucide-react";

interface DashboardProps {
  onNavigate: (view: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const stats = [
    { 
      label: "Tasks Completed", 
      value: "12", 
      change: "+3 today", 
      icon: Target,
      color: "text-success",
      bgColor: "bg-success/20"
    },
    { 
      label: "Points Earned", 
      value: "240", 
      change: "+45 this week", 
      icon: Star,
      color: "text-gaming-gold",
      bgColor: "bg-gaming-gold/20"
    },
    { 
      label: "Quizzes Taken", 
      value: "8", 
      change: "+2 today", 
      icon: Brain,
      color: "text-secondary",
      bgColor: "bg-secondary/20"
    },
    { 
      label: "Study Streak", 
      value: "7", 
      change: "Days strong!", 
      icon: Crown,
      color: "text-accent",
      bgColor: "bg-accent/20"
    }
  ];

  const quickActions = [
    {
      title: "Task Manager",
      description: "Organize missions and level up",
      icon: CheckCircle,
      color: "from-primary/20 to-primary-glow/20",
      borderColor: "border-primary/30",
      iconColor: "text-primary",
      action: () => onNavigate("todos")
    },
    {
      title: "Rewards Hub",
      description: "Claim achievements and loot",
      icon: Award,
      color: "from-gaming-gold/20 to-gaming-bronze/20",
      borderColor: "border-gaming-gold/30",
      iconColor: "text-gaming-gold",
      action: () => onNavigate("rewards")
    },
    {
      title: "Voice Assistant",
      description: "AI-powered audio learning",
      icon: Volume2,
      color: "from-success/20 to-accent/20",
      borderColor: "border-success/30",
      iconColor: "text-success",
      action: () => onNavigate("tts")
    },
    {
      title: "Knowledge Engine",
      description: "Generate smart quizzes instantly",
      icon: Brain,
      color: "from-secondary/20 to-primary/20",
      borderColor: "border-secondary/30",
      iconColor: "text-secondary",
      action: () => onNavigate("quiz")
    },
    {
      title: "Progress Analytics",
      description: "Track your gaming stats",
      icon: TrendingUp,
      color: "from-destructive/20 to-warning/20",
      borderColor: "border-destructive/30",
      iconColor: "text-destructive",
      action: () => onNavigate("reports")
    }
  ];

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="gaming-card p-3">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-orbitron text-4xl md:text-5xl font-bold text-gradient">
                  COMMAND CENTER
                </h1>
                <p className="font-exo text-lg text-muted-foreground">Ready for your next mission, Commander?</p>
              </div>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate("landing")}
            className="font-exo border-primary/30 text-foreground hover:bg-primary/20 hover:border-primary transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Hub
          </Button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="stats-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="font-exo text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="font-orbitron text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className={`font-exo text-sm ${stat.color}`}>{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Hub */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="font-orbitron text-2xl font-bold text-gradient">MISSION HUB</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className={`gaming-card hover-lift cursor-pointer group bg-gradient-to-br ${action.color} ${action.borderColor}`}
                onClick={action.action}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-current opacity-20 rounded-lg blur-sm"></div>
                        <action.icon className={`h-8 w-8 ${action.iconColor} relative z-10 group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                      <CardTitle className="font-orbitron text-foreground text-lg font-bold group-hover:text-primary transition-colors duration-300">
                        {action.title}
                      </CardTitle>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-exo text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    {action.description}
                  </p>
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
