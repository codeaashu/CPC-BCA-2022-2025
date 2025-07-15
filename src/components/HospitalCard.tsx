
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star, Users, Building2, Award } from 'lucide-react';
import HospitalBookingForm from './HospitalBookingForm';

interface HospitalCardProps {
  hospital: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    phone?: string;
    hospital_type: string;
    bed_capacity?: number;
    cancer_specialties?: string[];
    treatment_facilities?: string[];
    accreditation?: string[];
    rating?: number;
    emergency_oncology: boolean;
    palliative_care: boolean;
    clinical_trials: boolean;
  };
}

const HospitalCard = ({ hospital }: HospitalCardProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <>
      <HospitalBookingForm 
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        hospital={hospital}
      />
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {hospital.name}
            </CardTitle>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{hospital.city}, {hospital.state}</span>
            </div>
            {hospital.phone && (
              <div className="flex items-center text-gray-600 mb-2">
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">{hospital.phone}</span>
              </div>
            )}
          </div>
          {hospital.rating && (
            <div className="flex items-center bg-green-50 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{hospital.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Badge variant="outline" className="mb-2">
            {hospital.hospital_type}
          </Badge>
          {hospital.bed_capacity && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-1" />
              <span>{hospital.bed_capacity} beds</span>
            </div>
          )}
        </div>

        {hospital.cancer_specialties && hospital.cancer_specialties.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Cancer Specialties</h4>
            <div className="flex flex-wrap gap-1">
              {hospital.cancer_specialties.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {hospital.cancer_specialties.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{hospital.cancer_specialties.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {hospital.treatment_facilities && hospital.treatment_facilities.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Treatment Facilities</h4>
            <div className="flex flex-wrap gap-1">
              {hospital.treatment_facilities.slice(0, 2).map((facility) => (
                <Badge key={facility} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
              {hospital.treatment_facilities.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{hospital.treatment_facilities.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            {hospital.emergency_oncology && (
              <Badge className="text-xs bg-red-100 text-red-800">Emergency</Badge>
            )}
            {hospital.clinical_trials && (
              <Badge className="text-xs bg-blue-100 text-blue-800">Clinical Trials</Badge>
            )}
            {hospital.palliative_care && (
              <Badge className="text-xs bg-purple-100 text-purple-800">Palliative Care</Badge>
            )}
          </div>
        </div>

        {hospital.accreditation && hospital.accreditation.length > 0 && (
          <div className="flex items-center text-xs text-gray-600 pt-2 border-t">
            <Award className="h-3 w-3 mr-1" />
            <span>Accredited: {hospital.accreditation.join(', ')}</span>
          </div>
        )}

        <Button className="w-full mt-4" variant="outline" onClick={() => setShowBookingForm(true)}>
          View Details & Book Appointment
        </Button>
      </CardContent>
    </Card>
    </>
  );
};

export default HospitalCard;
