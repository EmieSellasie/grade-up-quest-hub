
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface OTPVerificationProps {
  email: string;
  password: string;
  fullName?: string;
  onBack: () => void;
  onSuccess: () => void;
}

const OTPVerification = ({ email, password, fullName, onBack, onSuccess }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { toast } = useToast();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 4) {
      toast({
        title: "Error",
        description: "Please enter a 4-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: {
          email,
          otp,
          password,
          fullName,
        },
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Account verified successfully!",
        });
        onSuccess();
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setCountdown(60);

    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { email },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "OTP Sent",
        description: "A new OTP has been sent to your email",
      });

      // For development - show OTP in console
      if (data.otp) {
        console.log('New OTP:', data.otp);
        toast({
          title: "Development Mode",
          description: `OTP: ${data.otp}`,
        });
      }
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      toast({
        title: "Error",
        description: "Failed to resend OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="absolute left-4 top-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-bold text-white">
            Verify Your Email
          </CardTitle>
          <p className="text-gray-300">
            We've sent a 4-digit code to {email}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={4}
              className="w-full"
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot 
                  index={0} 
                  className="w-12 h-12 text-xl bg-white/10 border-white/20 text-white" 
                />
                <InputOTPSlot 
                  index={1} 
                  className="w-12 h-12 text-xl bg-white/10 border-white/20 text-white" 
                />
                <InputOTPSlot 
                  index={2} 
                  className="w-12 h-12 text-xl bg-white/10 border-white/20 text-white" 
                />
                <InputOTPSlot 
                  index={3} 
                  className="w-12 h-12 text-xl bg-white/10 border-white/20 text-white" 
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleVerifyOTP}
            className="w-full bg-white text-black hover:bg-gray-200 font-semibold"
            disabled={isLoading || otp.length !== 4}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <div className="text-center">
            <p className="text-gray-300 text-sm mb-2">
              Didn't receive the code?
            </p>
            <Button
              type="button"
              variant="link"
              onClick={handleResendOTP}
              disabled={isResending || countdown > 0}
              className="text-white hover:text-gray-300 font-semibold"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
