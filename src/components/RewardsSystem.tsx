
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
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-4xl font-bold text-white">Rewards System</h1>
          </div>
        </div>

        {/* Points Overview */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-4xl font-bold text-white">{userPoints}</p>
                <p className="text-gray-300">Total Points</p>
              </div>
              <div className="text-right">
                <p className="text-xl text-white">{nextLevelPoints - userPoints} points to next level</p>
                <p className="text-gray-300">Level 3 → Level 4</p>
              </div>
            </div>
            <Progress value={progress} className="h-3 bg-gray-700" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`${
                    achievement.unlocked 
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30" 
                      : "bg-white/5 border-white/10"
                  } backdrop-blur-sm`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${
                        achievement.unlocked ? "bg-yellow-500/30" : "bg-gray-500/30"
                      }`}>
                        <achievement.icon className={`h-6 w-6 ${
                          achievement.unlocked ? "text-yellow-300" : "text-gray-400"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          achievement.unlocked ? "text-white" : "text-gray-400"
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          achievement.unlocked ? "text-yellow-300" : "text-gray-400"
                        }`}>
                          +{achievement.points}
                        </p>
                        <p className="text-xs text-gray-400">points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Available Rewards */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Available Rewards</h2>
            <div className="space-y-4">
              {rewards.map((reward, index) => (
                <Card 
                  key={index}
                  className={`bg-white/5 border-white/10 backdrop-blur-sm ${
                    !reward.available ? "opacity-50" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white">{reward.title}</h3>
                        <p className="text-gray-300 text-sm">{reward.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{reward.cost}</p>
                        <p className="text-xs text-gray-400 mb-2">points</p>
                        <Button 
                          size="sm"
                          disabled={!reward.available || userPoints < reward.cost}
                          className={
                            reward.available && userPoints >= reward.cost
                              ? "bg-white text-black hover:bg-gray-200"
                              : "bg-gray-600 text-gray-400 cursor-not-allowed"
                          }
                        >
                          {userPoints >= reward.cost ? "Redeem" : "Not enough points"}
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
    </div>
  );
};

export default RewardsSystem;
