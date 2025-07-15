
-- Create enum types for cancer-specific data
CREATE TYPE public.cancer_specialization AS ENUM (
  'Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Pediatric Oncology',
  'Gynecologic Oncology', 'Hematology-Oncology', 'Neuro-Oncology', 'Thoracic Oncology',
  'Gastrointestinal Oncology', 'Breast Oncology', 'Urologic Oncology', 'Head and Neck Oncology'
);

CREATE TYPE public.cancer_hospital_type AS ENUM (
  'Comprehensive Cancer Center', 'Specialty Cancer Hospital', 'Multi-specialty with Cancer Wing',
  'Government Cancer Institute', 'Research Cancer Hospital'
);

CREATE TYPE public.diagnostic_test_type AS ENUM (
  'Pathology', 'Radiology', 'Nuclear Medicine', 'Molecular Diagnostics',
  'Genetic Testing', 'Immunohistochemistry', 'Flow Cytometry', 'Cytogenetics'
);

-- Create Cancer Hospitals table
CREATE TABLE public.cancer_hospitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  hospital_type cancer_hospital_type NOT NULL,
  bed_capacity INTEGER,
  cancer_specialties cancer_specialization[],
  treatment_facilities TEXT[], -- Chemotherapy, Radiation, Surgery, etc.
  accreditation TEXT[], -- NABH, NCI designation, etc.
  research_programs TEXT[],
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  emergency_oncology BOOLEAN DEFAULT FALSE,
  palliative_care BOOLEAN DEFAULT FALSE,
  clinical_trials BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Cancer Doctors table
CREATE TABLE public.cancer_doctors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization cancer_specialization NOT NULL,
  sub_specialization TEXT, -- Specific cancer types like Breast Cancer, Lung Cancer, etc.
  qualification TEXT NOT NULL,
  experience_years INTEGER NOT NULL CHECK (experience_years >= 0),
  hospital_id UUID REFERENCES public.cancer_hospitals(id),
  phone TEXT,
  email TEXT,
  consultation_fee INTEGER, -- Fee in INR
  availability_days TEXT[],
  consultation_hours TEXT,
  languages TEXT[],
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  medical_registration_number TEXT UNIQUE,
  fellowship_training TEXT[], -- International fellowships
  publications_count INTEGER DEFAULT 0,
  research_interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Diagnostic Labs table
CREATE TABLE public.diagnostic_labs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT,
  lab_type TEXT NOT NULL, -- Pathology Lab, Imaging Center, etc.
  test_categories diagnostic_test_type[],
  accreditation TEXT[], -- NABL, CAP, ISO, etc.
  specialized_tests TEXT[], -- Specific cancer diagnostic tests
  home_collection BOOLEAN DEFAULT FALSE,
  online_reports BOOLEAN DEFAULT FALSE,
  emergency_services BOOLEAN DEFAULT FALSE,
  turnaround_time TEXT, -- Average report delivery time
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  license_number TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Health Insurance Companies table (focused on health insurance)
CREATE TABLE public.health_insurance_companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  headquarters TEXT NOT NULL,
  established_year INTEGER,
  website TEXT,
  customer_care_number TEXT,
  email TEXT,
  coverage_areas TEXT[], -- States/regions covered
  claim_settlement_ratio DECIMAL(5,2), -- Percentage
  cancer_coverage BOOLEAN DEFAULT TRUE,
  cashless_network_size INTEGER, -- Number of network hospitals
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  irdai_registration_number TEXT UNIQUE,
  speciality_coverage TEXT[], -- Cancer, Cardiac, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Health Insurance Plans table
CREATE TABLE public.health_insurance_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  insurance_company_id UUID REFERENCES public.health_insurance_companies(id) NOT NULL,
  plan_name TEXT NOT NULL,
  coverage_amount INTEGER NOT NULL, -- Coverage in INR
  premium_amount INTEGER NOT NULL, -- Annual premium in INR
  policy_type TEXT NOT NULL, -- Individual, Family, Senior Citizen, etc.
  cancer_coverage_amount INTEGER, -- Specific cancer coverage
  cancer_specific_benefits TEXT[],
  key_features TEXT[],
  exclusions TEXT[],
  waiting_period_cancer TEXT,
  waiting_period_general TEXT,
  cashless_hospitals UUID[], -- Array of hospital IDs
  age_limit TEXT,
  co_payment_percentage INTEGER, -- Co-payment required
  room_rent_limit INTEGER, -- Per day room rent limit
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Lab Tests table (specific cancer diagnostic tests)
CREATE TABLE public.lab_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lab_id UUID REFERENCES public.diagnostic_labs(id) NOT NULL,
  test_name TEXT NOT NULL,
  test_category diagnostic_test_type NOT NULL,
  cancer_type TEXT[], -- Which cancers this test helps diagnose
  cost INTEGER NOT NULL, -- Cost in INR
  sample_type TEXT, -- Blood, Tissue, Urine, etc.
  fasting_required BOOLEAN DEFAULT FALSE,
  turnaround_time TEXT,
  test_description TEXT,
  preparation_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_cancer_hospitals_city ON public.cancer_hospitals(city);
CREATE INDEX idx_cancer_hospitals_state ON public.cancer_hospitals(state);
CREATE INDEX idx_cancer_hospitals_type ON public.cancer_hospitals(hospital_type);
CREATE INDEX idx_cancer_doctors_specialization ON public.cancer_doctors(specialization);
CREATE INDEX idx_cancer_doctors_hospital ON public.cancer_doctors(hospital_id);
CREATE INDEX idx_diagnostic_labs_city ON public.diagnostic_labs(city);
CREATE INDEX idx_diagnostic_labs_test_categories ON public.diagnostic_labs USING GIN(test_categories);
CREATE INDEX idx_health_insurance_companies_coverage ON public.health_insurance_companies USING GIN(coverage_areas);
CREATE INDEX idx_health_insurance_plans_company ON public.health_insurance_plans(insurance_company_id);
CREATE INDEX idx_lab_tests_lab ON public.lab_tests(lab_id);
CREATE INDEX idx_lab_tests_category ON public.lab_tests(test_category);

-- Enable RLS on all tables
ALTER TABLE public.cancer_hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cancer_doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_insurance_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_insurance_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (directory data)
CREATE POLICY "Allow public read access to cancer hospitals" ON public.cancer_hospitals FOR SELECT USING (true);
CREATE POLICY "Allow public read access to cancer doctors" ON public.cancer_doctors FOR SELECT USING (true);
CREATE POLICY "Allow public read access to diagnostic labs" ON public.diagnostic_labs FOR SELECT USING (true);
CREATE POLICY "Allow public read access to health insurance companies" ON public.health_insurance_companies FOR SELECT USING (true);
CREATE POLICY "Allow public read access to health insurance plans" ON public.health_insurance_plans FOR SELECT USING (true);
CREATE POLICY "Allow public read access to lab tests" ON public.lab_tests FOR SELECT USING (true);

-- Insert sample Indian cancer hospitals
INSERT INTO public.cancer_hospitals (name, address, city, state, pincode, phone, hospital_type, bed_capacity, cancer_specialties, treatment_facilities, accreditation, research_programs, rating, emergency_oncology, palliative_care, clinical_trials) VALUES
('Tata Memorial Hospital', 'Dr. E Borges Road, Parel, Mumbai', 'Mumbai', 'Maharashtra', '400012', '+91-22-24177000', 'Comprehensive Cancer Center', 629, ARRAY['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Pediatric Oncology']::cancer_specialization[], ARRAY['Chemotherapy Unit', 'Linear Accelerator', 'Brachytherapy', 'Bone Marrow Transplant'], ARRAY['NABH', 'NAAC A++'], ARRAY['TMC-Advanced Centre for Treatment Research and Education in Cancer'], 4.8, true, true, true),

('All India Institute of Medical Sciences (AIIMS)', 'Ansari Nagar, New Delhi', 'New Delhi', 'Delhi', '110029', '+91-11-26588500', 'Government Cancer Institute', 2478, ARRAY['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Neuro-Oncology']::cancer_specialization[], ARRAY['Chemotherapy Unit', 'Radiation Therapy', 'Nuclear Medicine'], ARRAY['NABH'], ARRAY['Cancer Research Program'], 4.9, true, true, true),

('Apollo Cancer Centre', 'Greams Lane, Off Greams Road, Chennai', 'Chennai', 'Tamil Nadu', '600006', '+91-44-28293333', 'Comprehensive Cancer Center', 400, ARRAY['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Gynecologic Oncology']::cancer_specialization[], ARRAY['CyberKnife', 'PET-CT', 'Chemotherapy', 'Immunotherapy'], ARRAY['NABH', 'JCI'], ARRAY['Proton Therapy Research'], 4.6, true, true, true),

('Kidwai Memorial Institute of Oncology', 'Dr. M H Marigowda Road, Bangalore', 'Bangalore', 'Karnataka', '560029', '+91-80-26631094', 'Government Cancer Institute', 700, ARRAY['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Hematology-Oncology']::cancer_specialization[], ARRAY['Cobalt Therapy', 'Chemotherapy', 'Nuclear Medicine'], ARRAY['NABH'], ARRAY['Cancer Epidemiology Research'], 4.4, true, true, true),

('Rajiv Gandhi Cancer Institute', 'Sector 5, Rohini, New Delhi', 'New Delhi', 'Delhi', '110085', '+91-11-47022222', 'Specialty Cancer Hospital', 300, ARRAY['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Breast Oncology']::cancer_specialization[], ARRAY['CyberKnife', 'Tomotherapy', 'Robotic Surgery'], ARRAY['NABH', 'NAAC'], ARRAY['Breast Cancer Research Program'], 4.5, true, true, true);

-- Insert sample Indian cancer doctors
INSERT INTO public.cancer_doctors (name, specialization, sub_specialization, qualification, experience_years, hospital_id, phone, consultation_fee, availability_days, consultation_hours, languages, rating, medical_registration_number, fellowship_training, publications_count, research_interests) VALUES
('Dr. Rajesh Mistry', 'Surgical Oncology', 'Head and Neck Cancer', 'MBBS, MS, MCh Surgical Oncology', 28, (SELECT id FROM public.cancer_hospitals WHERE name LIKE '%Tata Memorial%'), '+91-22-24177001', 1500, ARRAY['Monday', 'Tuesday', 'Wednesday', 'Thursday'], '9:00 AM - 5:00 PM', ARRAY['English', 'Hindi', 'Marathi'], 4.8, 'MMC001', ARRAY['Memorial Sloan Kettering Cancer Center'], 150, ARRAY['Head and Neck Oncology', 'Robotic Surgery']),

('Dr. Atul Sharma', 'Medical Oncology', 'Lung Cancer', 'MBBS, MD Internal Medicine, DM Medical Oncology', 22, (SELECT id FROM public.cancer_hospitals WHERE name LIKE '%AIIMS%'), '+91-11-26594604', 1200, ARRAY['Monday', 'Wednesday', 'Friday'], '10:00 AM - 4:00 PM', ARRAY['English', 'Hindi'], 4.7, 'DMC002', ARRAY['MD Anderson Cancer Center'], 120, ARRAY['Thoracic Oncology', 'Immunotherapy']),

('Dr. Sanjay Dudhat', 'Radiation Oncology', 'Breast Cancer', 'MBBS, MD Radiotherapy, DNB', 25, (SELECT id FROM public.cancer_hospitals WHERE name LIKE '%Apollo%'), '+91-44-28293344', 1800, ARRAY['Tuesday', 'Thursday', 'Saturday'], '9:00 AM - 3:00 PM', ARRAY['English', 'Tamil', 'Hindi'], 4.6, 'TMC003', ARRAY['Johns Hopkins Hospital'], 95, ARRAY['Stereotactic Radiosurgery', 'Breast Cancer Treatment']),

('Dr. Lokesh KN', 'Medical Oncology', 'Gastrointestinal Cancer', 'MBBS, MD Internal Medicine, DM Medical Oncology', 20, (SELECT id FROM public.cancer_hospitals WHERE name LIKE '%Kidwai%'), '+91-80-26631095', 1000, ARRAY['Monday', 'Tuesday', 'Thursday', 'Friday'], '8:00 AM - 2:00 PM', ARRAY['English', 'Hindi', 'Kannada'], 4.5, 'KMC004', ARRAY['Dana-Farber Cancer Institute'], 80, ARRAY['GI Oncology', 'Precision Medicine']),

('Dr. Vinod Raina', 'Medical Oncology', 'Pediatric Oncology', 'MBBS, MD Pediatrics, DM Medical Oncology', 30, (SELECT id FROM public.cancer_hospitals WHERE name LIKE '%Rajiv Gandhi%'), '+91-11-47022223', 2000, ARRAY['Monday', 'Wednesday', 'Friday'], '10:00 AM - 4:00 PM', ARRAY['English', 'Hindi'], 4.9, 'DMC005', ARRAY['St. Jude Children Research Hospital'], 200, ARRAY['Pediatric Hematology-Oncology', 'Childhood Leukemia']);

-- Insert sample Indian diagnostic labs
INSERT INTO public.diagnostic_labs (name, address, city, state, pincode, phone, lab_type, test_categories, accreditation, specialized_tests, home_collection, online_reports, emergency_services, turnaround_time, rating, license_number) VALUES
('SRL Diagnostics', 'Plot No. 5, Sector 18, Gurgaon', 'Gurgaon', 'Haryana', '122015', '+91-124-4885000', 'Pathology and Imaging Center', ARRAY['Pathology', 'Molecular Diagnostics', 'Immunohistochemistry']::diagnostic_test_type[], ARRAY['NABL', 'CAP'], ARRAY['Tumor Markers', 'BRCA Testing', 'Liquid Biopsy', 'Next Generation Sequencing'], true, true, true, '24-48 hours', 4.3, 'NABL001'),

('Dr. Lal PathLabs', 'Block E, Sector 18, Rohini, New Delhi', 'New Delhi', 'Delhi', '110085', '+91-11-30142050', 'Comprehensive Diagnostic Center', ARRAY['Pathology', 'Radiology', 'Nuclear Medicine', 'Genetic Testing']::diagnostic_test_type[], ARRAY['NABL', 'ISO 15189'], ARRAY['Cancer Screening Panel', 'Hereditary Cancer Testing', 'PET-CT Scan'], true, true, true, '12-24 hours', 4.4, 'NABL002'),

('Metropolis Healthcare', 'Near Hinduja Hospital, Mahim, Mumbai', 'Mumbai', 'Maharashtra', '400016', '+91-22-30898989', 'Pathology Lab', ARRAY['Pathology', 'Molecular Diagnostics', 'Flow Cytometry']::diagnostic_test_type[], ARRAY['NABL', 'CAP', 'DGHS'], ARRAY['Oncotype DX', 'HER2 Testing', 'Hematopathology'], true, true, false, '24-72 hours', 4.2, 'NABL003'),

('Thyrocare Technologies', 'D-37/1, TTC Industrial Area, Navi Mumbai', 'Navi Mumbai', 'Maharashtra', '400703', '+91-22-67979797', 'Preventive Healthcare Lab', ARRAY['Pathology', 'Immunohistochemistry']::diagnostic_test_type[], ARRAY['NABL', 'ISO 9001'], ARRAY['Full Body Checkup with Cancer Markers', 'Thyroid Cancer Screening'], true, true, false, '24 hours', 4.1, 'NABL004'),

('Vijaya Diagnostic Centre', '3-6-16/1/A1, Street No. 19, Himayatnagar, Hyderabad', 'Hyderabad', 'Telangana', '500029', '+91-40-40206020', 'Multi-specialty Diagnostic Center', ARRAY['Radiology', 'Nuclear Medicine', 'Pathology']::diagnostic_test_type[], ARRAY['NABL', 'AERB'], ARRAY['PET-CT for Cancer', 'Mammography', 'MRI with Contrast'], false, true, true, '24-48 hours', 4.3, 'NABL005');

-- Insert sample health insurance companies
INSERT INTO public.health_insurance_companies (name, headquarters, established_year, website, customer_care_number, coverage_areas, claim_settlement_ratio, cancer_coverage, cashless_network_size, rating, irdai_registration_number, speciality_coverage) VALUES
('Star Health and Allied Insurance', 'Chennai, Tamil Nadu', 2006, 'www.starhealth.in', '1800-425-2255', ARRAY['All India'], 89.80, true, 12000, 4.2, 'IRDAI001', ARRAY['Cancer', 'Cardiac', 'Maternity']),

('ICICI Lombard General Insurance', 'Mumbai, Maharashtra', 2001, 'www.icicilombard.com', '1800-266-7766', ARRAY['All India'], 96.30, true, 6500, 4.1, 'IRDAI002', ARRAY['Cancer', 'Critical Illness', 'Personal Accident']),

('HDFC ERGO General Insurance', 'Mumbai, Maharashtra', 2002, 'www.hdfcergo.com', '1800-266-0700', ARRAY['All India'], 94.20, true, 10000, 4.0, 'IRDAI003', ARRAY['Cancer', 'Health', 'Travel']),

('Bajaj Allianz General Insurance', 'Pune, Maharashtra', 2001, 'www.bajajallianz.com', '1800-209-5858', ARRAY['All India'], 92.10, true, 6800, 3.9, 'IRDAI004', ARRAY['Cancer', 'Health', 'Motor']),

('Max Bupa Health Insurance', 'New Delhi, Delhi', 2010, 'www.maxbupa.com', '1800-266-1111', ARRAY['All India'], 88.50, true, 4000, 4.3, 'IRDAI005', ARRAY['Cancer', 'Health', 'Critical Illness']);

-- Insert sample health insurance plans
INSERT INTO public.health_insurance_plans (insurance_company_id, plan_name, coverage_amount, premium_amount, policy_type, cancer_coverage_amount, cancer_specific_benefits, key_features, exclusions, waiting_period_cancer, waiting_period_general, age_limit, co_payment_percentage, room_rent_limit) VALUES
((SELECT id FROM public.health_insurance_companies WHERE name LIKE '%Star Health%'), 'Star Cancer Care Insurance', 2500000, 25000, 'Individual', 2500000, ARRAY['Chemotherapy Coverage', 'Radiation Therapy', 'Bone Marrow Transplant', 'Targeted Therapy'], ARRAY['100% Cancer Coverage', 'Second Opinion Coverage', 'Attendant Allowance'], ARRAY['Pre-existing cancer'], '90 days', '30 days', '18-75 years', 0, 7500),

((SELECT id FROM public.health_insurance_companies WHERE name LIKE '%ICICI Lombard%'), 'Complete Health Insurance', 1000000, 15000, 'Family', 500000, ARRAY['Cancer Treatment', 'Preventive Cancer Screening'], ARRAY['Family Floater', 'Annual Health Checkup', 'Cashless Treatment'], ARRAY['Self-inflicted injuries', 'War'], '48 months for cancer', '30 days', '18-65 years', 10, 5000),

((SELECT id FROM public.health_insurance_companies WHERE name LIKE '%HDFC ERGO%'), 'My Health Suraksha', 500000, 8000, 'Individual', 300000, ARRAY['Cancer Surgery', 'Chemotherapy', 'Immunotherapy'], ARRAY['Restore Benefit', 'Health Management Programs'], ARRAY['Genetic disorders', 'Experimental treatments'], '2 years for cancer', '30 days', '18-60 years', 5, 4000),

((SELECT id FROM public.health_insurance_companies WHERE name LIKE '%Bajaj Allianz%'), 'Health Guard Insurance', 300000, 6000, 'Individual', 200000, ARRAY['In-patient Cancer Treatment', 'Day Care Procedures'], ARRAY['Worldwide Coverage', 'Organ Transplant Cover'], ARRAY['Cosmetic surgery', 'Infertility'], '24 months for cancer', '30 days', '5-65 years', 20, 3000),

((SELECT id FROM public.health_insurance_companies WHERE name LIKE '%Max Bupa%'), 'Heartbeat Family Health Insurance', 1500000, 20000, 'Family', 750000, ARRAY['Comprehensive Cancer Coverage', 'Alternative Treatment Methods'], ARRAY['Preventive Health Checkups', 'Teleconsultation'], ARRAY['Pre-existing diseases for 3 years'], '36 months for cancer', '30 days', '91 days-65 years', 0, 6000);

-- Insert sample lab tests
INSERT INTO public.lab_tests (lab_id, test_name, test_category, cancer_type, cost, sample_type, fasting_required, turnaround_time, test_description, preparation_instructions) VALUES
((SELECT id FROM public.diagnostic_labs WHERE name LIKE '%SRL%'), 'Comprehensive Tumor Marker Panel', 'Pathology', ARRAY['Multiple Cancer Types'], 3500, 'Blood', true, '24 hours', 'Panel of markers including CEA, CA 19-9, CA 125, PSA, AFP', 'Fast for 12 hours before sample collection'),

((SELECT id FROM public.diagnostic_labs WHERE name LIKE '%Dr. Lal%'), 'BRCA1/BRCA2 Genetic Testing', 'Genetic Testing', ARRAY['Breast Cancer', 'Ovarian Cancer'], 15000, 'Blood/Saliva', false, '7-10 days', 'Genetic test for hereditary breast and ovarian cancer risk', 'No special preparation required'),

((SELECT id FROM public.diagnostic_labs WHERE name LIKE '%Metropolis%'), 'Liquid Biopsy - ctDNA Analysis', 'Molecular Diagnostics', ARRAY['Lung Cancer', 'Colorectal Cancer'], 25000, 'Blood', false, '5-7 days', 'Detection of circulating tumor DNA for cancer monitoring', 'Avoid recent chemotherapy before test'),

((SELECT id FROM public.diagnostic_labs WHERE name LIKE '%Thyrocare%'), 'Cancer Screening Profile', 'Pathology', ARRAY['Multiple Cancer Types'], 2500, 'Blood', true, '24 hours', 'Basic cancer screening with multiple tumor markers', 'Fast for 8-10 hours'),

((SELECT id FROM public.diagnostic_labs WHERE name LIKE '%Vijaya%'), 'PET-CT Whole Body Cancer Screening', 'Nuclear Medicine', ARRAY['Multiple Cancer Types'], 35000, 'IV Injection', true, '4-6 hours', 'Full body scan for cancer detection and staging', 'Fast for 6 hours, avoid exercise 24 hours before scan');
