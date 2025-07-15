
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Phone, Mail, Edit2, Save, X, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UserProfileData {
  name: string;
  phone_number: string;
  latest_risk_level?: string;
  latest_risk_score?: number;
  last_assessment_date?: string;
}

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData>({ 
    name: '', 
    phone_number: '',
    latest_risk_level: undefined,
    latest_risk_score: undefined,
    last_assessment_date: undefined
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, phone_number, latest_risk_level, latest_risk_score, last_assessment_date')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setProfile(data);
      } else {
        // Create a new profile if none exists
        await createProfile();
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profile.name,
          phone_number: profile.phone_number,
          updated_at: new Date().toISOString()
        })
        .eq('id', user?.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const createProfile = async () => {
    try {
      const profileData = {
        id: user?.id,
        name: user?.user_metadata?.name || '',
        phone_number: user?.user_metadata?.phone_number || '',
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      toast.error('Failed to create profile');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    fetchProfile(); // Reset to original values
  };

  const getRiskLevelColor = (level?: string) => {
    switch (level) {
      case 'High':
        return 'text-red-600 bg-red-50';
      case 'Moderate':
        return 'text-orange-600 bg-orange-50';
      case 'Low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{saving ? 'Saving...' : 'Save'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-name" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="profile-name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="profile-phone"
                  type="tel"
                  value={profile.phone_number}
                  onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                  className="pl-10"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  value={user?.email || ''}
                  className="pl-10 bg-gray-50"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-500">Email cannot be changed from here</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Assessment Results Card */}
      {profile.latest_risk_level && (
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Latest Cancer Risk Assessment
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`inline-block px-3 py-2 rounded-full text-sm font-medium ${getRiskLevelColor(profile.latest_risk_level)}`}>
                  {profile.latest_risk_level} Risk
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Risk Score</p>
                <p className="text-2xl font-bold text-gray-900">{profile.latest_risk_score}</p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">Assessment Date</p>
                <div className="flex items-center justify-center text-sm text-gray-700">
                  <Calendar className="h-4 w-4 mr-1" />
                  {profile.last_assessment_date ? 
                    new Date(profile.last_assessment_date).toLocaleDateString() : 
                    'Not available'
                  }
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/cancer-assessment'}
              >
                Retake Assessment
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
