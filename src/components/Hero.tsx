
import { ArrowRight, Shield, Users, MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Hero = () => {
  const stats = [
    { number: '50,000+', label: 'Patients Supported', icon: Users },
    { number: '1,200+', label: 'Partner Hospitals', icon: MapPin },
    { number: '24/7', label: 'Care Support', icon: Heart },
    { number: '95%', label: 'Success Rate', icon: Shield },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="h-4 w-4 mr-2" />
                Trusted by 50,000+ families across India
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold font-heading text-gray-900 leading-tight">
                Complete Cancer Care
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  Platform for Bharat
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                From early detection to treatment, insurance to government schemes - 
                everything you need for cancer care, all in one place. Supporting patients 
                and families throughout their journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/cancer-assessment">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg px-8 py-4 rounded-xl group w-full sm:w-auto"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-blue-200 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-xl"
              >
                Find Nearest Center
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Pan-India Coverage</span>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {stats.map((stat, index) => (
              <Card 
                key={stat.label}
                className="floating-card p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-xl mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold font-heading text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Trusted by leading institutions across India</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['AIIMS', 'Tata Memorial', 'Apollo', 'Fortis', 'Max Healthcare', 'Manipal'].map((hospital) => (
              <div key={hospital} className="bg-white px-6 py-3 rounded-lg shadow-sm border">
                <span className="font-medium text-gray-700">{hospital}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
