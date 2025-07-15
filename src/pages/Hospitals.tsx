
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HospitalsDirectory from '@/components/HospitalsDirectory';
import { useAuth } from '@/contexts/AuthContext';

const Hospitals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HospitalsDirectory />
      </main>
      <Footer />
    </div>
  );
};

export default Hospitals;
