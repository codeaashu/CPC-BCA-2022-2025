import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  loading: boolean;
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loader({
  loading,
  message,
  fullScreen = true,
  className,
}: LoaderProps) {
  if (!loading) return null;

  const containerClasses = cn(
    "flex flex-col items-center justify-center gap-2",
    fullScreen ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50" : "p-4",
    className
  );

  return (
    <div className={containerClasses}>
      <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      {message && (
        <p className="text-sm text-center font-medium text-zinc-500">
          {message}
        </p>
      )}
    </div>
  );
}
