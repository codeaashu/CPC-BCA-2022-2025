import React from "react";

const SpringLoader = ({ size = "default", color = "orange-600", type = "dots" }) => {
  // Size variants
  const sizeVariants = {
    small: "h-12",
    default: "h-20",
    large: "h-32",
  };

  // Color class based on the passed prop
  const colorClass = `bg-${color}`;
  const textColorClass = `text-${color}`;

  // Loading animations
  const renderLoader = () => {
    switch (type) {
      case "dots":
        return (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className={`${colorClass} rounded-full`}
                style={{ 
                  width: size === "small" ? "0.5rem" : size === "large" ? "1rem" : "0.75rem",
                  height: size === "small" ? "0.5rem" : size === "large" ? "1rem" : "0.75rem",
                  animation: "bounce 1.4s infinite ease-in-out both",
                  animationDelay: `${index * 0.16}s`,
                }}
              />
            ))}
          </div>
        );
      
      case "circle":
        return (
          <div 
            className={`${colorClass} rounded-full`}
            style={{
              width: size === "small" ? "1.5rem" : size === "large" ? "3rem" : "2.25rem",
              height: size === "small" ? "1.5rem" : size === "large" ? "3rem" : "2.25rem",
              animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              opacity: "0.8"
            }}
          />
        );
        
      case "bars":
        return (
          <div className="flex items-end space-x-1">
            {[...Array(5)].map((_, index) => (
              <div 
                key={index} 
                className={`${colorClass} rounded-sm`}
                style={{
                  width: size === "small" ? "0.3rem" : size === "large" ? "0.7rem" : "0.5rem",
                  animation: "bar-grow 1.2s ease-in-out infinite",
                  animationDelay: `${index * 0.15}s`,
                  height: size === "small" ? "1rem" : size === "large" ? "2rem" : "1.5rem",
                }}
              />
            ))}
          </div>
        );
        
      case "text":
        return (
          <div className={`${textColorClass} text-center font-medium`} style={{
            fontSize: size === "small" ? "0.875rem" : size === "large" ? "1.5rem" : "1.125rem",
          }}>
            Loading
            <span className="animate-ellipsis">.</span>
            <span className="animate-ellipsis" style={{ animationDelay: "0.3s" }}>.</span>
            <span className="animate-ellipsis" style={{ animationDelay: "0.6s" }}>.</span>
          </div>
        );
        
      default:
        return (
          <div className="flex space-x-2">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className={`${colorClass} w-3 h-3 rounded-full`}
                style={{ 
                  animation: "bounce 1.4s infinite ease-in-out both",
                  animationDelay: `${index * 0.16}s`,
                }}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: 0.7;
          }
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 0.8;
          }
        }
        
        @keyframes bar-grow {
          0%, 100% {
            transform: scaleY(0.4);
            opacity: 0.6;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        
        .animate-ellipsis {
          animation: ellipsis 1.5s infinite;
          opacity: 0;
        }
        
        @keyframes ellipsis {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
      <div className={`flex items-center justify-center ${sizeVariants[size] || sizeVariants.default}`}>
        {renderLoader()}
      </div>
    </>
  );
};

export default SpringLoader;