'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface FullScreenLoaderProps {
  isLoading: boolean;
  text?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  backdropColor?: string;
  backdropOpacity?: number;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  isLoading,
  text = "loading...",
  size = "md",
  className,
  primaryColor = "#00D492",
  secondaryColor = "#5EE9B5",
  textColor = "#000",
  backdropColor = "#ECFDF5",
  backdropOpacity = 1,
}) => {
  const getContainerWidth = (textLength: number) => {
    const baseWidth = Math.max(textLength * 8, 80);
    return Math.min(baseWidth, 400);
  };

  const containerWidth = getContainerWidth(text.length);

  const sizeConfig = {
    sm: {
      height: "h-[38px]",
      text: "text-xs",
      barHeight: "h-3",
      barWidth: "w-3",
    },
    md: {
      height: "h-[50px]",
      text: "text-sm",
      barHeight: "h-4",
      barWidth: "w-4",
    },
    lg: {
      height: "h-[62px]",
      text: "text-base",
      barHeight: "h-5",
      barWidth: "w-5",
    },
  };

  const config = sizeConfig[size];
  

  if (!isLoading) return null;

  return (
    <>
      <style jsx>{`
        @keyframes textAnimation {
          0% {
            letter-spacing: 1px;
            transform: translateX(0px);
          }
          40% {
            letter-spacing: 2px;
            transform: translateX(${containerWidth * 0.1}px);
          }
          80% {
            letter-spacing: 1px;
            transform: translateX(${containerWidth * 0.15}px);
          }
          90% {
            letter-spacing: 2px;
            transform: translateX(0px);
          }
          100% {
            letter-spacing: 1px;
            transform: translateX(0px);
          }
        }

        @keyframes loadingAnimation {
          0% {
            width: 16px;
            transform: translateX(0px);
          }
          40% {
            width: 100%;
            transform: translateX(0px);
          }
          80% {
            width: 16px;
            transform: translateX(${containerWidth - 16}px);
          }
          90% {
            width: 100%;
            transform: translateX(0px);
          }
          100% {
            width: 16px;
            transform: translateX(0px);
          }
        }

        @keyframes loading2Animation {
          0% {
            transform: translateX(0px);
            width: 16px;
          }
          40% {
            transform: translateX(0%);
            width: 80%;
          }
          80% {
            width: 100%;
            transform: translateX(0px);
          }
          90% {
            width: 80%;
            transform: translateX(15px);
          }
          100% {
            transform: translateX(0px);
            width: 16px;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        .loader-text {
          animation: textAnimation 3.5s ease both infinite;
        }

        .load-bar {
          animation: loadingAnimation 3.5s ease both infinite;
        }

        .load-bar::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: ${secondaryColor};
          border-radius: inherit;
          animation: loading2Animation 3.5s ease both infinite;
        }

        .overlay {
          animation: fadeIn 0.3s ease-in;
        }

        .loader-container {
          width: ${containerWidth}px;
        }

        .bounce-text {
          animation: bounce 2s infinite;
        }
      `}</style>

      <div
        className={cn(
          "overlay fixed inset-0 z-50 flex flex-col items-center justify-center px-4",
          className
        )}
        style={{
          backgroundColor: backdropColor,
          opacity: backdropOpacity,
        }}
      >
        <div className="flex flex-col items-center space-y-6">
          {text.toLowerCase().includes("reva") && (
            <div className="bounce-text flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 shadow-lg">
              <span className="text-2xl font-extrabold text-white">H</span>
            </div>
          )}

          <div className={cn("loader-container relative", config.height)}>
            <p
              className={cn(
                "loader-text absolute top-0 left-0 p-0 m-0 tracking-wider text-neutral-900 whitespace-nowrap font-medium",
                config.text
              )}
              style={{ color: textColor }}
            >
              {text}
            </p>
            <span
              className={cn(
                "load-bar absolute bottom-0 block rounded-full",
                config.barHeight,
                config.barWidth
              )}
              style={{
                backgroundColor: primaryColor,
                transform: `translateX(${containerWidth - 16}px)`,
                boxShadow: `0 0 10px ${primaryColor}40`,
              }}
            />
          </div>

          {/* <div className="flex space-x-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor, animationDelay: "0s" }}
            />
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor, animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor, animationDelay: "0.4s" }}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default FullScreenLoader;
