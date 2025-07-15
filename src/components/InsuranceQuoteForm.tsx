import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { User, Phone, Mail, Briefcase, DollarSign, Shield } from 'lucide-react';

interface InsuranceQuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  company: {
    id: string;
    name: string;
    cancer_coverage?: boolean;
  };
}

const InsuranceQuoteForm = ({ isOpen, onClose, company }: InsuranceQuoteFormProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    age: '',
    occupation: '',
    annual_income: '',
    existing_conditions: [] as string[],
    family_medical_history: '',
    preferred_coverage_amount: '',
  });

  const commonConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 
    'Cancer History', 'Thyroid Disorder', 'None'
  ];

  const incomeRanges = [
    'Below ₹3 Lakhs', '₹3-5 Lakhs', '₹5-10 Lakhs', 
    '₹10-15 Lakhs', '₹15-25 Lakhs', 'Above ₹25 Lakhs'
  ];

  const coverageAmounts = [
    '₹5 Lakhs', '₹10 Lakhs', '₹15 Lakhs', '₹20 Lakhs', 
    '₹25 Lakhs', '₹50 Lakhs', '₹1 Crore'
  ];

  const handleConditionChange = (condition: string, checked: boolean) => {
    if (condition === 'None') {
      setFormData({ ...formData, existing_conditions: checked ? ['None'] : [] });
    } else {
      const updatedConditions = checked
        ? [...formData.existing_conditions.filter(c => c !== 'None'), condition]
        : formData.existing_conditions.filter(c => c !== condition);
      setFormData({ ...formData, existing_conditions: updatedConditions });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to request a quote');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('insurance_quotes')
        .insert({
          user_id: user.id,
          insurance_company_id: company.id,
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          email: formData.email,
          age: parseInt(formData.age),
          occupation: formData.occupation,
          annual_income: formData.annual_income,
          existing_conditions: formData.existing_conditions,
          family_medical_history: formData.family_medical_history,
          preferred_coverage_amount: parseInt(formData.preferred_coverage_amount.replace(/[^\d]/g, '')) || null,
        });

      if (error) throw error;

      toast.success('Quote request submitted successfully! We will contact you within 24 hours.');
      onClose();
      setFormData({
        full_name: '',
        phone_number: '',
        email: '',
        age: '',
        occupation: '',
        annual_income: '',
        existing_conditions: [],
        family_medical_history: '',
        preferred_coverage_amount: '',
      });
    } catch (error) {
      console.error('Error requesting quote:', error);
      toast.error('Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Get Quote from {company.name}
          </DialogTitle>
          {company.cancer_coverage && (
            <p className="text-sm text-green-600 font-medium">
              ✓ Cancer Coverage Available
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="full_name"
                required
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="age">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="100"
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="occupation" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Occupation
              </Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="annual_income" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Annual Income
              </Label>
              <Select value={formData.annual_income} onValueChange={(value) => setFormData({ ...formData, annual_income: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  {incomeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="preferred_coverage_amount">
              Preferred Coverage Amount
            </Label>
            <Select value={formData.preferred_coverage_amount} onValueChange={(value) => setFormData({ ...formData, preferred_coverage_amount: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select coverage amount" />
              </SelectTrigger>
              <SelectContent>
                {coverageAmounts.map((amount) => (
                  <SelectItem key={amount} value={amount}>
                    {amount}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-base font-medium">Existing Medical Conditions</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {commonConditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={formData.existing_conditions.includes(condition)}
                    onCheckedChange={(checked) => handleConditionChange(condition, !!checked)}
                  />
                  <Label htmlFor={condition} className="text-sm">
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="family_medical_history">
              Family Medical History (optional)
            </Label>
            <Textarea
              id="family_medical_history"
              placeholder="Please mention any relevant family medical history..."
              value={formData.family_medical_history}
              onChange={(e) => setFormData({ ...formData, family_medical_history: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Submitting...' : 'Request Quote'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InsuranceQuoteForm;