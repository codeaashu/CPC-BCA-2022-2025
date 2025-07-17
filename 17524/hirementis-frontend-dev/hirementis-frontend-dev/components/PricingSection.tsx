import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const PricingSection: React.FC = () => {
  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "forever",
      features: [
        "1 AI mock interviews per month",
        "Basic job roles library",
        "Standard AI feedback",
        "Limited question bank",
      ],
      buttonText: "Start Free",
      buttonVariant: "default" as const,
      popular: true,
      isContactSales: false,
    },
    {
      name: "Student",
      description: "For serious job seekers",
      price: "$7",
      period: "per month",
      features: [
        "Apply to actual Jobs",
        "5 AI mock interviews per month",
        "Full job roles library",
        "Advanced AI feedback",
        "Complete question bank",
        "Progress tracking",
      ],
      buttonText: "Get Pro",
      buttonVariant: "default" as const,
      popular: true,
      isContactSales: false,
    },
    {
      name: "Pro",
      description: "For serious job seekers",
      price: "$13",
      period: "per month",
      features: [
        "Apply to actual Jobs",
        "10 AI mock interviews per month",
        "Full job roles library",
        "Advanced AI feedback",
        "Complete question bank",
        "Progress tracking",
      ],
      buttonText: "Get Pro",
      buttonVariant: "default" as const,
      popular: true,
      isContactSales: false,
    },
    {
      name: "Enterprise (coming soon)",
      description: "For large organizations",
      price: "$99",
      period: "per month",
      features: [
        "50 Candidate interview",
        "Advanced analytics & insights",
        "Custom integrations",
        "White-label solution",
        "Priority support",
        "Training & onboarding",
        "SLA guarantees",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "secondary" as const,
      popular: true,
      isContactSales: true,
    },
  ];

  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core
            features to help you ace your interviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto ">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`border ${
                plan.popular
                  ? "border-emerald-400 shadow-lg scale-105"
                  : "border-gray-200"
              } rounded-xl relative flex flex-col hover:scale-[1.1] transition`}
            >

              <CardHeader className="pt-8 pb-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="pb-4 flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                {plan.isContactSales ? (
                  <a href="mailto:suprabhat.work@gmail.com" className="w-full">
                    <Button
                      variant={plan.buttonVariant}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      {plan.buttonText}
                    </Button>
                  </a>
                ) : (
                  <Link href="/jobs" className="w-full">
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full ${
                        plan.popular
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                          : ""
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;