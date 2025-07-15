import { useState } from 'react';
import { Menu, X, Heart, Phone, MapPin, LogOut, Stethoscope, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDoctorAuth } from '@/contexts/DoctorAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DoctorHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useDoctorAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/doctor/auth');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      {/* Top bar with emergency contact */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Doctor Support: 1800-XXX-XXXX</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Stethoscope className="h-4 w-4" />
                <span>Medical Professional Portal</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Serving cancer patients across Bharat 🇮🇳</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/doctor/dashboard" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-green-600 to-teal-600 p-2 rounded-xl">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading text-gray-900">
                Cancer<span className="text-green-600">Compass</span>
              </h1>
              <p className="text-xs text-gray-600">Doctor Portal</p>
            </div>
          </Link>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="animate-pulse bg-gray-200 h-10 w-24 rounded"></div>
            ) : user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="border-green-200 text-green-600 hover:bg-green-50"
                    >
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Doctor Profile
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/doctor/dashboard')}>
                      <Stethoscope className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/doctor/profile')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Manage Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                  Emergency Support
                </Button>
              </>
            ) : (
              <>
                <Link to="/doctor/auth">
                  <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                    Doctor Login
                  </Button>
                </Link>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                  Emergency Support
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in-up">
            <div className="flex flex-col space-y-2">
              {user ? (
                <>
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-600"
                    onClick={() => {
                      navigate('/doctor/dashboard');
                      setIsMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-green-200 text-green-600"
                    onClick={() => {
                      navigate('/doctor/profile');
                      setIsMenuOpen(false);
                    }}
                  >
                    Profile
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/doctor/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-green-200 text-green-600">
                    Doctor Login
                  </Button>
                </Link>
              )}
              <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                Emergency Support
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DoctorHeader;