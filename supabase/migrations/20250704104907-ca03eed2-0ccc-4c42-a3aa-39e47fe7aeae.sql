
-- Create a table to store cancer risk assessments
CREATE TABLE public.cancer_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  risk_level TEXT NOT NULL,
  total_score INTEGER NOT NULL,
  assessment_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cancer_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for cancer_assessments table
CREATE POLICY "Users can view their own assessments" 
  ON public.cancer_assessments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments" 
  ON public.cancer_assessments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
  ON public.cancer_assessments 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Add latest assessment info to profiles table
ALTER TABLE public.profiles 
ADD COLUMN latest_risk_level TEXT,
ADD COLUMN latest_risk_score INTEGER,
ADD COLUMN last_assessment_date TIMESTAMP WITH TIME ZONE;
