import { useState } from "react";
import { Instagram, Linkedin, Figma } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0.5C5.373 0.5 0 5.873 0 12.5C0 17.913 3.438 22.471 8.207 23.978C8.805 24.088 9.025 23.75 9.025 23.459C9.025 23.197 9.015 22.401 9.01 21.309C5.672 21.982 4.968 19.869 4.968 19.869C4.437 18.495 3.662 18.13 3.662 18.13C2.546 17.422 3.749 17.438 3.749 17.438C4.98 17.526 5.64 18.697 5.64 18.697C6.746 20.551 8.52 20.02 9.173 19.735C9.278 18.976 9.582 18.46 9.92 18.154C7.231 17.849 4.39 16.78 4.39 11.954C4.39 10.621 4.873 9.538 5.679 8.692C5.549 8.382 5.123 7.061 5.796 5.307C5.796 5.307 6.814 4.976 9.001 6.417C9.956 6.145 10.98 6.003 12.001 6.002C13.021 6.003 14.045 6.145 15.001 6.417C17.186 4.976 18.202 5.307 18.202 5.307C18.877 7.061 18.45 8.382 18.321 8.692C19.129 9.538 19.61 10.621 19.61 11.954C19.61 16.791 16.765 17.844 14.068 18.144C14.499 18.518 14.882 19.296 14.882 20.48C14.882 22.141 14.867 23.124 14.867 23.459C14.867 23.752 15.083 24.092 15.689 23.974C20.454 22.468 24 17.911 24 12.5C24 5.873 18.627 0.5 12 0.5Z" />
  </svg>
);
interface SocialLinksProps {
  socialLinks: {
    twitter: string;
    linkedin: string;
    instagram: string;
    github: string;
  };
  onSocialLinksChange: (links: any) => void;
}

const SocialLinks = ({
  socialLinks,
  onSocialLinksChange,
}: SocialLinksProps) => {
  const handleLinkChange = (platform: string, value: string) => {
    onSocialLinksChange({
      ...socialLinks,
      [platform]: value,
    });
  };

  const socialPlatforms = [
    {
      name: "twitter",
      label: "Twitter",
      icon: TwitterIcon,
      placeholder: "https://twitter.com/username",
      color: "text-blue-500",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/username",
      color: "text-blue-600",
    },
    {
      name: "github",
      label: "GitHub",
      icon: GitHubIcon,
      placeholder: "https://github.com/username",
      color: "text-gray-800",
    },
    {
      name: "instagram",
      label: "Instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/username",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Add your social profiles to help others connect with you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <div key={platform.name} className="space-y-2">
              <Label
                htmlFor={platform.name}
                className="text-sm font-medium flex items-center gap-2"
              >
                <IconComponent className={`h-4 w-4 ${platform.color}`} />
                {platform.label}
              </Label>
              <Input
                id={platform.name}
                placeholder={platform.placeholder}
                value={socialLinks[platform.name as keyof typeof socialLinks]}
                onChange={(e) =>
                  handleLinkChange(platform.name, e.target.value)
                }
                className="rounded-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
