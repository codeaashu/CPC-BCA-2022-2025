"use client";
import InterviewFeedback from "@/pages/InterviewFeedback";
import React from "react";
import { useParams } from "next/navigation";

function page() {
  const params = useParams();
  const id = params?.id;
  return (
    <div className="max-w-7xl mx-auto">
      <InterviewFeedback id={String(id)} />
    </div>
  );
}

export default page;
