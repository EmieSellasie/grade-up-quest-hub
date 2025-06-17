
-- Create a table to store OTP codes
CREATE TABLE public.user_otps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_otps ENABLE ROW LEVEL SECURITY;

-- Create policies for the OTP table
CREATE POLICY "Users can view their own OTPs" 
  ON public.user_otps 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert OTPs" 
  ON public.user_otps 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can update their own OTPs" 
  ON public.user_otps 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_user_otps_email_code ON public.user_otps(email, otp_code);
CREATE INDEX idx_user_otps_expires_at ON public.user_otps(expires_at);

-- Function to clean up expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS void
LANGUAGE sql
AS $$
  DELETE FROM public.user_otps 
  WHERE expires_at < now();
$$;
