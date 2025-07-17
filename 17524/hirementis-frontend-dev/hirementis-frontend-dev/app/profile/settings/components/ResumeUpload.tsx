import { useState, useRef } from "react";
import { Upload, FileText, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

interface ResumeUploadProps {
  onFileChange: (file: File | null) => void;
  currentFile?: File | string | null;
  resumeUrl?: string | null | "";
  onResumeRemove: () => void;
}

const ResumeUpload = ({
  onFileChange,
  currentFile,
  resumeUrl,
  onResumeRemove,
}: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileChange(file);
    } else {
      toast.error("Please upload a PDF file only.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileChange(file);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    onResumeRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-4">
      {resumeUrl || currentFile ? (
        // File uploaded state
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {currentFile instanceof File ? currentFile.name : "Resume"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentFile instanceof File
                    ? formatFileSize(currentFile.size) + " • PDF"
                    : "PDF"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link target="_blank" href={resumeUrl || ""} download={true}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    /* In a real app, this would download the file */
                  }}
                  className="rounded-lg"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemoveFile}
                className="rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Upload area
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-green-400 dark:border-teal-400 bg-green-50 dark:bg-teal-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-teal-400 hover:bg-green-50 dark:hover:bg-teal-900/20"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Upload your resume
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Drag and drop your PDF file here, or click to browse
              </p>
            </div>
            <Button
              onClick={handleUploadClick}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-teal-500 dark:to-blue-600 dark:hover:from-teal-600 dark:hover:to-blue-700 rounded-lg"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              PDF files only, up to 10MB
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ResumeUpload;
