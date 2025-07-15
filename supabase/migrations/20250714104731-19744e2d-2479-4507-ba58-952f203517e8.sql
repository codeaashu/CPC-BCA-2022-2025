-- Create doctor profiles table for doctor authentication
CREATE TABLE public.doctor_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone_number TEXT,
  specialization TEXT,
  experience_years INTEGER,
  qualification TEXT,
  medical_registration_number TEXT,
  consultation_fee INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.doctor_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for doctor profiles
CREATE POLICY "Doctors can view their own profile" 
ON public.doctor_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Doctors can update their own profile" 
ON public.doctor_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Doctors can insert their own profile" 
ON public.doctor_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Add doctor_profile_id to appointments table to link with authenticated doctors
ALTER TABLE public.appointments 
ADD COLUMN doctor_profile_id UUID REFERENCES public.doctor_profiles(id);

-- Create policy for doctors to view their appointments
CREATE POLICY "Doctors can view their own appointments" 
ON public.appointments 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM doctor_profiles WHERE id = doctor_profile_id));

-- Create policy for doctors to update their appointments
CREATE POLICY "Doctors can update their own appointments" 
ON public.appointments 
FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM doctor_profiles WHERE id = doctor_profile_id));

-- Add trigger for automatic timestamp updates on doctor_profiles
CREATE TRIGGER update_doctor_profiles_updated_at
BEFORE UPDATE ON public.doctor_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new doctor user creation
CREATE OR REPLACE FUNCTION public.handle_new_doctor_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only create doctor profile if user_type is 'doctor'
  IF NEW.raw_user_meta_data ->> 'user_type' = 'doctor' THEN
    INSERT INTO public.doctor_profiles (user_id, name, phone_number)
    VALUES (
      NEW.id, 
      COALESCE(NEW.raw_user_meta_data ->> 'name', ''),
      COALESCE(NEW.raw_user_meta_data ->> 'phone_number', '')
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for doctor user creation
CREATE TRIGGER on_auth_doctor_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_doctor_user();