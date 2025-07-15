import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorHeader from '@/components/DoctorHeader';
import Footer from '@/components/Footer';
import DoctorProfile from '@/components/DoctorProfile';
import { useDoctorAuth } from '@/contexts/DoctorAuthContext';

const DoctorProfilePage = () => {
  const { user, loading } = useDoctorAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/doctor/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DoctorHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Profile</h1>
            <p className="text-gray-600">Manage your professional information and settings</p>
          </div>
          <DoctorProfile />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorProfilePage;