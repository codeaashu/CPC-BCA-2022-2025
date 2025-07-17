import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { jobs } from "@/data/jobs";

const Jobs = () => {
  const fresherJobs = jobs.filter((job) => job.isFresher || job.level === "Entry");
  const experiencedJobs = jobs.filter((job) => !fresherJobs.includes(job));

  const renderJobCards = (jobList: typeof jobs) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobList.map((job) => (
        <Link key={job.id} href={`/jobs/${job.id}`}>
          <Card className="h-full hover:shadow-lg transition-shadow border border-gray-100 hover:border-gray-200 bg-white">
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="font-bold text-xl mb-1">{job.title}</h2>
                  <p className="text-emerald-600 font-medium">{job.company}</p>
                </div>
                <div className="bg-gray-100 w-10 h-10 rounded-md flex items-center justify-center text-sm">
                  {job.company.substring(0, 2)}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 line-clamp-2">{job.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
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

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{job.location}</span>
                <span>Posted: {new Date(job.posted).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-24">
        {/* Experienced Jobs */}
        <div className="w-full bg-green-50 border-b border-green-200 text-neutral-500 py-3 mb-4">
          <p className="text-black-800 text-sm font-medium">
            Note :- These are the dummy jobs created by Team EduPrep-AI for Your Practice.
          </p>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2 bg-red-50">Available Jobs For Specific Roles</h1>
          <p className="text-gray-600">Explore job opportunities and prepare for your interviews</p>
        </div>

        {renderJobCards(experiencedJobs)}
      </div>

      {/* Freshers Jobs */}
      <div className="container mx-auto px-4 py-24">
        <div className="w-full bg-green-50 border-b border-green-200 text-neutral-500 py-3 mb-4">
          <p className="text-black-800 text-sm font-medium">
            Note :- These are the Freshers jobs created by Team EduPrep-AI for Your Practice Based on recent Hirings.
          </p>
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2 bg-yellow-50">Available Jobs For Freshers</h1>
          <p className="text-gray-600">Explore job opportunities and prepare for your interviews</p>
        </div>

        {renderJobCards(fresherJobs)}
      </div>
    </div>
  );
};

export default Jobs;
