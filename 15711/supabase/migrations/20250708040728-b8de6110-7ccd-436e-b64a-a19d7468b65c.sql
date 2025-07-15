-- Create appointments table for doctor consultations and hospital bookings
CREATE TABLE public.appointments (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    doctor_id UUID REFERENCES public.cancer_doctors(id),
    hospital_id UUID REFERENCES public.cancer_hospitals(id),
    appointment_type TEXT NOT NULL CHECK (appointment_type IN ('consultation', 'hospital_visit')),
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    patient_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT,
    symptoms_description TEXT,
    preferred_language TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create insurance quotes table
CREATE TABLE public.insurance_quotes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    insurance_company_id UUID REFERENCES public.health_insurance_companies(id),
    plan_id UUID REFERENCES public.health_insurance_plans(id),
    full_name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    email TEXT NOT NULL,
    age INTEGER NOT NULL,
    occupation TEXT,
    annual_income TEXT,
    existing_conditions TEXT[],
    family_medical_history TEXT,
    preferred_coverage_amount INTEGER,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'quoted', 'converted', 'declined')),
    quote_amount INTEGER,
    quote_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create location searches table for nearest cancer center feature
CREATE TABLE public.location_searches (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    search_location TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    search_radius INTEGER DEFAULT 50, -- km
    results_found INTEGER,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.location_searches ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for appointments
CREATE POLICY "Users can view their own appointments" 
ON public.appointments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments" 
ON public.appointments 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for insurance quotes
CREATE POLICY "Users can view their own insurance quotes" 
ON public.insurance_quotes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own insurance quotes" 
ON public.insurance_quotes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own insurance quotes" 
ON public.insurance_quotes 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for location searches
CREATE POLICY "Users can view their own location searches" 
ON public.location_searches 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create location searches" 
ON public.location_searches 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON public.appointments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_insurance_quotes_updated_at
    BEFORE UPDATE ON public.insurance_quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();