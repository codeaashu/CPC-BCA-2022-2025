export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          appointment_type: string
          created_at: string
          doctor_id: string | null
          doctor_profile_id: string | null
          email: string | null
          hospital_id: string | null
          id: string
          notes: string | null
          patient_name: string
          phone_number: string
          preferred_language: string | null
          status: string
          symptoms_description: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          appointment_type: string
          created_at?: string
          doctor_id?: string | null
          doctor_profile_id?: string | null
          email?: string | null
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_name: string
          phone_number: string
          preferred_language?: string | null
          status?: string
          symptoms_description?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          appointment_type?: string
          created_at?: string
          doctor_id?: string | null
          doctor_profile_id?: string | null
          email?: string | null
          hospital_id?: string | null
          id?: string
          notes?: string | null
          patient_name?: string
          phone_number?: string
          preferred_language?: string | null
          status?: string
          symptoms_description?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "cancer_doctors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_profile_id_fkey"
            columns: ["doctor_profile_id"]
            isOneToOne: false
            referencedRelation: "doctor_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "cancer_hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      cancer_assessments: {
        Row: {
          assessment_data: Json
          created_at: string
          id: string
          risk_level: string
          total_score: number
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_data: Json
          created_at?: string
          id?: string
          risk_level: string
          total_score: number
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_data?: Json
          created_at?: string
          id?: string
          risk_level?: string
          total_score?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      cancer_doctors: {
        Row: {
          availability_days: string[] | null
          consultation_fee: number | null
          consultation_hours: string | null
          created_at: string
          email: string | null
          experience_years: number
          fellowship_training: string[] | null
          hospital_id: string | null
          id: string
          languages: string[] | null
          medical_registration_number: string | null
          name: string
          phone: string | null
          publications_count: number | null
          qualification: string
          rating: number | null
          research_interests: string[] | null
          specialization: Database["public"]["Enums"]["cancer_specialization"]
          sub_specialization: string | null
          updated_at: string
        }
        Insert: {
          availability_days?: string[] | null
          consultation_fee?: number | null
          consultation_hours?: string | null
          created_at?: string
          email?: string | null
          experience_years: number
          fellowship_training?: string[] | null
          hospital_id?: string | null
          id?: string
          languages?: string[] | null
          medical_registration_number?: string | null
          name: string
          phone?: string | null
          publications_count?: number | null
          qualification: string
          rating?: number | null
          research_interests?: string[] | null
          specialization: Database["public"]["Enums"]["cancer_specialization"]
          sub_specialization?: string | null
          updated_at?: string
        }
        Update: {
          availability_days?: string[] | null
          consultation_fee?: number | null
          consultation_hours?: string | null
          created_at?: string
          email?: string | null
          experience_years?: number
          fellowship_training?: string[] | null
          hospital_id?: string | null
          id?: string
          languages?: string[] | null
          medical_registration_number?: string | null
          name?: string
          phone?: string | null
          publications_count?: number | null
          qualification?: string
          rating?: number | null
          research_interests?: string[] | null
          specialization?: Database["public"]["Enums"]["cancer_specialization"]
          sub_specialization?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cancer_doctors_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "cancer_hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      cancer_hospitals: {
        Row: {
          accreditation: string[] | null
          address: string
          bed_capacity: number | null
          cancer_specialties:
            | Database["public"]["Enums"]["cancer_specialization"][]
            | null
          city: string
          clinical_trials: boolean | null
          created_at: string
          email: string | null
          emergency_oncology: boolean | null
          hospital_type: Database["public"]["Enums"]["cancer_hospital_type"]
          id: string
          name: string
          palliative_care: boolean | null
          phone: string | null
          pincode: string
          rating: number | null
          research_programs: string[] | null
          state: string
          treatment_facilities: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          accreditation?: string[] | null
          address: string
          bed_capacity?: number | null
          cancer_specialties?:
            | Database["public"]["Enums"]["cancer_specialization"][]
            | null
          city: string
          clinical_trials?: boolean | null
          created_at?: string
          email?: string | null
          emergency_oncology?: boolean | null
          hospital_type: Database["public"]["Enums"]["cancer_hospital_type"]
          id?: string
          name: string
          palliative_care?: boolean | null
          phone?: string | null
          pincode: string
          rating?: number | null
          research_programs?: string[] | null
          state: string
          treatment_facilities?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          accreditation?: string[] | null
          address?: string
          bed_capacity?: number | null
          cancer_specialties?:
            | Database["public"]["Enums"]["cancer_specialization"][]
            | null
          city?: string
          clinical_trials?: boolean | null
          created_at?: string
          email?: string | null
          emergency_oncology?: boolean | null
          hospital_type?: Database["public"]["Enums"]["cancer_hospital_type"]
          id?: string
          name?: string
          palliative_care?: boolean | null
          phone?: string | null
          pincode?: string
          rating?: number | null
          research_programs?: string[] | null
          state?: string
          treatment_facilities?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      diagnostic_labs: {
        Row: {
          accreditation: string[] | null
          address: string
          city: string
          created_at: string
          email: string | null
          emergency_services: boolean | null
          home_collection: boolean | null
          id: string
          lab_type: string
          license_number: string | null
          name: string
          online_reports: boolean | null
          phone: string | null
          pincode: string
          rating: number | null
          specialized_tests: string[] | null
          state: string
          test_categories:
            | Database["public"]["Enums"]["diagnostic_test_type"][]
            | null
          turnaround_time: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          accreditation?: string[] | null
          address: string
          city: string
          created_at?: string
          email?: string | null
          emergency_services?: boolean | null
          home_collection?: boolean | null
          id?: string
          lab_type: string
          license_number?: string | null
          name: string
          online_reports?: boolean | null
          phone?: string | null
          pincode: string
          rating?: number | null
          specialized_tests?: string[] | null
          state: string
          test_categories?:
            | Database["public"]["Enums"]["diagnostic_test_type"][]
            | null
          turnaround_time?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          accreditation?: string[] | null
          address?: string
          city?: string
          created_at?: string
          email?: string | null
          emergency_services?: boolean | null
          home_collection?: boolean | null
          id?: string
          lab_type?: string
          license_number?: string | null
          name?: string
          online_reports?: boolean | null
          phone?: string | null
          pincode?: string
          rating?: number | null
          specialized_tests?: string[] | null
          state?: string
          test_categories?:
            | Database["public"]["Enums"]["diagnostic_test_type"][]
            | null
          turnaround_time?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      doctor_profiles: {
        Row: {
          consultation_fee: number | null
          created_at: string
          experience_years: number | null
          id: string
          medical_registration_number: string | null
          name: string
          phone_number: string | null
          qualification: string | null
          specialization: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          id?: string
          medical_registration_number?: string | null
          name: string
          phone_number?: string | null
          qualification?: string | null
          specialization?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          consultation_fee?: number | null
          created_at?: string
          experience_years?: number | null
          id?: string
          medical_registration_number?: string | null
          name?: string
          phone_number?: string | null
          qualification?: string | null
          specialization?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_insurance_companies: {
        Row: {
          cancer_coverage: boolean | null
          cashless_network_size: number | null
          claim_settlement_ratio: number | null
          coverage_areas: string[] | null
          created_at: string
          customer_care_number: string | null
          email: string | null
          established_year: number | null
          headquarters: string
          id: string
          irdai_registration_number: string | null
          name: string
          rating: number | null
          speciality_coverage: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          cancer_coverage?: boolean | null
          cashless_network_size?: number | null
          claim_settlement_ratio?: number | null
          coverage_areas?: string[] | null
          created_at?: string
          customer_care_number?: string | null
          email?: string | null
          established_year?: number | null
          headquarters: string
          id?: string
          irdai_registration_number?: string | null
          name: string
          rating?: number | null
          speciality_coverage?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          cancer_coverage?: boolean | null
          cashless_network_size?: number | null
          claim_settlement_ratio?: number | null
          coverage_areas?: string[] | null
          created_at?: string
          customer_care_number?: string | null
          email?: string | null
          established_year?: number | null
          headquarters?: string
          id?: string
          irdai_registration_number?: string | null
          name?: string
          rating?: number | null
          speciality_coverage?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      health_insurance_plans: {
        Row: {
          age_limit: string | null
          cancer_coverage_amount: number | null
          cancer_specific_benefits: string[] | null
          cashless_hospitals: string[] | null
          co_payment_percentage: number | null
          coverage_amount: number
          created_at: string
          exclusions: string[] | null
          id: string
          insurance_company_id: string
          key_features: string[] | null
          plan_name: string
          policy_type: string
          premium_amount: number
          room_rent_limit: number | null
          updated_at: string
          waiting_period_cancer: string | null
          waiting_period_general: string | null
        }
        Insert: {
          age_limit?: string | null
          cancer_coverage_amount?: number | null
          cancer_specific_benefits?: string[] | null
          cashless_hospitals?: string[] | null
          co_payment_percentage?: number | null
          coverage_amount: number
          created_at?: string
          exclusions?: string[] | null
          id?: string
          insurance_company_id: string
          key_features?: string[] | null
          plan_name: string
          policy_type: string
          premium_amount: number
          room_rent_limit?: number | null
          updated_at?: string
          waiting_period_cancer?: string | null
          waiting_period_general?: string | null
        }
        Update: {
          age_limit?: string | null
          cancer_coverage_amount?: number | null
          cancer_specific_benefits?: string[] | null
          cashless_hospitals?: string[] | null
          co_payment_percentage?: number | null
          coverage_amount?: number
          created_at?: string
          exclusions?: string[] | null
          id?: string
          insurance_company_id?: string
          key_features?: string[] | null
          plan_name?: string
          policy_type?: string
          premium_amount?: number
          room_rent_limit?: number | null
          updated_at?: string
          waiting_period_cancer?: string | null
          waiting_period_general?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "health_insurance_plans_insurance_company_id_fkey"
            columns: ["insurance_company_id"]
            isOneToOne: false
            referencedRelation: "health_insurance_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_quotes: {
        Row: {
          age: number
          annual_income: string | null
          created_at: string
          email: string
          existing_conditions: string[] | null
          family_medical_history: string | null
          full_name: string
          id: string
          insurance_company_id: string | null
          occupation: string | null
          phone_number: string
          plan_id: string | null
          preferred_coverage_amount: number | null
          quote_amount: number | null
          quote_details: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age: number
          annual_income?: string | null
          created_at?: string
          email: string
          existing_conditions?: string[] | null
          family_medical_history?: string | null
          full_name: string
          id?: string
          insurance_company_id?: string | null
          occupation?: string | null
          phone_number: string
          plan_id?: string | null
          preferred_coverage_amount?: number | null
          quote_amount?: number | null
          quote_details?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number
          annual_income?: string | null
          created_at?: string
          email?: string
          existing_conditions?: string[] | null
          family_medical_history?: string | null
          full_name?: string
          id?: string
          insurance_company_id?: string | null
          occupation?: string | null
          phone_number?: string
          plan_id?: string | null
          preferred_coverage_amount?: number | null
          quote_amount?: number | null
          quote_details?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_quotes_insurance_company_id_fkey"
            columns: ["insurance_company_id"]
            isOneToOne: false
            referencedRelation: "health_insurance_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insurance_quotes_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "health_insurance_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_bookings: {
        Row: {
          booking_date: string
          booking_time: string
          created_at: string
          email: string | null
          home_collection: boolean | null
          id: string
          lab_id: string
          patient_name: string
          phone_number: string
          special_instructions: string | null
          status: string
          test_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date: string
          booking_time: string
          created_at?: string
          email?: string | null
          home_collection?: boolean | null
          id?: string
          lab_id: string
          patient_name: string
          phone_number: string
          special_instructions?: string | null
          status?: string
          test_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          booking_time?: string
          created_at?: string
          email?: string | null
          home_collection?: boolean | null
          id?: string
          lab_id?: string
          patient_name?: string
          phone_number?: string
          special_instructions?: string | null
          status?: string
          test_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_bookings_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "diagnostic_labs"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_tests: {
        Row: {
          cancer_type: string[] | null
          cost: number
          created_at: string
          fasting_required: boolean | null
          id: string
          lab_id: string
          preparation_instructions: string | null
          sample_type: string | null
          test_category: Database["public"]["Enums"]["diagnostic_test_type"]
          test_description: string | null
          test_name: string
          turnaround_time: string | null
          updated_at: string
        }
        Insert: {
          cancer_type?: string[] | null
          cost: number
          created_at?: string
          fasting_required?: boolean | null
          id?: string
          lab_id: string
          preparation_instructions?: string | null
          sample_type?: string | null
          test_category: Database["public"]["Enums"]["diagnostic_test_type"]
          test_description?: string | null
          test_name: string
          turnaround_time?: string | null
          updated_at?: string
        }
        Update: {
          cancer_type?: string[] | null
          cost?: number
          created_at?: string
          fasting_required?: boolean | null
          id?: string
          lab_id?: string
          preparation_instructions?: string | null
          sample_type?: string | null
          test_category?: Database["public"]["Enums"]["diagnostic_test_type"]
          test_description?: string | null
          test_name?: string
          turnaround_time?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_tests_lab_id_fkey"
            columns: ["lab_id"]
            isOneToOne: false
            referencedRelation: "diagnostic_labs"
            referencedColumns: ["id"]
          },
        ]
      }
      location_searches: {
        Row: {
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          results_found: number | null
          search_location: string
          search_radius: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          results_found?: number | null
          search_location: string
          search_radius?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          results_found?: number | null
          search_location?: string
          search_radius?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          last_assessment_date: string | null
          latest_risk_level: string | null
          latest_risk_score: number | null
          name: string
          phone_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          last_assessment_date?: string | null
          latest_risk_level?: string | null
          latest_risk_score?: number | null
          name: string
          phone_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          last_assessment_date?: string | null
          latest_risk_level?: string | null
          latest_risk_score?: number | null
          name?: string
          phone_number?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cancer_hospital_type:
        | "Comprehensive Cancer Center"
        | "Specialty Cancer Hospital"
        | "Multi-specialty with Cancer Wing"
        | "Government Cancer Institute"
        | "Research Cancer Hospital"
      cancer_specialization:
        | "Medical Oncology"
        | "Surgical Oncology"
        | "Radiation Oncology"
        | "Pediatric Oncology"
        | "Gynecologic Oncology"
        | "Hematology-Oncology"
        | "Neuro-Oncology"
        | "Thoracic Oncology"
        | "Gastrointestinal Oncology"
        | "Breast Oncology"
        | "Urologic Oncology"
        | "Head and Neck Oncology"
      diagnostic_test_type:
        | "Pathology"
        | "Radiology"
        | "Nuclear Medicine"
        | "Molecular Diagnostics"
        | "Genetic Testing"
        | "Immunohistochemistry"
        | "Flow Cytometry"
        | "Cytogenetics"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      cancer_hospital_type: [
        "Comprehensive Cancer Center",
        "Specialty Cancer Hospital",
        "Multi-specialty with Cancer Wing",
        "Government Cancer Institute",
        "Research Cancer Hospital",
      ],
      cancer_specialization: [
        "Medical Oncology",
        "Surgical Oncology",
        "Radiation Oncology",
        "Pediatric Oncology",
        "Gynecologic Oncology",
        "Hematology-Oncology",
        "Neuro-Oncology",
        "Thoracic Oncology",
        "Gastrointestinal Oncology",
        "Breast Oncology",
        "Urologic Oncology",
        "Head and Neck Oncology",
      ],
      diagnostic_test_type: [
        "Pathology",
        "Radiology",
        "Nuclear Medicine",
        "Molecular Diagnostics",
        "Genetic Testing",
        "Immunohistochemistry",
        "Flow Cytometry",
        "Cytogenetics",
      ],
    },
  },
} as const
