import { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/react-avatar";
import { Button } from "@/components/ui/button";

interface ProfilePictureUploadProps {
  onImageChange: (file: File | null) => void;
  defaultImage?: string | null;
}

const ProfilePictureUpload = ({
  onImageChange,
  defaultImage,
}: ProfilePictureUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    String(defaultImage) || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onImageChange(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg">
          <AvatarImage src={previewUrl || undefined} />
          <AvatarFallback className="bg-gradient-to-br from-green-100 to-green-200 dark:from-teal-900 dark:to-blue-900 text-green-700 dark:text-teal-300 text-lg font-semibold">
            <Camera className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Camera className="h-6 w-6 text-white" />
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleUploadClick}
        className="rounded-lg hover:bg-green-50 dark:hover:bg-teal-900/20 hover:border-green-300 dark:hover:border-teal-600"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload Photo
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePictureUpload;
