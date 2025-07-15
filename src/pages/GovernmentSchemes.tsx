
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GovernmentSchemesSection from '@/components/GovernmentSchemesSection';

const GovernmentSchemes = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <GovernmentSchemesSection />
      </main>
      <Footer />
    </div>
  );
};

export default GovernmentSchemes;
