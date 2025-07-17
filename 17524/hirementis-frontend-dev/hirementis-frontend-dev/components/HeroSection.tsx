import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/cards";
import { BarChart3, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge2";
const HeroSection: React.FC = () => {
  return (
    <>
      <section className="bg-hero-gradient min-h-screen flex items-center justify-center section-padding pt-20">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="flex flex-col items-center text-center pb-20 py-16">
            <div className="mb-6 text-xs px-3 py-1 flex items-center justify-center gap-1 bg-emerald-100 rounded-full shadow-md">
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 128 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M64 26C31.7271 47.0162 15.5202 101 64 101C112.48 101 96.2728 47.0162 64 26Z"
                    fill="#FF9601"
                  />
                  <path
                    d="M64.0001 96C38.5001 96 56.5001 64 64.0001 60C71.5 64 89.5001 96 64.0001 96Z"
                    fill="#FFC803"
                  />
                  <path
                    d="M64 96C49.5 96.5 45.3054 82.2617 49.5 74C52.4768 81.7736 65.919 88.6666 64 96Z"
                    fill="#FFC803"
                  />
                  <path
                    d="M69.1942 95.071C83.2743 91.5711 79.7736 78.7209 75.9297 68.4508C71.952 75.7088 65.3357 88.5461 69.1942 95.071Z"
                    fill="#FFC803"
                  />
                </svg>
              </span>
              <p className="text-sm text-emerald-700">
                Practice. Improve. Crack It.
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ace Your Next Interview with{" "}
              <span className="gradient-text">AI-Powered Practice</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Prepare for any job interview with personalized AI feedback,
              realistic mock interviews, and expert curated questions tailored
              to your industry.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-8"
                >
                  Start Practicing Free
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:text-emerald-700 hover:bg-emerald-50"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="flex -space-x-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                  JD
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                  SM
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                  KT
                </div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
                  +97
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Trusted by <span className="font-semibold">100+</span> job
                seekers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pt-12 pb-32 relative">

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-center">
            <div className="relative">
              <Card className="glass rounded-3xl border-primary/20 border !p-0 overflow-hidden  shadow-2xl">
                <CardContent className="p-0">
                  <div className="aspect-video bg-center bg-cover bg-[url('/videocalling.png')] flex items-center justify-center relative overflow-hidden"></div>
                </CardContent>
              </Card>

              {/* Floating Analytics Card */}
              <div className="absolute -right-8 -bottom-8 animate-float ">
               <Card className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-3xl border-0 shadow-2xl">

                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm opacity-80">
                        Interview Quality
                      </div>
                      <div className="text-3xl font-primary font-bold">98%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Badge className=" rounded-full px-4 py-2 mb-6 border-primary/10 text-primary text-lg bg-primary/20">
                  <TrendingUp className="w-4 h-4 mr-2 " />
                  <span className="text-primary">Growing Community</span>
                </Badge>

                <h2 className="text-5xl font-primary font-bold mb-4">
                  Active interviews and assessments
                </h2>

                <div className="text-8xl font-primary font-bold text-primary mb-6 relative">
                  100+
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-chart-2/10 rounded-2xl blur opacity-50 animate-pulse-slow"></div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg">
                  The number of AI-powered interviews conducted monthly
                  continues to grow exponentially, making RecruitAI the leading
                  choice for intelligent hiring solutions.
                </p>
              </div>
              {/* Mini Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass rounded-2xl border-primary/20 border bg-primary/10 p-6 text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-primary font-bold text-primary mb-2">
                    75%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Time Saved
                  </div>
                </Card>
                <Card className="glass rounded-2xl border-green-500/20 border bg-green-500/10 p-6 text-center group hover:scale-105 transition-all duration-300">
                  <div className="text-3xl font-primary font-bold text-chart-2 mb-2">
                    60%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cost Reduction
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
