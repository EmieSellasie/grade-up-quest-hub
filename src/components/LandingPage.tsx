import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

const LandingPage = ({ onGetStarted, onLogin, onSignup }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="phone-app w-full max-w-sm p-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Grader
          </h1>
          <p className="text-gray-600">
            Your learning companion
          </p>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={onLogin}
            variant="outline"
            size="lg"
            className="w-full text-lg py-6"
          >
            Sign In
          </Button>
          <Button 
            onClick={onSignup}
            size="lg"
            className="w-full text-lg py-6"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;