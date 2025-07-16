import React, { useEffect, useState } from "react";
import { getCachedImage, cacheImage } from "@/utils/imageCache";

const CachedImage = ({
  src,
  alt,
  cacheKey,
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Generate a key if not provided
    const key =
      cacheKey ||
      (typeof src === "string"
        ? src.split("/").pop().split(".")[0]
        : "img");

    const loadImage = async () => {
      try {
        // First check if we have a cached version
        const cachedSrc = getCachedImage(key);

        if (cachedSrc) {
          console.log("Using cached image for:", key);
          setImgSrc(cachedSrc);
          setIsLoading(false);
          if (onLoad) onLoad();
          return;
        }

        // No cached version, use the original source
        setImgSrc(src);

        // Try to cache it for next time
        if (typeof src === "string" || src instanceof URL) {
          cacheImage(key, src).catch((err) => {
            console.warn("Failed to cache image:", err);
          });
        }
      } catch (err) {
        console.error("Error loading image:", err);
        setError(true);
        if (onError) onError(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src, cacheKey, onLoad, onError]);

  const handleImgError = (e) => {
    console.error("Image loading error:", e);
    setError(true);
    if (onError) onError(e);
  };

  const handleImgLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  if (isLoading) {
    return (
      <div className={`${className || ""} bg-gray-200 animate-pulse`} {...props} />
    );
  }

  if (error) {
    return (
      <div
        className={`${className || ""} bg-gray-100 flex items-center justify-center`}
        {...props}
      >
        <span className="text-sm text-gray-400">Image not available</span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleImgError}
      onLoad={handleImgLoad}
      {...props}
    />
  );
};

export default CachedImage;
