
import { 
  Search, 
  Stethoscope, 
  Building2, 
  Shield, 
  FileText, 
  Heart,
  ArrowRight,
  CheckCircle 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Search,
      title: 'Early Detection',
      description: 'AI-powered screening tools and risk assessment to catch cancer early when treatment is most effective.',
      features: ['Risk Assessment Quiz', 'Screening Reminders', 'Symptom Checker', 'Prevention Tips'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/cancer-assessment'
    },
    {
      icon: Stethoscope,
      title: 'Find Specialists',
      description: 'Connect with top oncologists and specialists near you. Filter by expertise, location, and availability.',
      features: ['Oncologist Directory', 'Video Consultations', 'Appointment Booking', 'Doctor Ratings'],
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      link: '/hospitals'
    },
    {
      icon: Building2,
      title: 'Hospital Network',
      description: 'Access to 1200+ partner hospitals across India with comprehensive cancer treatment facilities.',
      features: ['Hospital Locator', 'Treatment Packages', 'Facility Comparison', 'Quality Ratings'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: '/hospitals'
    },
    {
      icon: Shield,
      title: 'Insurance Support',
      description: 'Navigate health insurance claims and find the best coverage options for cancer treatment.',
      features: ['Insurance Navigator', 'Claim Assistance', 'Policy Comparison', 'Pre-approval Help'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/hospitals'
    },
    {
      icon: FileText,
      title: 'Government Schemes',
      description: 'Complete guide to Ayushman Bharat and other government healthcare schemes for cancer treatment.',
      features: ['Ayushman Bharat Info', 'Eligibility Check', 'Application Process', 'Scheme Benefits'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/government-schemes'
    },
    {
      icon: Heart,
      title: 'Care Support',
      description: '24/7 emotional support, patient community, and caregiver resources for comprehensive care.',
      features: ['Support Groups', 'Mental Health', 'Nutrition Guidance', 'Family Support'],
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      link: '#support'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="h-4 w-4 mr-2" />
            Comprehensive Cancer Care Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
            Everything You Need,
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
              All in One Platform
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From early detection to post-treatment care, we provide comprehensive support 
            throughout your cancer journey. Our platform connects you with the best 
            resources across India.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <CheckCircle className={`h-4 w-4 ${service.textColor}`} />
                      <span className="text-gray-700 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                {service.link.startsWith('/') ? (
                  <Link to={service.link}>
                    <Button 
                      variant="outline" 
                      className={`w-full border-2 ${service.textColor} hover:${service.bgColor} group-hover:shadow-lg transition-all duration-300`}
                    >
                      Explore {service.title}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="outline" 
                    className={`w-full border-2 ${service.textColor} hover:${service.bgColor} group-hover:shadow-lg transition-all duration-300`}
                    onClick={() => {
                      const element = document.querySelector(service.link);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Explore {service.title}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold font-heading mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of families who trust CancerCompass for their complete cancer care needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cancer-assessment">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl"
                >
                  Get Started Free
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg rounded-xl"
              >
                Talk to Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
