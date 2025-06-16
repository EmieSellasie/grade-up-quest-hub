
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Volume2, Brain, TrendingUp, Plus } from "lucide-react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import TodoList from "@/components/TodoList";
import RewardsSystem from "@/components/RewardsSystem";
import TextToSpeech from "@/components/TextToSpeech";
import QuizGenerator from "@/components/QuizGenerator";
import PerformanceReports from "@/components/PerformanceReports";

const Index = () => {
  const [currentView, setCurrentView] = useState("landing");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={setCurrentView} />;
      case "todos":
        return <TodoList onBack={() => setCurrentView("dashboard")} />;
      case "rewards":
        return <RewardsSystem onBack={() => setCurrentView("dashboard")} />;
      case "tts":
        return <TextToSpeech onBack={() => setCurrentView("dashboard")} />;
      case "quiz":
        return <QuizGenerator onBack={() => setCurrentView("dashboard")} />;
      case "reports":
        return <PerformanceReports onBack={() => setCurrentView("dashboard")} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentView("dashboard")} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {renderView()}
    </div>
  );
};

export default Index;
