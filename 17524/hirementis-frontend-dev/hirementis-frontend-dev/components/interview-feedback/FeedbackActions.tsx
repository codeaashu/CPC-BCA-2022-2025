"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share2, ClipboardCheck } from "lucide-react";
import { formatFirebaseTimestamp } from "@/utils/formatDate";
import { toast } from "sonner";

interface FeedbackActionsProps {
  id: string | undefined;
  createdAt?: string | number | Date;
}

const FeedbackActions: React.FC<FeedbackActionsProps> = ({ id, createdAt }) => {
  const [copied, setCopied] = useState(false);

  const feedbackLink = `${process.env.NEXT_PUBLIC_SITE_URL || "https://interviewprep.ai"}/feedback/${id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(feedbackLink);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error("Failed to copy the link.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-6">
      <div className="text-sm text-gray-600">
        Interview date: {formatFirebaseTimestamp(createdAt)}
      </div>

      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="border-emerald-200 hover:bg-emerald-50"
            >
              <Share2 className="w-4 h-4 mr-2" /> Share Feedback
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Your Interview Feedback</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">
                Copy this link to share your interview feedback with others:
              </p>
              <div className="flex items-center">
                <input
                  readOnly
                  value={feedbackLink}
                  className="flex-1 p-2 text-sm border rounded-l-md focus:outline-none"
                />
                <Button
                  onClick={handleCopy}
                  className="rounded-l-none bg-emerald-500 text-white hover:bg-emerald-600"
                >
                  {copied ? <ClipboardCheck className="w-4 h-4" /> : "Copy"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FeedbackActions;
