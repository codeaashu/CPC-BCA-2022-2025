import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { likedVideoSlice } from "@/Redux";
import { useParams } from "react-router-dom";
import SpringLoader from "./SpringLoader";
import { Heart, ThumbsUp, Loader, HeartCrack } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import EmptyContent from "@/Error/EmptyContent";

const LikedVideo = () => {
  const dispatch = useDispatch();
  const { likeData, isLoading, error } = useSelector((state) => state.like);
  const { videoId } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchLikedVideo = async () => {
      try {
        if (isMounted) {
          dispatch(likedVideoSlice(videoId));
        }
      } catch (error) {
        if (isMounted) {
          return error.message;
        }
      }
    };

    fetchLikedVideo();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header with title */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600/20 p-2.5 rounded-lg">
            <Heart className="h-6 w-6 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">Your Liked Videos</h1>
        </div>
        
        <div className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
          {!isLoading && Array.isArray(likeData?.data) && (
            <>
              <span>{likeData.data.length}</span>
              <span>videos</span>
            </>
          )}
        </div>
      </div>

      {/* Video grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill().map((_, i) => (
            <div key={i} className="bg-slate-900/50 rounded-lg overflow-hidden shadow-lg border border-slate-800/50">
              <div className="aspect-video">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-4">
                <Skeleton className="h-5 w-full mb-3" />
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : Array.isArray(likeData?.data) && likeData.data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likeData.data.map((video) => (
            video ? (
              <div key={video._id} className="transition-all duration-300 hover:-translate-y-1">
                <VideoCard video={video} />
              </div>
            ) : null
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-slate-900/30 border border-dashed border-slate-700 text-center">
          <div className="max-w-md">
            <HeartCrack className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No liked videos yet</h3>
            <p className="text-slate-400 mb-6">Videos you like will appear here for easy access.</p>
            <EmptyContent />
          </div>
        </div>
      )}
    </div>
  );
};

export default LikedVideo;
