
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Building2, UserCheck, TestTube, Shield } from 'lucide-react';
import HospitalCard from './HospitalCard';
import DoctorCard from './DoctorCard';
import InsuranceQuoteForm from './InsuranceQuoteForm';
import LabBookingForm from './LabBookingForm';
import FindNearestCenter from './FindNearestCenter';
import { toast } from 'sonner';

const HospitalsDirectory = () => {
  const [searchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diagnosticLabs, setDiagnosticLabs] = useState([]);
  const [insuranceCompanies, setInsuranceCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedInsuranceCompany, setSelectedInsuranceCompany] = useState<any>(null);
  const [showLabBooking, setShowLabBooking] = useState(false);
  const [selectedLab, setSelectedLab] = useState<any>(null);
  const [showFindNearest, setShowFindNearest] = useState(false);

  useEffect(() => {
    fetchData();
    
    // Check if findNearest parameter is in URL
    if (searchParams.get('findNearest') === 'true') {
      setShowFindNearest(true);
    }
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch hospitals
      const { data: hospitalsData, error: hospitalsError } = await supabase
        .from('cancer_hospitals')
        .select('*')
        .order('rating', { ascending: false });

      if (hospitalsError) throw hospitalsError;

      // Fetch doctors from cancer_doctors table
      const { data: cancerDoctorsData, error: cancerDoctorsError } = await supabase
        .from('cancer_doctors')
        .select('*')
        .order('rating', { ascending: false });

      if (cancerDoctorsError) throw cancerDoctorsError;

      // Fetch doctors from doctor_profiles table
      const { data: doctorProfilesData, error: doctorProfilesError } = await supabase
        .from('doctor_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (doctorProfilesError) throw doctorProfilesError;

      // Combine both doctor lists - transform doctor_profiles to match cancer_doctors format
      const transformedDoctorProfiles = (doctorProfilesData || []).map(profile => ({
        id: profile.id,
        name: profile.name,
        specialization: profile.specialization || 'General Practice',
        qualification: profile.qualification || 'Medical Doctor',
        experience_years: profile.experience_years || 0,
        consultation_fee: profile.consultation_fee,
        phone: profile.phone_number,
        user_id: profile.user_id, // This distinguishes doctor_profiles from cancer_doctors
        rating: null,
        availability_days: null,
        consultation_hours: null,
        languages: null,
        fellowship_training: null,
        sub_specialization: null
      }));

      const allDoctors = [...(cancerDoctorsData || []), ...transformedDoctorProfiles];

      // Fetch diagnostic labs
      const { data: diagnosticData, error: diagnosticError } = await supabase
        .from('diagnostic_labs')
        .select('*')
        .order('rating', { ascending: false });

      if (diagnosticError) throw diagnosticError;

      // Fetch insurance companies
      const { data: insuranceData, error: insuranceError } = await supabase
        .from('health_insurance_companies')
        .select('*')
        .order('rating', { ascending: false });

      if (insuranceError) throw insuranceError;

      setHospitals(hospitalsData || []);
      setDoctors(allDoctors);
      setDiagnosticLabs(diagnosticData || []);
      setInsuranceCompanies(insuranceData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch healthcare directory data');
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = hospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCity === '' || hospital.city === selectedCity)
  );

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLabs = diagnosticLabs.filter(lab => 
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCity === '' || lab.city === selectedCity)
  );

  const filteredInsurance = insuranceCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cities = [...new Set(hospitals.map(h => h.city))].sort();

  const handleInsuranceQuote = (company: any) => {
    setSelectedInsuranceCompany(company);
    setShowQuoteForm(true);
  };

  const handleLabBooking = (lab: any) => {
    setSelectedLab(lab);
    setShowLabBooking(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      {showQuoteForm && selectedInsuranceCompany && (
        <InsuranceQuoteForm 
          isOpen={showQuoteForm}
          onClose={() => {
            setShowQuoteForm(false);
            setSelectedInsuranceCompany(null);
          }}
          company={selectedInsuranceCompany}
        />
      )}

      {showLabBooking && selectedLab && (
        <LabBookingForm 
          isOpen={showLabBooking}
          onClose={() => {
            setShowLabBooking(false);
            setSelectedLab(null);
          }}
          lab={selectedLab}
        />
      )}
      
      <FindNearestCenter 
        isOpen={showFindNearest}
        onClose={() => setShowFindNearest(false)}
      />

    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancer Care Directory</h1>
        <p className="text-gray-600">Find the best cancer hospitals, specialists, diagnostic centers, and insurance providers across India</p>
        <Button 
          onClick={() => setShowFindNearest(true)}
          className="mt-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
        >
          Find Nearest Cancer Center
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search hospitals, doctors, labs..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">All Cities</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Directory Tabs */}
      <Tabs defaultValue="hospitals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hospitals" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Hospitals ({filteredHospitals.length})</span>
          </TabsTrigger>
          <TabsTrigger value="doctors" className="flex items-center space-x-2">
            <UserCheck className="h-4 w-4" />
            <span>Doctors ({filteredDoctors.length})</span>
          </TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center space-x-2">
            <TestTube className="h-4 w-4" />
            <span>Diagnostic Labs ({filteredLabs.length})</span>
          </TabsTrigger>
          <TabsTrigger value="insurance" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Insurance ({filteredInsurance.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hospitals" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} hospital={hospital} />
            ))}
          </div>
          {filteredHospitals.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No hospitals found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="doctors" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          {filteredDoctors.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No doctors found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="labs" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLabs.map((lab) => (
              <Card key={lab.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{lab.name}</CardTitle>
                  <p className="text-sm text-gray-600">{lab.city}, {lab.state}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Badge variant="outline">{lab.lab_type}</Badge>
                      {lab.rating && (
                        <Badge className="ml-2 bg-green-100 text-green-800">
                          ⭐ {lab.rating}
                        </Badge>
                      )}
                    </div>
                    
                    {lab.test_categories && lab.test_categories.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Test Categories:</h4>
                        <div className="flex flex-wrap gap-1">
                          {lab.test_categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      {lab.home_collection && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Home Collection</Badge>
                      )}
                      {lab.online_reports && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">Online Reports</Badge>
                      )}
                    </div>

                    {lab.turnaround_time && (
                      <p className="text-sm text-gray-600">
                        <strong>Turnaround Time:</strong> {lab.turnaround_time}
                      </p>
                    )}
                    
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => handleLabBooking(lab)}
                    >
                      View Tests & Book
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredLabs.length === 0 && (
            <div className="text-center py-12">
              <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No diagnostic labs found matching your criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="insurance" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInsurance.map((company) => (
              <Card key={company.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{company.name}</CardTitle>
                  <p className="text-sm text-gray-600">{company.headquarters}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        {company.rating && (
                          <Badge className="bg-green-100 text-green-800">
                            ⭐ {company.rating}
                          </Badge>
                        )}
                        {company.cancer_coverage && (
                          <Badge className="ml-2 bg-red-100 text-red-800">Cancer Coverage</Badge>
                        )}
                      </div>
                    </div>

                    {company.claim_settlement_ratio && (
                      <p className="text-sm">
                        <strong>Claim Settlement Ratio:</strong> {company.claim_settlement_ratio}%
                      </p>
                    )}

                    {company.cashless_network_size && (
                      <p className="text-sm">
                        <strong>Network Hospitals:</strong> {company.cashless_network_size.toLocaleString()}
                      </p>
                    )}

                    {company.customer_care_number && (
                      <p className="text-sm text-blue-600">
                        <strong>Customer Care:</strong> {company.customer_care_number}
                      </p>
                    )}

                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => handleInsuranceQuote(company)}
                    >
                      View Plans & Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredInsurance.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No insurance companies found matching your criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
    </>
  );
};

export default HospitalsDirectory;
