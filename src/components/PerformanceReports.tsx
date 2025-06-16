
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, TrendingUp, Calendar, Target } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface PerformanceReportsProps {
  onBack: () => void;
}

const PerformanceReports = ({ onBack }: PerformanceReportsProps) => {
  // Sample data for charts
  const weeklyData = [
    { day: "Mon", tasks: 5, points: 50, studyTime: 2.5 },
    { day: "Tue", tasks: 8, points: 80, studyTime: 3.2 },
    { day: "Wed", tasks: 6, points: 60, studyTime: 2.8 },
    { day: "Thu", tasks: 10, points: 100, studyTime: 4.1 },
    { day: "Fri", tasks: 7, points: 70, studyTime: 3.5 },
    { day: "Sat", tasks: 4, points: 40, studyTime: 2.0 },
    { day: "Sun", tasks: 3, points: 30, studyTime: 1.5 }
  ];

  const subjectData = [
    { name: "Math", value: 35, color: "#8884d8" },
    { name: "Science", value: 25, color: "#82ca9d" },
    { name: "History", value: 20, color: "#ffc658" },
    { name: "English", value: 20, color: "#ff7300" }
  ];

  const monthlyProgress = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 68 },
    { month: "Apr", score: 78 },
    { month: "May", score: 85 },
    { month: "Jun", score: 82 }
  ];

  const stats = [
    {
      title: "Tasks Completed",
      value: "43",
      change: "+12%",
      icon: Target,
      color: "text-green-400"
    },
    {
      title: "Study Hours",
      value: "19.6h",
      change: "+8%",
      icon: Calendar,
      color: "text-blue-400"
    },
    {
      title: "Average Score",
      value: "82%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-400"
    },
    {
      title: "Streak Days",
      value: "7",
      change: "Current",
      icon: Calendar,
      color: "text-yellow-400"
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
            <h1 className="text-4xl font-bold text-white">Performance Reports</h1>
          </div>
          <Button className="bg-white text-black hover:bg-gray-200">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Activity */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Weekly Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tasks" 
                    stroke="#ffffff" 
                    fill="rgba(255,255,255,0.2)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Study Time Distribution */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Study Time by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Progress & Points Earned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#ffffff" 
                    strokeWidth={3}
                    dot={{ fill: '#ffffff', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Daily Points</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="points" fill="rgba(255,255,255,0.7)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Summary */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white">This Week's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">🎯 Focus Areas</h3>
                <p className="text-gray-300">Math and Science showed the most activity this week. Keep up the momentum!</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">📈 Improvements</h3>
                <p className="text-gray-300">Your consistency improved by 15% compared to last week. Great progress!</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">🎉 Achievements</h3>
                <p className="text-gray-300">Completed 7-day study streak and earned 3 new badges this week!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReports;
