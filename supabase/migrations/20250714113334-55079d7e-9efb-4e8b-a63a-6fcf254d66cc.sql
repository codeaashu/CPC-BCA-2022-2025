-- Create lab bookings table
CREATE TABLE public.lab_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lab_id UUID NOT NULL REFERENCES diagnostic_labs(id),
  patient_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  test_type TEXT NOT NULL,
  special_instructions TEXT,
  home_collection BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lab_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own lab bookings" 
ON public.lab_bookings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own lab bookings" 
ON public.lab_bookings 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own lab bookings" 
ON public.lab_bookings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add trigger for timestamps
CREATE TRIGGER update_lab_bookings_updated_at
BEFORE UPDATE ON public.lab_bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();