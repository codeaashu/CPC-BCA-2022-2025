import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { User, Phone, Mail, Edit2, Save, X, Stethoscope, GraduationCap, Award } from 'lucide-react';
import { useDoctorAuth } from '@/contexts/DoctorAuthContext';
import { toast } from 'sonner';

const DoctorProfile = () => {
  const { doctorProfile, updateProfile, user } = useDoctorAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    specialization: '',
    experience_years: 0,
    qualification: '',
    medical_registration_number: '',
    consultation_fee: 0,
  });

  useEffect(() => {
    if (doctorProfile) {
      setFormData({
        name: doctorProfile.name || '',
        phone_number: doctorProfile.phone_number || '',
        specialization: doctorProfile.specialization || '',
        experience_years: doctorProfile.experience_years || 0,
        qualification: doctorProfile.qualification || '',
        medical_registration_number: doctorProfile.medical_registration_number || '',
        consultation_fee: doctorProfile.consultation_fee || 0,
      });
    }
  }, [doctorProfile]);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setSaving(true);
    try {
      const { error } = await updateProfile(formData);
      
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

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    if (doctorProfile) {
      setFormData({
        name: doctorProfile.name || '',
        phone_number: doctorProfile.phone_number || '',
        specialization: doctorProfile.specialization || '',
        experience_years: doctorProfile.experience_years || 0,
        qualification: doctorProfile.qualification || '',
        medical_registration_number: doctorProfile.medical_registration_number || '',
        consultation_fee: doctorProfile.consultation_fee || 0,
      });
    }
  };

  if (!doctorProfile) {
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
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Stethoscope className="h-5 w-5 mr-2 text-green-600" />
            Doctor Profile
          </h3>
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

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="doctor-name" className="text-sm font-medium">
              Full Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="doctor-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="doctor-phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                className="pl-10"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-specialization" className="text-sm font-medium">
              Specialization
            </Label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="doctor-specialization"
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="pl-10"
                disabled={!isEditing}
                placeholder="e.g., Medical Oncology"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-experience" className="text-sm font-medium">
              Experience (Years)
            </Label>
            <Input
              id="doctor-experience"
              type="number"
              value={formData.experience_years}
              onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
              disabled={!isEditing}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-qualification" className="text-sm font-medium">
              Qualification
            </Label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="doctor-qualification"
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="pl-10"
                disabled={!isEditing}
                placeholder="e.g., MBBS, MD"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-registration" className="text-sm font-medium">
              Medical Registration Number
            </Label>
            <div className="relative">
              <Award className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="doctor-registration"
                type="text"
                value={formData.medical_registration_number}
                onChange={(e) => setFormData({ ...formData, medical_registration_number: e.target.value })}
                className="pl-10"
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor-fee" className="text-sm font-medium">
              Consultation Fee (₹)
            </Label>
            <Input
              id="doctor-fee"
              type="number"
              value={formData.consultation_fee}
              onChange={(e) => setFormData({ ...formData, consultation_fee: parseInt(e.target.value) || 0 })}
              disabled={!isEditing}
              min="0"
            />
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
  );
};

export default DoctorProfile;