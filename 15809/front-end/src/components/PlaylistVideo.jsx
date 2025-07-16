import React, { useEffect, useState } from "react";
import defImg from "../assets/playlist.png";
import { Card, CardContent } from "./ui/card";
import { Share2, X, Dot, PlayCircle, Clock, Eye, Calendar } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetPlaylistById } from "@/Redux";
import { Link, useParams } from "react-router-dom";
import ShareCard from "./ShareCard";
import { getTimeAgo } from "@/utils/formateDate";
import { createPortal } from "react-dom";
import { Skeleton } from "./ui/skeleton";

function PlaylistVideo() {
  const [isOpen, setIsOpen] = useState(false);
  const playlistId = useParams();
  const dispatch = useDispatch();
  const { selectedPlaylist, playlistError, playlistIsLoading } = useSelector(
    (state) => state.playlist
  );

  // Format duration for display
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    dispatch(fetchGetPlaylistById(playlistId?.playlistId));
  }, [dispatch, playlistId]);
  
  const ShareModal = () => {
    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 z-[9999]">
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50" 
          onClick={() => setIsOpen(false)} 
        />
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center min-h-full">
          <div
            className="relative bg-slate-900 w-[90%] max-w-lg mx-6 my-6 p-6 rounded-xl shadow-2xl z-51 border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-white">
                Share Playlist
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-orange-500" />
              </button>
            </div>
            <ShareCard propId={playlistId.playlistId} type="playlist" />
          </div>
        </div>
      </div>,
      document.body
    );
  };
  
  // Loading skeleton
  if (playlistIsLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6 relative min-h-screen">
          {/* Left Side - Skeleton */}
          <div className="lg:w-1/3 lg:sticky lg:top-20 lg:h-fit lg:max-w-[400px]">
            <Card className="h-full border border-slate-700/50 bg-slate-900 shadow-lg">
              <CardContent className="p-0">
                {/* Skeleton Image */}
                <Skeleton className="w-full aspect-video rounded-none bg-slate-800" />
                
                <div className="p-6 space-y-4">
                  {/* Skeleton Title */}
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-9 w-3/4 bg-slate-800" />
                    <Skeleton className="h-9 w-9 rounded-full bg-slate-800" />
                  </div>
                  
                  {/* Skeleton Description */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full bg-slate-800" />
                    <Skeleton className="h-4 w-5/6 bg-slate-800" />
                  </div>
                  
                  {/* Skeleton Stats */}
                  <div className="pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full bg-slate-800" />
                      <Skeleton className="h-3 w-24 bg-slate-800" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full bg-slate-800" />
                      <Skeleton className="h-3 w-16 bg-slate-800" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full bg-slate-800" />
                      <Skeleton className="h-3 w-20 bg-slate-800" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Side - Skeleton Video List */}
          <div className="lg:w-2/3 lg:ml-auto space-y-4 p-2">
            <Skeleton className="h-8 w-48 ml-2 bg-slate-800" />
            
            <div className="space-y-4 mt-3">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="w-full">
                  <div className="w-full rounded-xl overflow-hidden bg-slate-900 shadow-md border border-slate-700/50">
                    <div className="flex md:flex-row w-full flex-col md:h-32">
                      <div className="relative w-full md:w-56 h-48 md:h-32 overflow-hidden">
                        <Skeleton className="absolute inset-0 bg-slate-800" />
                        <div className="absolute top-2 left-2 bg-orange-600/30 rounded px-2 py-1 w-8" />
                        <div className="absolute bottom-2 right-2 bg-black/50 rounded px-2 py-1 w-10" />
                      </div>
                      <div className="flex flex-col justify-between p-4 w-full gap-3">
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-5/6 bg-slate-800" />
                          <Skeleton className="h-4 w-1/3 bg-slate-800" />
                        </div>
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-3 w-16 bg-slate-800" />
                          <div className="h-1 w-1 rounded-full bg-slate-800 hidden md:block" />
                          <Skeleton className="h-3 w-16 bg-slate-800" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (playlistError) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700/50">
          <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Unable to load playlist</h2>
          <p className="text-slate-300">
            There was an error loading this playlist. Please try again later.
          </p>
          <button 
            onClick={() => dispatch(fetchGetPlaylistById(playlistId?.playlistId))}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors font-medium shadow-lg shadow-orange-600/20 hover:shadow-orange-700/30"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!selectedPlaylist || selectedPlaylist.length === 0 || (selectedPlaylist[0]?.videos?.length === 0)) {
    return (
      <div className="container mx-auto p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700/50">
          <div className="w-32 h-32 mx-auto relative">
            <img src={defImg} alt="Empty playlist" className="w-full h-full object-contain opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-800/20 to-orange-600/30 rounded-xl"></div>
          </div>
          <h2 className="text-2xl font-bold text-white">This playlist is empty</h2>
          <p className="text-slate-300">
            There are no videos in this playlist yet.
          </p>
          <Link 
            to="/"
            className="inline-block px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all font-medium shadow-lg shadow-orange-600/20 hover:shadow-orange-700/30 hover:translate-y-[-2px]"
          >
            Browse videos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-6 bg-gradient-to-b from-slate-950 to-slate-950 min-h-screen">
      {/* Render Share Modal */}
      <ShareModal />

      <div className="flex flex-col lg:flex-row gap-6 relative min-h-screen pb-12">
        {/* Left Side - Playlist Info */}
        <div className="lg:w-1/3 lg:sticky lg:top-20 lg:h-fit lg:max-w-[400px]">
          <Card className="overflow-hidden border border-slate-700/50 bg-slate-900 shadow-lg">
            <CardContent className="p-0">
              {/* Playlist Cover Image with Overlay */}
              <div className="w-full aspect-video bg-slate-900 relative group overflow-hidden">
                <img
                  src={selectedPlaylist[0]?.videos[0]?.thumbnail || defImg}
                  alt="Playlist cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent group-hover:via-slate-950/80 transition-colors duration-300">
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="bg-orange-600 rounded-full p-1.5 shadow-lg">
                      <PlayCircle className="text-white w-5 h-5" />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-wide">
                      {selectedPlaylist[0]?.videos?.length || 0} {selectedPlaylist[0]?.videos?.length === 1 ? 'video' : 'videos'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="p-6 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950">
                {/* Title and Actions */}
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-bold text-white line-clamp-2 leading-tight">
                    {selectedPlaylist[0]?.name}
                  </h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsOpen(!isOpen);
                    }}
                    className="p-2.5 hover:bg-orange-900/30 rounded-full transition-all flex-shrink-0 hover:scale-110"
                    title="Share playlist"
                    aria-label="Share playlist"
                  >
                    <Share2
                      size={18}
                      className="text-orange-500 transition-colors"
                    />
                  </button>
                </div>
                
                {/* Description */}
                <p className="text-slate-300 line-clamp-4 text-sm">
                  {selectedPlaylist[0]?.description || "No description provided"}
                </p>
                
                {/* Stats */}
                <div className="mt-5 pt-5 border-t border-slate-700/50 grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="flex items-center gap-2 group">
                    <div className="p-1.5 bg-slate-800/70 rounded-full group-hover:bg-orange-900/30 transition-colors">
                      <Eye className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {selectedPlaylist[0]?.videos?.reduce((acc, video) => acc + (video?.views || 0), 0).toLocaleString()} views
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group">
                    <div className="p-1.5 bg-slate-800/70 rounded-full group-hover:bg-orange-900/30 transition-colors">
                      <Clock className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {selectedPlaylist[0]?.videos?.reduce((acc, video) => acc + (video?.duration || 0), 0) > 0 
                        ? formatDuration(selectedPlaylist[0]?.videos?.reduce((acc, video) => acc + (video?.duration || 0), 0))
                        : "00:00"} total
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group col-span-2">
                    <div className="p-1.5 bg-slate-800/70 rounded-full group-hover:bg-orange-900/30 transition-colors">
                      <Calendar className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      Created {getTimeAgo(selectedPlaylist[0]?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side - Scrollable Video List */}
        <div className="lg:w-2/3 lg:ml-auto space-y-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-bold text-white">
              Videos in this playlist
            </h3>
            <div className="text-sm font-medium text-orange-500 bg-orange-950/50 px-3 py-1 rounded-full">
              {selectedPlaylist[0]?.videos?.length} {selectedPlaylist[0]?.videos?.length === 1 ? 'video' : 'videos'}
            </div>
          </div>
          
          <div className="space-y-4">
            {selectedPlaylist[0]?.videos?.map((video, index) => (
              <div 
                key={video?._id} 
                className="w-full rounded-xl overflow-hidden bg-gradient-to-r from-slate-900 to-slate-950 shadow-md hover:shadow-xl border border-slate-800 transition-all hover:border-orange-600 hover:scale-[1.01]"
              >
                <Link
                  to={`/video/${video?._id}`}
                  className="flex md:flex-row w-full h-fit flex-col md:h-32"
                >
                  {/* Thumbnail with Index */}
                  <div className="relative w-full md:w-56 h-48 md:h-32 min-w-[11rem] md:min-w-[14rem] bg-slate-900 overflow-hidden group">
                    <img
                      src={video?.thumbnail}
                      alt={video?.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute top-2 left-2 bg-orange-600 text-white text-sm px-2 py-0.5 rounded font-medium shadow-md">
                      #{index + 1}
                    </div>
                    {video?.duration && (
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded shadow-sm backdrop-blur-sm">
                        {formatDuration(video?.duration)}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-orange-600/90 rounded-full p-2 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex flex-col justify-between p-4 w-full">
                    <div>
                      <h3 className="font-semibold text-base line-clamp-2 mb-1 text-white group-hover:text-orange-500 transition-colors">
                        {video?.title}
                      </h3>
                      <p className="text-sm text-slate-300 line-clamp-1 font-medium">
                        {video?.owner || "Unknown creator"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3 text-orange-500" />
                        <span>{(video?.views || 0).toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-orange-500" />
                        <span>{getTimeAgo(video?.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {/* Bottom spacing */}
          {selectedPlaylist[0]?.videos?.length > 5 && (
            <div className="pt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
                <p className="text-sm font-medium text-slate-300">
                  End of playlist • {selectedPlaylist[0]?.videos?.length} videos
                </p>
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaylistVideo;
