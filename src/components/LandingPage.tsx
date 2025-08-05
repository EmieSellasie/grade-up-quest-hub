import { Button } from "@/components/ui/button";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onSignup: () => void;
}

const LandingPage = ({ onGetStarted, onLogin, onSignup }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm mx-auto">
        {/* App Icon/Logo */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-3xl flex items-center justify-center">
            <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Grader
          </h1>
        </div>

        {/* Auth Inputs */}
        <div className="space-y-4 px-8">
          <Button 
            onClick={onLogin}
            variant="outline"
            size="lg"
            className="w-full text-lg py-4 bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full"
          >
            Username
          </Button>
          <Button 
            onClick={onSignup}
            variant="outline"
            size="lg"
            className="w-full text-lg py-4 bg-white/20 border-white/30 text-white hover:bg-white/30 rounded-full"
          >
            Password
          </Button>
          <div className="text-center mt-4">
            <button className="text-white/80 text-sm underline">
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;