
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Star, Calendar, Clock, Languages, GraduationCap } from 'lucide-react';
import BookConsultationForm from './BookConsultationForm';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialization: string;
    sub_specialization?: string;
    qualification: string;
    experience_years: number;
    phone?: string;
    consultation_fee?: number;
    availability_days?: string[];
    consultation_hours?: string;
    languages?: string[];
    rating?: number;
    fellowship_training?: string[];
  };
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const [showBookingForm, setShowBookingForm] = useState(false);

  return (
    <>
      <BookConsultationForm 
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        doctor={doctor}
      />
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {doctor.name}
            </CardTitle>
            <div className="text-blue-600 font-medium text-sm mb-1">
              {doctor.specialization}
            </div>
            {doctor.sub_specialization && (
              <div className="text-gray-600 text-sm mb-2">
                Specializes in: {doctor.sub_specialization}
              </div>
            )}
            <div className="flex items-center text-gray-600 text-sm">
              <GraduationCap className="h-4 w-4 mr-1" />
              <span>{doctor.qualification}</span>
            </div>
          </div>
          {doctor.rating && (
            <div className="flex items-center bg-green-50 px-2 py-1 rounded">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{doctor.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Experience: {doctor.experience_years} years
          </div>
          {doctor.consultation_fee && (
            <div className="text-sm font-medium text-green-600">
              ₹{doctor.consultation_fee}
            </div>
          )}
        </div>

        {doctor.availability_days && doctor.availability_days.length > 0 && (
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="font-medium">Available Days:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {doctor.availability_days.map((day) => (
                <Badge key={day} variant="outline" className="text-xs">
                  {day}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {doctor.consultation_hours && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{doctor.consultation_hours}</span>
          </div>
        )}

        {doctor.languages && doctor.languages.length > 0 && (
          <div>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Languages className="h-4 w-4 mr-1" />
              <span className="font-medium">Languages:</span>
            </div>
            <div className="text-sm text-gray-600">
              {doctor.languages.join(', ')}
            </div>
          </div>
        )}

        {doctor.fellowship_training && doctor.fellowship_training.length > 0 && (
          <div>
            <div className="text-sm font-medium text-gray-900 mb-1">Fellowship Training:</div>
            <div className="text-xs text-gray-600">
              {doctor.fellowship_training.join(', ')}
            </div>
          </div>
        )}

        {doctor.phone && (
          <div className="flex items-center text-sm text-gray-600 pt-2 border-t">
            <Phone className="h-4 w-4 mr-1" />
            <span>{doctor.phone}</span>
          </div>
        )}

        <Button className="w-full mt-4" onClick={() => setShowBookingForm(true)}>
          Book Consultation
        </Button>
      </CardContent>
    </Card>
    </>
  );
};

export default DoctorCard;
