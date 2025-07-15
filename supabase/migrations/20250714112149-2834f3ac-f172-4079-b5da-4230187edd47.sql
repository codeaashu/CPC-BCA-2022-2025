-- First, let's check and fix the doctor profile trigger
-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_doctor_user_created ON auth.users;

-- Update the function to handle doctor profile creation more robustly
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
      COALESCE(NEW.raw_user_meta_data ->> 'name', 'Doctor'),
      COALESCE(NEW.raw_user_meta_data ->> 'phone_number', '')
    )
    ON CONFLICT (user_id) DO UPDATE SET
      name = COALESCE(NEW.raw_user_meta_data ->> 'name', doctor_profiles.name),
      phone_number = COALESCE(NEW.raw_user_meta_data ->> 'phone_number', doctor_profiles.phone_number),
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

-- Create the trigger for doctor users
CREATE TRIGGER on_auth_doctor_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_doctor_user();

-- Also update the regular user profile function to NOT create profiles for doctors
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only create regular profile if user_type is NOT 'doctor'
  IF COALESCE(NEW.raw_user_meta_data ->> 'user_type', '') != 'doctor' THEN
    INSERT INTO public.profiles (id, name, phone_number)
    VALUES (
      NEW.id, 
      COALESCE(NEW.raw_user_meta_data ->> 'name', ''),
      COALESCE(NEW.raw_user_meta_data ->> 'phone_number', '')
    )
    ON CONFLICT (id) DO UPDATE SET
      name = COALESCE(NEW.raw_user_meta_data ->> 'name', profiles.name),
      phone_number = COALESCE(NEW.raw_user_meta_data ->> 'phone_number', profiles.phone_number),
      updated_at = now();
  END IF;
  RETURN NEW;
END;
$$;

-- Add unique constraint to prevent duplicate doctor profiles
ALTER TABLE public.doctor_profiles 
ADD CONSTRAINT unique_doctor_user_id UNIQUE (user_id);