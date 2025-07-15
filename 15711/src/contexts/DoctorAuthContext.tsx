import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface DoctorProfile {
  id: string;
  user_id: string;
  name: string;
  phone_number?: string;
  specialization?: string;
  experience_years?: number;
  qualification?: string;
  medical_registration_number?: string;
  consultation_fee?: number;
  created_at: string;
  updated_at: string;
}

interface DoctorAuthContextType {
  user: User | null;
  session: Session | null;
  doctorProfile: DoctorProfile | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<DoctorProfile>) => Promise<{ error: any }>;
}

const DoctorAuthContext = createContext<DoctorAuthContextType | undefined>(undefined);

export const useDoctorAuth = () => {
  const context = useContext(DoctorAuthContext);
  if (context === undefined) {
    throw new Error('useDoctorAuth must be used within a DoctorAuthProvider');
  }
  return context;
};

export const DoctorAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('doctor_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching doctor profile:', error);
        return;
      }

      if (!data) {
        // No profile exists, create one
        await createDoctorProfile(userId);
        return;
      }

      setDoctorProfile(data);
    } catch (error) {
      console.error('Error in fetchDoctorProfile:', error);
    }
  };

  const createDoctorProfile = async (userId: string) => {
    try {
      // Get user info from auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const profileData = {
        user_id: userId,
        name: user.user_metadata?.name || 'Doctor',
        phone_number: user.user_metadata?.phone_number || null,
      };

      const { data, error } = await supabase
        .from('doctor_profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('Error creating doctor profile:', error);
        return;
      }

      setDoctorProfile(data);
    } catch (error) {
      console.error('Error in createDoctorProfile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchDoctorProfile(session.user.id);
        } else {
          setDoctorProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchDoctorProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    const redirectUrl = `${window.location.origin}/doctor/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          name,
          phone_number: phone || '',
          user_type: 'doctor'
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<DoctorProfile>) => {
    if (!user) return { error: { message: 'No user logged in' } };

    const { error } = await supabase
      .from('doctor_profiles')
      .update(updates)
      .eq('user_id', user.id);

    if (!error && doctorProfile) {
      setDoctorProfile({ ...doctorProfile, ...updates });
    }

    return { error };
  };

  const value = {
    user,
    session,
    doctorProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <DoctorAuthContext.Provider value={value}>{children}</DoctorAuthContext.Provider>;
};