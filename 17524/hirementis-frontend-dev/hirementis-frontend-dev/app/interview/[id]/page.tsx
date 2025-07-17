"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { jobs } from "@/data/jobs";
import {
  Camera,
  CameraOff,
  CircleUserRound,
  Mic,
  MicOff,
  X,
  Info,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import JobNotFound from "./components/JobNotFound";
import axios from "axios";
// import Vapi from "@vapi-ai/web";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/utils/vapi/prompt";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { auth } from "@/firebase/client";
import { onAuthStateChanged, User } from "firebase/auth";
import Image from "next/image";
import ConfirmationDialog from "./components/ConfiramtionDialog";
import { useUserStore } from "@/hooks/userUser";
import FullScreenLoader from "@/components/FullScreenLoader";

interface LoaderState {
  state: boolean;
  message?: string;
}

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const InstructionsPopup = ({
  isOpen,
  onClose,
  job,
}: {
  isOpen: boolean;
  onClose: () => void;
  job: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Interview Instructions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <h3 className="font-semibold text-emerald-800 mb-2">
              Interview Details
            </h3>
            <p className="text-emerald-700">
              Position: <strong>{job.title}</strong> at{" "}
              <strong>{job.company}</strong>
            </p>
            <p className="text-emerald-700">Industry: {job.industry}</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3">
              Before You Start:
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-yellow-700">
              <li>Test your microphone and camera functionality</li>
              <li>
                Find a quiet, well-lit space with stable internet connection
              </li>
              <li>Have your resume and job description readily available</li>
              <li>Prepare examples of your key achievements and experiences</li>
              <li>Research the company and role thoroughly</li>
            </ol>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              During the Interview:
            </h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li>
                Ensure your device microphone and camera are working properly
                for clear audio and video quality.
              </li>
              <li>
                Speak clearly and at a moderate pace, maintaining good eye
                contact with the camera.
              </li>
              <li>
                Position yourself in a well-lit, quiet environment with minimal
                background distractions.
              </li>
              <li>
                Have a glass of water nearby and take brief pauses if needed to
                collect your thoughts.
              </li>
              <li>
                Listen carefully to each question and take a moment to think
                before responding.
              </li>
              <li>
                Structure your answers using the STAR method (Situation, Task,
                Action, Result) for behavioral questions.
              </li>
              <li>
                Emphasize skills and experiences directly relevant to the{" "}
                {job.title} role and {job.industry} industry.
              </li>
              <li>
                Ask thoughtful questions about the company culture, team
                dynamics, and growth opportunities.
              </li>
              <li>
                Maintain professional body language and dress appropriately for
                the role.
              </li>
              <li>
                If you don't understand a question, politely ask for
                clarification rather than guessing.
              </li>
              <li>
                End each answer with confidence and be prepared to elaborate if
                asked follow-up questions.
              </li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Remember:</strong> This is a practice session. Use it to
              refine your responses and build confidence for your actual
              interview.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-center space-x-3">
              <p className="text-gray-700 font-medium">
                All the best for your Interview.
                <span className="text-gray-500 font-normal ml-2">
                  by Team HireMentis
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <Button
            onClick={onClose}
            className="bg-emerald-500 hover:bg-emerald-600 px-8"
          >
            Got it, Let's Start!
          </Button>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  // const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<LoaderState>({
    state: false,
    message: "Setting up interview...",
  });
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [interviewId, setInterviewId] = useState<string | null>();
  const [user, setUser] = useState<User | null>(null);
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(20 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const { user: userState } = useUserStore();
  const router = useRouter();

  const params = useParams();
  const id = params?.id;
  if (!id) {
    redirect("/jobs");
  }
  const jobId = Number(id);
  const job = jobs.find((job) => job.id === jobId);

  if (!job) {
    return <JobNotFound />;
  }

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      setMicActive(true);
    };

    const onCallEnd = async () => {
      setCallStatus(CallStatus.FINISHED);
      toast.message("Interview ended");
      // await endInterview();
    };

    const onMessage = (message: any) => {
      if (message.type == "transcript" && message.transcriptType == "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      setCallStatus(CallStatus.ACTIVE);
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (err: any) => {
      toast.info(err?.err?.msg || "Interview ended");
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const setupInterview = async () => {
    setLoading({ state: true, message: "Setting up interview..." });
    try {
      const body = {
        question_amonut: 5,
        title: job.title,
        level: job.level,
        type: job.type,
        company: job.company,
        industry: job.industry,
        description: job.description,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
      };
      const result = await axios.post("/api/generate-question", body);
      setLoading({ state: false });
      if (result.data?.success) {
        setInterviewQuestions(result.data?.questions);
        return result.data?.questions;
      }
    } catch (error) {
      setLoading({ state: false });
    }
  };

  const startInterview = async () => {
    if (!micActive) {
      toast.error("Microphone permission required.");
      return;
    }
    setInterviewId(() => nanoid());
    const questions = await setupInterview();
    setInterviewQuestions(questions);
    setLoading({
      state: true,
      message: "Reva is getting ready to take your interview..",
    });

    // const VAPI_ASSISTANT_ID = "f439b0a7-16b6-456b-928a-3fce50bd4138";


    // backup assistant id
    const VAPI_ASSISTANT_ID = "ca8f5e24-d3ed-4d85-bf84-acbb119e0f6d";


    // const interviewQs = questions.map((item: string) => `- ${item}`).join("\n");
    const interviewQs = (questions || []).map((item: string) => `- ${item}`).join("\n");


    await vapi.start(VAPI_ASSISTANT_ID, {
      ...interviewer,
      variableValues: {
        questions: interviewQs,
        job_desc: job.description || "",
        job_title: job.title || "",
        job_company: job.company || "",
        job_location: job.location || "",
        job_type: job.type || "",
        job_level: job.level || "",
        job_industry: job.industry || "",
        userName: user?.displayName || "",
      },
    });
    setLoading({ state: false });
    setIsInterviewStarted(true);
    setTimerActive(true);
  };

  async function endInterview() {
    setIsInterviewStarted(false);
    setTimerActive(false);
    vapi.stop();
    setLoading({
      state: true,
      message: "Generating feedback for you...",
    });
    const currentUser = auth.currentUser;
    try {
      const result = await axios.post("/api/generate-feedback", {
        transcript: messages,
        job,
        interviewQs: interviewQuestions,
        interviewId,
        userId: currentUser?.uid || user?.uid,
        userName:
          user?.displayName ||
          userState?.displayName ||
          userState?.firstName ||
          "",
      });
      setLoading({
        state: true,
        message: "It will take just 1 or 2 minutes more..",
      });

      if (result.data.success) {
        setLoading({ state: false });
        router.push(`/feedback/${interviewId}`);
      }
    } catch (error) {
      console.error("Error while generating feedback", error);
      router.push(`/jobs`);
      toast.info("Too short interview", {
        description: "Please give minimum of 5 minutes interview",
      });
      setLoading({ state: false });
    }
  }

  useEffect(() => {
    const setupCamera = async () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
        videoStreamRef.current = null;
      }

      if (!cameraActive) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraActive(false);
      }
    };

    setupCamera();

    return () => {
      if (videoStreamRef.current) {
        videoStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.emailVerified) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const setupMic = async () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
        audioStreamRef.current = null;
      }

      if (!micActive) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: micActive,
        });
        audioStreamRef.current = stream;

        if (audioStreamRef.current.active) {
          setMicActive(true);
        }
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setMicActive(false);
      }
    };

    setupMic();

    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [micActive]);

  const toggleMic = () => {
    setMicActive(!micActive);
    if (isInterviewStarted) {
      vapi.setMuted(micActive);
    }
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === "assistant") {
      if (
        lastMessage.content.includes("end the interview") ||
        lastMessage.content.includes("end the session")
      ) {
        setShowConfirmationDialog(true);
      }
    }
  }, [messages]);

  async function handleEndInterview() {
    setShowConfirmationDialog(false);
    await vapi.send({
      type: "add-message",
      message: {
        role: "system",
        content: "The interview has ended.",
      },
    });
    endInterview();
    console.log("Ending interview...");
  }

  function handleCancel() {
    setShowConfirmationDialog(false);
    vapi.say("Let's continue the interview.", false);
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            toast.message("Interview time completed!");
            vapi.say(
              "That's the end of your 20-minute interview. Thank you for your time. We'll get back to you with feedback soon.",
              true
            );
            clearInterval(interval);
            endInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return loading.state ? (
    <FullScreenLoader isLoading={loading.state} text={loading.message} />
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-blue-50/30 to-white">
      <InstructionsPopup
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        job={job}
      />

      <div>
        <ConfirmationDialog
          open={showConfirmationDialog}
          message="Are you sure you want to end the interview?"
          onSubmit={handleEndInterview}
          onCancel={handleCancel}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <Link
                href={`/jobs/${job.id}`}
                className="text-emerald-600 hover:underline flex items-center mb-2 text-sm font-medium transition-colors"
              >
                ← back to jobs
              </Link>
              <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                  Interview Practice
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  {job.title} at {job.company}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {timerActive && (
                <div className="text-base sm:text-lg font-mono font-bold text-emerald-600 bg-emerald-50 px-3 sm:px-4 py-2 rounded-lg border border-emerald-200 shadow-sm">
                  {formatTime(timeRemaining)}
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => setShowInstructions(true)}
                className="flex items-center gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-sm sm:text-base"
              >
                view instructions
              </Button>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <Card className="border border-emerald-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div>
                      <h2 className="font-semibold text-base sm:text-lg text-gray-900">
                        {job.title}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:ml-auto">
                    <span className="px-2 sm:px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs sm:text-sm font-medium">
                      {job.type}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium">
                      {job.level}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
                      {job.industry}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="w-full">
          <Card className="shadow-xl border border-emerald-100 overflow-hidden bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="flex-1 flex flex-col items-center justify-center border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-emerald-50 to-white shadow-sm min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
                  <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 mb-1">
                      Reva (AI)
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-600 font-medium">
                      AI Interviewer
                    </p>
                  </div>

                  <div className="flex items-center justify-center relative">
                    {isSpeaking && (
                      <>
                        <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-emerald-400 opacity-20 animate-ping"></div>
                        <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-emerald-400 opacity-40 animate-ping animation-delay-75"></div>
                      </>
                    )}
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full bg-emerald-50 flex items-center justify-center border-2 border-emerald-200 shadow-lg overflow-hidden">
                      <Image
                        src="/Reva_profile.png"
                        alt="Reva AI Avatar"
                        width={144}
                        height={144}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6 flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isSpeaking
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="text-xs sm:text-sm text-gray-600">
                      {isSpeaking ? "Speaking..." : ""}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-white shadow-sm min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
                  {cameraActive ? (
                    <div className="w-full h-full min-h-[200px] sm:min-h-[250px] lg:min-h-[350px] rounded-xl overflow-hidden shadow-inner">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-800 mb-1">
                          {userState?.firstName || user?.displayName || "You"}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-medium">
                          Candidate
                        </p>
                      </div>

                      <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 shadow-inner overflow-hidden">
                        {userState?.profilePicture || user?.photoURL ? (
                          <Image
                            src={
                              userState?.profilePicture || user?.photoURL || ""
                            }
                            alt={
                              userState?.displayName ||
                              user?.displayName ||
                              "You"
                            }
                            width={144}
                            height={144}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <CircleUserRound
                            size={
                              window.innerWidth < 640
                                ? "48"
                                : window.innerWidth < 1024
                                ? "56"
                                : "72"
                            }
                            className="text-zinc-500"
                          />
                        )}
                      </div>

                      <div className="mt-4 sm:mt-6 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        <span className="text-xs sm:text-sm text-gray-600">
                          Camera off
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t bg-gradient-to-r from-gray-50 to-emerald-50/30 p-4 sm:p-6 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 items-center">
              {/* Control buttons */}
              <div className="flex gap-4 sm:gap-6 items-center">
                <Button
                  className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 ${
                    micActive
                      ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-600 shadow-lg"
                      : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  }`}
                  onClick={toggleMic}
                >
                  {micActive ? (
                    <Mic size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <MicOff size={18} className="sm:w-5 sm:h-5" />
                  )}
                </Button>

                <Button
                  className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 transition-all duration-200 ${
                    cameraActive
                      ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-600 shadow-lg"
                      : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  }`}
                  onClick={toggleCamera}
                >
                  {cameraActive ? (
                    <Camera size={18} className="sm:w-5 sm:h-5" />
                  ) : (
                    <CameraOff size={18} className="sm:w-5 sm:h-5" />
                  )}
                </Button>

                {isInterviewStarted || callStatus == "ACTIVE" ? (
                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={endInterview}
                    className="px-6 sm:px-8 bg-red-500 hover:bg-red-600 shadow-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    End Interview
                  </Button>
                ) : (
                  <Button
                    onClick={startInterview}
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600 px-6 sm:px-8 shadow-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    Start Interview
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      micActive ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <span className="hidden sm:inline">
                    Mic {micActive ? "On" : "Off"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      cameraActive ? "bg-green-400" : "bg-red-400"
                    }`}
                  ></div>
                  <span className="hidden sm:inline">
                    Camera {cameraActive ? "On" : "Off"}
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
