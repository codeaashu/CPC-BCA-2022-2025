"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { jobs } from "@/data/jobs";
import { redirect, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebase/client";
import { toast } from "sonner";

const JobDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      redirect("/jobs");
    }
  }, []);

  const jobId = Number(id);

  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-6">
            The job you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/jobs">
            <Button>Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleStartInterview = () => {
    const user = auth.currentUser;
    if (!user || !user.emailVerified) {
      router.push("/login");
    } else {
      setShowKeyPrompt(true);
      setSecretKey("onecupchai");
    }
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretKey === "onecupchai") {
      setShowKeyPrompt(false);
      router.push(`/interview/${job.id}`);
    } else {
      toast.error("Invalid secret key.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        <Link
          href="/jobs"
          className="text-emerald-600 hover:underline flex items-center mb-6 space-x-2"
        >
          <span className="mr-0.5">←</span> Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8 border border-gray-200 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div className="bg-gray-100 w-16 h-16 rounded-md flex items-center justify-center text-xl">
                    {job.company.substring(0, 2)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {job.level}
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                    {job.industry}
                  </span>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Job Description</h2>
                  <p className="text-gray-700">{job.description}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="text-gray-700">
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3">Responsibilities</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-gray-700">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 border border-gray-200 bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Job Summary</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-gray-600">Company</p>
                    <p className="font-medium">{job.company}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Job Type</p>
                    <p className="font-medium">{job.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Experience Level</p>
                    <p className="font-medium">{job.level}</p>
                  </div>
                  {job.salary && (
                    <div>
                      <p className="text-gray-600">Salary Range</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-600">Posted Date</p>
                    <p className="font-medium">
                      {new Date(job.posted).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleStartInterview}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Practice Interview Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Secret Key Popup */}
      {showKeyPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">
                Enter Secret Key
              </h3>
              <p className="mb-2 text-sm text-neutral-500">
                We're currently in beta and access is limited. A secret key is
                required to start the interview. If you don't have one, please
                wait 1–2 weeks until we open access to all users.
              </p>
            </div>
            <form onSubmit={handleKeySubmit} className="space-y-3">
              <input
                type="password"
                className="w-full border rounded px-3 py-2"
                placeholder="Secret Key"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                autoFocus
              />

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowKeyPrompt(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
