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
    { name: "Math", value: 35, color: "#0D9488" },
    { name: "Science", value: 25, color: "#10B981" },
    { name: "History", value: 20, color: "#059669" },
    { name: "English", value: 20, color: "#047857" }
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
      color: "text-green-600"
    },
    {
      title: "Study Hours",
      value: "19.6h",
      change: "+8%",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Average Score",
      value: "82%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Streak Days",
      value: "7",
      change: "Current",
      icon: Calendar,
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600 p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center">
            <Button 
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10 p-2 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-white">Reports</h1>
          </div>
          <Button className="bg-white text-primary hover:bg-gray-50 rounded-lg p-2">
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs mb-1">{stat.title}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Activity */}
        <Card className="bg-white rounded-2xl shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.3)" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tasks" 
                  stroke="#0D9488" 
                  fill="rgba(13,148,136,0.2)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Study Time Distribution */}
        <Card className="bg-white rounded-2xl shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg">Study Time by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#0D9488"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Progress */}
        <Card className="bg-white rounded-2xl shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg">Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.3)" />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0D9488" 
                  strokeWidth={3}
                  dot={{ fill: '#0D9488', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Points */}
        <Card className="bg-white rounded-2xl shadow-sm mb-6">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg">Daily Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(156,163,175,0.3)" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="points" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <Card className="bg-white rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900 text-lg">This Week's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-900 mb-2">🎯 Focus Areas</h3>
                <p className="text-gray-600 text-sm">Math and Science showed the most activity this week. Keep up the momentum!</p>
              </div>
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-900 mb-2">📈 Improvements</h3>
                <p className="text-gray-600 text-sm">Your consistency improved by 15% compared to last week. Great progress!</p>
              </div>
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-900 mb-2">🎉 Achievements</h3>
                <p className="text-gray-600 text-sm">Completed 7-day study streak and earned 3 new badges this week!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReports;