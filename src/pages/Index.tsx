
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Award, Volume2, Brain, TrendingUp, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LandingPage from "@/components/LandingPage";
import AuthPage from "@/components/AuthPage";
import Dashboard from "@/components/Dashboard";
import TodoList from "@/components/TodoList";
import RewardsSystem from "@/components/RewardsSystem";
import TextToSpeech from "@/components/TextToSpeech";
import QuizGenerator from "@/components/QuizGenerator";
import PerformanceReports from "@/components/PerformanceReports";

const Index = () => {
  const [currentView, setCurrentView] = useState("landing");
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    setCurrentView("landing");
  };

  const renderView = () => {
    // If user is not logged in, show landing or auth pages
    if (!user) {
      switch (currentView) {
        case "login":
          return <AuthPage onBack={() => setCurrentView("landing")} initialMode="login" />;
        case "signup":
          return <AuthPage onBack={() => setCurrentView("landing")} initialMode="signup" />;
        default:
          return (
            <LandingPage 
              onGetStarted={() => setCurrentView("signup")}
              onLogin={() => setCurrentView("login")}
              onSignup={() => setCurrentView("signup")}
            />
          );
      }
    }

    // If user is logged in, show app views
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
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {user && (
        <div className="absolute top-4 right-4 z-50">
          <Button
            onClick={handleSignOut}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      )}
      {renderView()}
    </div>
  );
};

export default Index;
