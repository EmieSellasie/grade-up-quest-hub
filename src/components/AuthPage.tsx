
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Eye, EyeOff, Shield, Zap, Lock, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthPageProps {
  onBack: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthPage = ({ onBack, initialMode = 'login' }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      console.log('User is authenticated, redirecting...');
      onBack();
    }
  }, [user, onBack]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Handle login
        const result = await signIn(email, password);
        
        if (result.error) {
          console.error('Login error:', result.error);
          toast({
            title: "Login Failed",
            description: result.error.message || "Please check your credentials and try again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been logged in successfully.",
          });
        }
      } else {
        // Handle signup
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your full name",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const result = await signUp(email, password, fullName);
        
        if (result.error) {
          console.error('Signup error:', result.error);
          toast({
            title: "Signup Failed",
            description: result.error.message || "There was an error creating your account.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Account Created!",
            description: "Welcome to Grade Up! You are now logged in.",
          });
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setFullName('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <Card className="w-full max-w-lg gaming-card relative z-10">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="absolute left-4 top-4 text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="gaming-card p-4 animate-glow-pulse">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          
          <CardTitle className="font-orbitron text-3xl font-bold text-gradient mb-2">
            {isLogin ? 'ACCESS GRANTED' : 'INITIALIZE USER'}
          </CardTitle>
          <p className="font-exo text-muted-foreground">
            {isLogin ? 'Welcome back, Commander' : 'Begin your journey to academic mastery'}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="fullName" className="flex items-center gap-2 font-exo text-sm font-medium text-foreground">
                  <User className="h-4 w-4 text-primary" />
                  Commander Name
                </label>
                <div className="relative">
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="font-exo bg-card/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary pl-10 h-12 rounded-lg"
                    placeholder="Enter your full name"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center gap-2 font-exo text-sm font-medium text-foreground">
                <Mail className="h-4 w-4 text-primary" />
                Access Code (Email)
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="font-exo bg-card/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary pl-10 h-12 rounded-lg"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center gap-2 font-exo text-sm font-medium text-foreground">
                <Lock className="h-4 w-4 text-primary" />
                Security Key (Password)
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-exo bg-card/50 border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary pl-10 pr-12 h-12 rounded-lg"
                  placeholder="Enter your password"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-primary/20"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="cyber-button w-full h-12 font-orbitron font-bold text-lg"
              disabled={isLoading}
            >
              <Zap className="mr-2 h-5 w-5" />
              {isLoading ? 'PROCESSING...' : (isLogin ? 'INITIATE LOGIN' : 'CREATE PROFILE')}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-4 text-muted-foreground font-exo">OR</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="font-exo text-sm text-muted-foreground">
                {isLogin ? "New recruit?" : "Already have access?"}
              </p>
              <Button
                type="button"
                variant="link"
                onClick={toggleMode}
                className="font-exo font-semibold text-primary hover:text-primary-glow transition-colors duration-300"
                disabled={isLoading}
              >
                {isLogin ? 'Join the ranks →' : '← Access existing profile'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
