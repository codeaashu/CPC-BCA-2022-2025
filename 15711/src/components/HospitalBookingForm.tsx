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
import { Calendar, Clock, User, Phone, Mail, FileText, Building2 } from 'lucide-react';

interface HospitalBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  hospital: {
    id: string;
    name: string;
    city: string;
    state: string;
    cancer_specialties?: string[];
  };
}

const HospitalBookingForm = ({ isOpen, onClose, hospital }: HospitalBookingFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    appointment_date: '',
    appointment_time: '',
    patient_name: '',
    phone_number: '',
    email: '',
    symptoms_description: '',
    preferred_specialty: '',
  });

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to book an appointment');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          user_id: user.id,
          hospital_id: hospital.id,
          appointment_type: 'hospital_visit',
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time,
          patient_name: formData.patient_name,
          phone_number: formData.phone_number,
          email: formData.email,
          symptoms_description: formData.symptoms_description,
          notes: formData.preferred_specialty ? `Preferred specialty: ${formData.preferred_specialty}` : null,
        });

      if (error) throw error;

      toast.success('Hospital appointment booked successfully! We will contact you within 24 hours.');
      onClose();
      setFormData({
        appointment_date: '',
        appointment_time: '',
        patient_name: '',
        phone_number: '',
        email: '',
        symptoms_description: '',
        preferred_specialty: '',
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Book Appointment at {hospital.name}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            {hospital.city}, {hospital.state}
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

          {hospital.cancer_specialties && hospital.cancer_specialties.length > 0 && (
            <div>
              <Label htmlFor="preferred_specialty">
                Preferred Specialty (if any)
              </Label>
              <Select value={formData.preferred_specialty} onValueChange={(value) => setFormData({ ...formData, preferred_specialty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {hospital.cancer_specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="symptoms_description" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reason for Visit/Symptoms
            </Label>
            <Textarea
              id="symptoms_description"
              placeholder="Please describe the reason for your visit or symptoms..."
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
              {loading ? 'Booking...' : 'Book Appointment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalBookingForm;