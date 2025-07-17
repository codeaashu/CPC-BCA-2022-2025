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

interface SocialLinksProps {
  socialLinks: {
    twitter: string;
    linkedin: string;
    instagram: string;
    figma: string;
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
      name: "instagram",
      label: "Instagram",
      icon: Instagram,
      placeholder: "https://instagram.com/username",
      color: "text-pink-500",
    },
    {
      name: "figma",
      label: "Figma",
      icon: Figma,
      placeholder: "https://figma.com/@username",
      color: "text-purple-500",
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
