import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function JobNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="mb-6">
          The job you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/jobs">
          <Button variant="outline">Back to Jobs</Button>
        </Link>
      </div>
    </div>
  );
}

export default JobNotFound;
