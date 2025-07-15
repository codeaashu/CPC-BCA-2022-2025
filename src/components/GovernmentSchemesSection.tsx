
import { 
  Shield, 
  Users, 
  Heart, 
  FileText, 
  CheckCircle, 
  Phone, 
  ExternalLink,
  IndianRupee,
  MapPin 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const GovernmentSchemesSection = () => {
  const ayushmanBharathBenefits = [
    'Coverage up to ₹5,00,000 per family per year',
    'Cashless and paperless access to healthcare services',
    'Coverage for secondary and tertiary care hospitalization',
    'Pre and post-hospitalization expenses covered',
    'No restrictions on family size, age or gender',
    'All pre-existing conditions covered from day one',
    'Covers 1,393 procedures including cancer treatments',
    'Portable across all empaneled hospitals in India'
  ];

  const eligibilityCriteria = [
    'Families identified through Socio-Economic Caste Census (SECC) 2011',
    'Rural families with specific deprivation criteria',
    'Urban families in occupational categories of workers',
    'No premium payment required by beneficiary families',
    'Automatic enrollment for eligible families'
  ];

  const cancerTreatmentsCovered = [
    'Chemotherapy and Radiation Therapy',
    'Cancer Surgery including complex procedures',
    'Bone Marrow Transplantation',
    'Follow-up consultations and medications',
    'Diagnostic tests and imaging',
    'Palliative care and pain management',
    'Immunotherapy and targeted therapy',
    'Pre and post-operative care'
  ];

  const howToAvail = [
    {
      step: 1,
      title: 'Check Eligibility',
      description: 'Visit the official website or call helpline to verify if your family is eligible under the scheme.'
    },
    {
      step: 2,
      title: 'Get Ayushman Card',
      description: 'Visit nearest Common Service Centre (CSC) or empaneled hospital with required documents.'
    },
    {
      step: 3,
      title: 'Choose Hospital',
      description: 'Select from 24,000+ empaneled public and private hospitals across India.'
    },
    {
      step: 4,
      title: 'Cashless Treatment',
      description: 'Show your Ayushman Card and receive treatment without any upfront payment.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Shield className="h-4 w-4 mr-2" />
          Government Healthcare Schemes
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
          Ayushman Bharat
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
            Pradhan Mantri Jan Aarogya Yojana
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          World's largest government-funded healthcare program providing free treatment 
          up to ₹5 lakh per family per year to over 50 crore beneficiaries across India.
        </p>
      </div>

      {/* Main Scheme Card */}
      <div className="mb-12">
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Free Healthcare Coverage
            </CardTitle>
            <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-orange-600">
              <IndianRupee className="h-8 w-8" />
              <span>5,00,000</span>
            </div>
            <p className="text-lg text-gray-600">per family per year</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-2">50+ Crore</div>
                <p className="text-gray-600">Beneficiaries Covered</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-2">24,000+</div>
                <p className="text-gray-600">Empaneled Hospitals</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-2">1,393</div>
                <p className="text-gray-600">Medical Procedures</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span>Key Benefits</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ayushmanBharathBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-600" />
              <span>Eligibility Criteria</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eligibilityCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{criteria}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cancer Treatment Coverage */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-red-600" />
            <span>Cancer Treatment Coverage</span>
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Comprehensive cancer care coverage including advanced treatments and procedures
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cancerTreatmentsCovered.map((treatment, index) => (
              <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-gray-800">{treatment}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Avail */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-blue-600" />
            <span>How to Avail Benefits</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToAvail.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Helpline</h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">14555</div>
              <p className="text-sm text-gray-600">Toll-free number for assistance</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Find Hospitals</h3>
              <Button className="bg-green-600 hover:bg-green-700">
                <ExternalLink className="h-4 w-4 mr-2" />
                Hospital Locator
              </Button>
              <p className="text-sm text-gray-600 mt-2">Find empaneled hospitals near you</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              Need Help with Ayushman Bharat?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our team can help you understand eligibility, find hospitals, and navigate the process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Helpline: 14555
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600"
              >
                Check Eligibility
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GovernmentSchemesSection;
