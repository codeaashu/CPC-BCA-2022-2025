import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Calendar, Clock, User, Phone, Mail, FileText } from 'lucide-react';

interface BookConsultationFormProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: {
    id: string;
    name: string;
    specialization: string;
    consultation_fee?: number;
    languages?: string[];
  } | {
    id: string;
    user_id: string;
    name: string;
    specialization?: string;
    consultation_fee?: number;
  };
}

const BookConsultationForm = ({ isOpen, onClose, doctor }: BookConsultationFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    appointment_date: '',
    appointment_time: '',
    patient_name: '',
    phone_number: '',
    email: '',
    symptoms_description: '',
    preferred_language: '',
  });

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to book a consultation');
      return;
    }

    setLoading(true);
    try {
      // Check if this is a doctor_profile (has user_id) or cancer_doctors entry
      const appointmentData: any = {
        user_id: user.id,
        appointment_type: 'consultation',
        ...formData,
      };

      // If doctor has user_id, it's from doctor_profiles table
      if ('user_id' in doctor) {
        appointmentData.doctor_profile_id = doctor.id;
      } else {
        // Otherwise it's from cancer_doctors table
        appointmentData.doctor_id = doctor.id;
      }

      const { error } = await supabase
        .from('appointments')
        .insert(appointmentData);

      if (error) throw error;

      toast.success('Consultation booked successfully! We will contact you soon.');
      onClose();
      setFormData({
        appointment_date: '',
        appointment_time: '',
        patient_name: '',
        phone_number: '',
        email: '',
        symptoms_description: '',
        preferred_language: '',
      });
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast.error('Failed to book consultation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Book Consultation with Dr. {doctor.name}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            {doctor.specialization}
            {doctor.consultation_fee && (
              <span className="ml-2 text-green-600 font-medium">
                ₹{doctor.consultation_fee}
              </span>
            )}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appointment_date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Preferred Date
              </Label>
              <Input
                id="appointment_date"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="appointment_time" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Preferred Time
              </Label>
              <Select value={formData.appointment_time} onValueChange={(value) => setFormData({ ...formData, appointment_time: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient Name
              </Label>
              <Input
                id="patient_name"
                required
                value={formData.patient_name}
                onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="phone_number" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone_number"
                type="tel"
                required
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {'languages' in doctor && doctor.languages && doctor.languages.length > 0 && (
            <div>
              <Label htmlFor="preferred_language">
                Preferred Language
              </Label>
              <Select value={formData.preferred_language} onValueChange={(value) => setFormData({ ...formData, preferred_language: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {'languages' in doctor && doctor.languages?.map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="symptoms_description" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Symptoms/Condition Description
            </Label>
            <Textarea
              id="symptoms_description"
              placeholder="Please describe your symptoms or condition..."
              value={formData.symptoms_description}
              onChange={(e) => setFormData({ ...formData, symptoms_description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Booking...' : 'Book Consultation'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookConsultationForm;