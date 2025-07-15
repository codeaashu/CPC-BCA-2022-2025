
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      links: [
        'Early Detection',
        'Find Doctors',
        'Hospital Network',
        'Insurance Support',
        'Government Schemes',
        'Care Support'
      ]
    },
    {
      title: 'Resources',
      links: [
        'Cancer Types',
        'Treatment Options',
        'Support Groups',
        'Educational Content',
        'Success Stories',
        'Research Updates'
      ]
    },
    {
      title: 'Support',
      links: [
        'Help Center',
        'Contact Us',
        'Emergency Helpline',
        'Live Chat',
        'Community Forum',
        'Feedback'
      ]
    },
    {
      title: 'Company',
      links: [
        'About Us',
        'Our Mission',
        'Partners',
        'Careers',
        'Press',
        'Privacy Policy'
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2 rounded-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading">
                  Cancer<span className="text-blue-400">Compass</span>
                </h1>
                <p className="text-xs text-gray-400">Comprehensive Care for Bharat</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering cancer patients and families across India with comprehensive care, 
              support, and resources throughout their journey.
            </p>
            
            {/* Emergency Contact */}
            <div className="bg-red-600 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="h-4 w-4" />
                <span className="font-semibold">Emergency Helpline</span>
              </div>
              <p className="text-xl font-bold">1800-XXX-XXXX</p>
              <p className="text-sm opacity-90">24/7 Support Available</p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <button 
                  key={index}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold font-heading mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Call Us</p>
                <p className="text-gray-400">+91-XXXX-XXXXXX</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-teal-600 p-3 rounded-lg">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-gray-400">support@cancercompass.in</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 p-3 rounded-lg">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Headquarters</p>
                <p className="text-gray-400">New Delhi, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 mt-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold font-heading mb-4">
              Stay Updated with Latest Cancer Care Information
            </h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Get the latest updates on cancer prevention, treatment advances, and support resources 
              delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 CancerCompass. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
