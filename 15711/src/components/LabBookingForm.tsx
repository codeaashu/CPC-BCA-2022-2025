import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface LabBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  lab: {
    id: string;
    name: string;
    city: string;
    state: string;
    test_categories?: string[];
    home_collection?: boolean;
  };
}

const LabBookingForm = ({ isOpen, onClose, lab }: LabBookingFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    email: '',
    bookingDate: '',
    bookingTime: '',
    testType: '',
    specialInstructions: '',
    homeCollection: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to book a lab test');
      return;
    }

    if (!formData.patientName || !formData.phoneNumber || !formData.bookingDate || !formData.bookingTime || !formData.testType) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        user_id: user.id,
        lab_id: lab.id,
        patient_name: formData.patientName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        booking_date: formData.bookingDate,
        booking_time: formData.bookingTime,
        test_type: formData.testType,
        special_instructions: formData.specialInstructions,
        home_collection: formData.homeCollection
      };

      const { error } = await supabase
        .from('lab_bookings')
        .insert([bookingData]);

      if (error) {
        console.error('Error booking lab test:', error);
        toast.error('Failed to book lab test. Please try again.');
        return;
      }

      toast.success('Lab test booked successfully! We will contact you soon.');
      onClose();
      
      // Reset form
      setFormData({
        patientName: '',
        phoneNumber: '',
        email: '',
        bookingDate: '',
        bookingTime: '',
        testType: '',
        specialInstructions: '',
        homeCollection: false
      });
    } catch (error) {
      console.error('Error booking lab test:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Lab Test - {lab.name}</DialogTitle>
          <p className="text-sm text-muted-foreground">
            {lab.city}, {lab.state}
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">Patient Name *</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Enter patient name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bookingDate">Preferred Date *</Label>
              <Input
                id="bookingDate"
                type="date"
                value={formData.bookingDate}
                onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bookingTime">Preferred Time *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, bookingTime: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="14:00">02:00 PM</SelectItem>
                  <SelectItem value="15:00">03:00 PM</SelectItem>
                  <SelectItem value="16:00">04:00 PM</SelectItem>
                  <SelectItem value="17:00">05:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testType">Test Type *</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, testType: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select test type" />
              </SelectTrigger>
              <SelectContent>
                {lab.test_categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                )) || (
                  <>
                    <SelectItem value="Blood Test">Blood Test</SelectItem>
                    <SelectItem value="Urine Test">Urine Test</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                    <SelectItem value="Biopsy">Biopsy</SelectItem>
                    <SelectItem value="Genetic Testing">Genetic Testing</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {lab.home_collection && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="homeCollection"
                checked={formData.homeCollection}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, homeCollection: checked as boolean })
                }
              />
              <Label htmlFor="homeCollection">Request home collection</Label>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
              placeholder="Any special instructions or requirements"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Book Lab Test'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LabBookingForm;