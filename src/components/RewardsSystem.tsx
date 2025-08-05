import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Trophy, Star, Award, Crown } from "lucide-react";

interface RewardsSystemProps {
  onBack: () => void;
}

const RewardsSystem = ({ onBack }: RewardsSystemProps) => {
  const userPoints = 240;
  const nextLevelPoints = 300;
  const progress = (userPoints / nextLevelPoints) * 100;

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first task",
      icon: Star,
      unlocked: true,
      points: 10
    },
    {
      id: 2,
      title: "Task Master",
      description: "Complete 10 tasks",
      icon: Trophy,
      unlocked: true,
      points: 50
    },
    {
      id: 3,
      title: "Quiz Champion",
      description: "Score 100% on 5 quizzes",
      icon: Award,
      unlocked: false,
      points: 100
    },
    {
      id: 4,
      title: "Study Streak",
      description: "Study for 7 consecutive days",
      icon: Crown,
      unlocked: true,
      points: 75
    }
  ];

  const rewards = [
    {
      title: "30 Min Break",
      description: "Enjoy a guilt-free break",
      cost: 50,
      available: true
    },
    {
      title: "Movie Night",
      description: "Watch your favorite movie",
      cost: 100,
      available: true
    },
    {
      title: "Special Treat",
      description: "Buy something nice for yourself",
      cost: 200,
      available: true
    },
    {
      title: "Weekend Adventure",
      description: "Plan a fun weekend activity",
      cost: 400,
      available: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600 p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 pt-8">
          <Button 
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10 p-2 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Rewards</h1>
        </div>

        {/* Points Overview */}
        <Card className="bg-white rounded-2xl shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-primary">{userPoints}</p>
                <p className="text-gray-600">Total Points</p>
              </div>
              <div className="text-right">
                <p className="text-lg text-gray-900">{nextLevelPoints - userPoints} to next level</p>
                <p className="text-gray-600 text-sm">Level 3 → Level 4</p>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Achievements */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4">Achievements</h2>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id}
                className={`${
                  achievement.unlocked 
                    ? "bg-white border-primary/20" 
                    : "bg-white/80"
                } rounded-2xl shadow-sm`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${
                      achievement.unlocked ? "bg-primary/10" : "bg-gray-100"
                    }`}>
                      <achievement.icon className={`h-5 w-5 ${
                        achievement.unlocked ? "text-primary" : "text-gray-400"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{achievement.description}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${
                        achievement.unlocked ? "text-primary" : "text-gray-400"
                      }`}>
                        +{achievement.points}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Rewards */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Available Rewards</h2>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <Card 
                key={index}
                className={`bg-white rounded-2xl shadow-sm ${
                  !reward.available ? "opacity-50" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{reward.title}</h3>
                      <p className="text-gray-600 text-sm">{reward.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-lg font-bold text-primary">{reward.cost}</p>
                      <p className="text-xs text-gray-500 mb-2">points</p>
                      <Button 
                        size="sm"
                        disabled={!reward.available || userPoints < reward.cost}
                        className={
                          reward.available && userPoints >= reward.cost
                            ? "bg-primary text-white hover:bg-primary/90 rounded-lg text-xs px-3"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed rounded-lg text-xs px-3"
                        }
                      >
                        {userPoints >= reward.cost ? "Redeem" : "Not enough"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsSystem;