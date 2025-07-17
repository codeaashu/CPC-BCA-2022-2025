"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import {
  Edit,
  Download,
  MapPin,
  Calendar,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import SocialLinks from "./SocialLinks";
import Link from "next/link";
import { useUserStore } from "@/hooks/userUser";
import { useRouter } from "next/navigation";
import InterviewHistoryCard from "./interviewhistorycard";

// Twitter icon component since it's not in lucide-react
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ProfileView = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const { user, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/profile");
    }

    const fetchProfile = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProfileData(userSnap.data());
      }
    };
    fetchProfile();
  }, [user, isAuthenticated, router]);

  if (!profileData) {
    return <div className="text-black">⏳ Loading...</div>;
  }

  const socialPlatforms = [
    {
      name: "twitter",
      label: "Twitter",
      icon: TwitterIcon,
      color: "text-blue-500",
      emoji: "🐦",
      url: profileData.socialLinks?.twitter || user?.socialLinks?.twitter || "",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      icon: ExternalLink,
      color: "text-blue-600",
      emoji: "💼",
      url:
        profileData.socialLinks?.linkedin || user?.socialLinks?.linkedin || "",
    },
    {
      name: "github",
      label: "GitHub",
      icon: ExternalLink,
      color: "text-gray-800",
      emoji: "💻",
      url: profileData.socialLinks?.github || user?.socialLinks?.github || "",
    },
    {
      name: "instagram",
      label: "Instagram",
      icon: ExternalLink,
      color: "text-pink-500",
      emoji: "📸",
      url:
        profileData.socialLinks?.instagram ||
        user?.socialLinks?.instagram ||
        "",
    },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
      <Card className="shadow-md border rounded-2xl dark:bg-gray-900/50 dark:border-gray-800 border-emerald-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-lg">
                <AvatarImage src={profileData.profilePicture || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-green-100 to-green-200 dark:from-teal-900 dark:to-blue-900 text-green-700 dark:text-teal-300 text-2xl font-semibold">
                  {(profileData.firstName?.[0] ||
  (user?.displayName ? user.displayName.split(" ")[0]?.[0] : "") ||
  "") +
  (profileData.lastName?.[0] ||
    (user?.displayName ? user.displayName.split(" ")[1]?.[0] : "") ||
    "")}

                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    👋{" "}
                    {user?.displayName ||
                      profileData.displayName ||
                      user?.firstName}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    👤 {profileData.pronouns || user?.pronouns || "he/him"}
                  </p>
                </div>
                <Link href={"/profile/settings"} className="flex-shrink-0">
                  <Button
                    variant="outline"
                    className="rounded-lg hover:bg-green-50 dark:hover:bg-teal-900/20 hover:border-green-300 dark:hover:border-teal-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    ✏️ Edit Profile
                  </Button>
                </Link>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {profileData.bio || user?.bio || "No bio provided"}
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                📌{" "}
                {profileData.location ||
                  (user?.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      📌 {profileData.location || user?.location}
                    </div>
                  ))}
                {profileData.website && (
                  <a
                    href={profileData.website || user?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-green-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {/* <span>🌐</span> */}
                    <Globe className="h-4 w-4" />
                    Portfolio
                  </a>
                )}
                {profileData.calendar ||
                  (user?.calendar && (
                    <a
                      href={profileData.calendar || user.calendar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-green-600 dark:hover:text-teal-400 transition-colors"
                    >
                      <span>📅</span>
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Interests Card */}
      <Card className="shadow-md border rounded-2xl border-emerald-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🎯 Skills & Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {(profileData.tags || user?.tags || []).map(
              (tag: string, index: number) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-green-100 hover:bg-green-200 text-green-800 dark:bg-teal-900/50 dark:text-teal-300 dark:hover:bg-teal-900/70 rounded-full px-3 py-1"
                >
                  ⭐ {tag}
                </Badge>
              )
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resume Card */}
      <Card className="shadow-md border rounded-2xl border-emerald-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📄 Resume
          </h2>
          {user?.resume || profileData.resume ? (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <svg
                    className="h-6 w-6 text-red-600 dark:text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    📄 Resume
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg hover:bg-green-50 dark:hover:bg-teal-900/20 hover:border-green-300 dark:hover:border-teal-600"
                asChild
              >
                <a
                  href={
                    typeof profileData.resume || user?.resume === "string"
                      ? profileData.resume || user?.resume
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4 mr-2" />
                  📥 Download
                </a>
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>📭 No resume uploaded yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Links Card */}
      <Card className="shadow-md border rounded-2xl border-emerald-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            🔗 Social Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => {
              const IconComponent = platform.icon;
              const hasLink = platform.url && platform.url.trim() !== "";
              return (
                <div
                  key={platform.name}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <span className="text-lg">{platform.emoji}</span>
                  <IconComponent className={`h-5 w-5 ${platform.color}`} />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {platform.label}
                  </span>
                  {hasLink ? (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-sm text-green-600 dark:text-teal-400 hover:underline"
                    >
                      👀 View Profile
                    </a>
                  ) : (
                    <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
                      ❌ Not connected
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interview History Card */}
      <InterviewHistoryCard />
    </div>
  );
};

export default ProfileView;
