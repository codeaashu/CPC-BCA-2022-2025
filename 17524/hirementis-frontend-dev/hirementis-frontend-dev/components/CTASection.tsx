import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to{" "}
            <span className="gradient-text">Ace Your Next Interview?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful job seekers who have transformed their
            interview skills with HireMentis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-gray-500">
            No credit card required. Try now.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
