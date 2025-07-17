'use client';

import { useEffect, useState } from "react";
import CTASection from "@/components/CTASection";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import FullScreenLoader from "@/components/FullScreenLoader";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (e.g. fetching data)
    const timer = setTimeout(() => {
      setIsLoading(false); // stop loading after 2 seconds
    }, 2500);

    return () => clearTimeout(timer); // clean up
  }, []);


  return (
    <div className="min-h-screen">
      <FullScreenLoader isLoading={isLoading} text="Loading your data..."/>
      <HeroSection />
      <HowItWorks />
      <FeatureSection />
      <PricingSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
