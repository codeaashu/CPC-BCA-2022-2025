import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="gradient-text">EduPrep-AI</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides a comprehensive interview
            preparation experience tailored to your specific needs and industry
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100 mb-16">
            {/* <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center cursor-pointer group"> */}
            {/* <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Play className="h-10 w-10 text-emerald-600 ml-1" />
              </div> */}
            {/* </div> */}
            <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
              {/* <p className="text-gray-400">Video showcase placeholder</p> */}
              <video controls autoPlay loop muted src={"/intro.mp4"} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-emerald-100">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Select Your Job Role</h3>
                <p className="text-gray-600">
                  Choose from hundreds of job positions and seniority levels to
                  get tailored interview questions
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Practice with AI</h3>
                <p className="text-gray-600">
                  Engage in realistic mock interviews with our AI interviewer
                  that adapts to your responses
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <span className="text-emerald-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Get Detailed Feedback
                </h3>
                <p className="text-gray-600">
                  Receive personalized insights and improvement suggestions
                  after each practice interview
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
