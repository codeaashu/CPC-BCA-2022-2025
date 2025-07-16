import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
  SkipBack,
  SkipForward,
  Settings,
  Heart,
  Share,
  Bookmark,
  ChevronDown,
  ChevronLeft,
  Ellipsis,
  EllipsisVertical,
  X,
  Dot,
} from "lucide-react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchVideoById } from "@/Redux/Slices/Video";
import { fetchAddVideoOnPlaylist } from "@/Redux/Slices/Playlist";
import { showErrorToast } from "@/Notification/Toast";
import SpringLoader from "./SpringLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  fetchSubscribedChannels,
  fetchToggleSubscription,
  fetchUserDetail,
  likedVideoSlice,
  likeToggleSlice,
} from "@/Redux";
import ShareCard from "./ShareCard";
import { getRandomColor } from "@/utils/getRandomColor";
import { formatDate, getTimeAgo } from "@/utils/formateDate";
import { useDebounceClick } from "@/Hooks/useDebounceClick";
import AddToPlaylist from "./AddToPlaylist";

const VideoPlayer = () => {
  // Custom CSS for skeleton animation
  const shimmerStyle = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 1.5s infinite;
      background: linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.07) 50%,
        rgba(255,255,255,0) 100%
      );
      background-size: 200% 100%;
    }
    @keyframes glow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 0.8; }
    }
    .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }
  `;
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [displayTrigger, setDisplayTrigger] = useState(false);
  const [isPip, setIsPip] = useState(false);

  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const [isClickedSetting, setIsClickedSetting] = useState(false);
  const [mediaLoader, setMediaLoader] = useState(false);
  const [fallbackColor, setFallbackColor] = useState("");
  const [descriptionToggle, setDescriptionToggle] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

  const { likeData, likeLoading, likeError } = useSelector(
    (state) => state.like
  );

  const { subscribedChannels, subscriptionIsLoading, subscriptionError } =
    useSelector((state) => state.subscription);

  const { userDetail, isLoading } = useSelector((state) => state.user);

  const { videoId } = useParams();
  const dispatch = useDispatch();

  const {
    selectedVideo,
    relatedVideos,
    currentVideoIndex,
    videoLoading,
    videoError,
  } = useSelector((state) => state.video);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoId) {
      if (videoId) {
        dispatch(likedVideoSlice());
        dispatch(fetchVideoById(videoId));
      }
      if (userDetail?._id) {
        dispatch(fetchSubscribedChannels(userDetail?._id));
      }
    }
  }, [dispatch, videoId]);

  useEffect(() => {
    setFallbackColor(getRandomColor());
  }, []);

  const onDescToggle = () => {
    setDescriptionToggle(!descriptionToggle);
  };

  const handleProgress = (state) => {
    setProgress(state.playedSeconds);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMuteHandler = () => {
    setIsMuted(!isMuted);
  };

  const handleFullScreen = (e) => {
    e.preventDefault();

    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen();
        setIsFullScreen(true);
      } else {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const settingClickHandler = () => {
    setIsClickedSetting(!isClickedSetting);
  };

  const pipHandler = () => {
    setIsPip(!isPip);
  };

  const toggleSubscription = () => {
    dispatch(fetchToggleSubscription(selectedVideo?.owner?._id)).then(() => {
      if (userDetail?._id) {
        dispatch(fetchSubscribedChannels(userDetail?._id));
      }
    });
  };

  useEffect(() => {
    if (selectedVideo?.owner?._id && subscribedChannels) {
      const isUserSubscribed = subscribedChannels.some(
        (ch) => ch._id === selectedVideo.owner._id
      );
      setIsSubscribed(isUserSubscribed);
    }
  }, [selectedVideo, subscribedChannels]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (progressRef.current) {
      progressRef.current.seekTo(newTime);
    }
  };

  const handleLikeToggle = useDebounceClick(() => {
    if (selectedVideo?._id) {
      dispatch(likeToggleSlice(selectedVideo?._id)).then(() => {
        setIsLiked(!isLiked);
      });
    }
  }, 500);

  useEffect(() => {
    function toggleLike() {
      if (Array.isArray(likeData?.data)) {
        setIsLiked(likeData.data.some((item) => item?._id === videoId));
      }
    }
    toggleLike();
  }, [likeData, videoId]);

  const handleNextVideo = () => {
    if (
      relatedVideos &&
      currentVideoIndex !== undefined &&
      currentVideoIndex < relatedVideos.length - 1
    ) {
      const nextVideo = relatedVideos[currentVideoIndex + 1];
      navigate(`/video/${nextVideo._id}`);
    }
  };

  const handlePrevVideo = () => {
    if (
      relatedVideos &&
      currentVideoIndex !== undefined &&
      currentVideoIndex > 0
    ) {
      const prevVideo = relatedVideos[currentVideoIndex - 1];
      navigate(`/video/${prevVideo._id}`);
    }
  };

  const hasNextVideo =
    relatedVideos &&
    currentVideoIndex !== undefined &&
    currentVideoIndex < relatedVideos.length - 1;
  const hasPrevVideo =
    relatedVideos && currentVideoIndex !== undefined && currentVideoIndex > 0;

  const handleKeyPress = useCallback(
    (e) => {
      console.log(e);
      if (e.key === " " || e.key === "k") {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === "m") {
        e.preventDefault();
        toggleMuteHandler();
      } else if (e.key === "f") {
        e.preventDefault();
        handleFullScreen(e);
      }
    },
    [togglePlayPause, toggleMuteHandler, handleFullScreen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden z-0 px-3 md:px-6 py-6 bg-slate-950 text-white">
      <style jsx>{shimmerStyle}</style>
      {videoLoading ? (
        <div>
          <div className="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shimmer"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-slate-800/80 animate-glow flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-orange-600/20"></div>
              </div>
            </div>
          </div>

          {/* Title skeleton */}
          <div className="h-8 w-full bg-slate-900 rounded-lg mt-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shimmer"></div>
          </div>

          {/* Stats bar skeleton */}
          <div className="flex justify-between mt-4">
            <div className="h-5 w-32 bg-slate-900 rounded-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shimmer"></div>
            </div>
            <div className="flex gap-4">
              <div className="h-8 w-20 bg-slate-900 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shimmer"></div>
              </div>
              <div className="h-8 w-20 bg-slate-900 rounded-md relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-shimmer"></div>
              </div>
            </div>
          </div>

          {/* Channel card skeleton */}
          <div className="mt-6 bg-slate-900 rounded-xl p-4 border border-slate-800/50 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="space-y-2">
                <div className="h-5 w-48 bg-slate-800 rounded-md"></div>
                <div className="h-4 w-24 bg-slate-800 rounded-md"></div>
              </div>
              <div className="ml-auto h-10 w-28 bg-orange-600/20 rounded-full"></div>
            </div>
          </div>

          {/* Description skeleton */}
          <div className="mt-6 bg-slate-900 rounded-xl p-4 border border-slate-800/50 space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-5 w-24 bg-slate-800 rounded-md"></div>
              <div className="h-6 w-6 rounded-full bg-slate-800"></div>
            </div>
            <div className="h-4 w-full bg-slate-800 rounded-md"></div>
            <div className="h-4 w-5/6 bg-slate-800 rounded-md"></div>
            <div className="h-4 w-4/6 bg-slate-800 rounded-md"></div>
          </div>
        </div>
      ) : (
        <div>
          {/* Video Player */}
          <div
            className="relative bg-black aspect-video w-full text-white overflow-hidden rounded-xl border border-slate-800 shadow-xl"
            ref={videoRef}
            role="region"
            aria-label="Video player"
            tabIndex="0"
          >
            <ReactPlayer
              ref={progressRef}
              url={selectedVideo?.videoFile}
              width="100%"
              height="100%"
              playing={isPlaying}
              playsinline={true}
              onProgress={handleProgress}
              volume={volume}
              muted={isMuted}
              pip={isPip}
              onDuration={(duration) => setDuration(duration)}
              onBuffer={() => setMediaLoader(true)}
              onBufferEnd={() => setMediaLoader(false)}
              config={{
                file: {
                  attributes: {
                    controlsList: "nodownload",
                  },
                },
              }}
              className="react-player"
            />

            {/* Loading overlay */}
            {mediaLoader && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-10">
                <SpringLoader type="circle" color="orange-600" size="large" />
              </div>
            )}

            {/* Video controls overlay */}
            <div
              className="absolute inset-0 transition-all duration-500"
              style={{
                opacity: displayTrigger ? 1 : 0,
                background: displayTrigger
                  ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)"
                  : "transparent",
              }}
              onMouseEnter={() => setDisplayTrigger(true)}
              onMouseLeave={() => setDisplayTrigger(false)}
              onTouchStart={() => setDisplayTrigger(!displayTrigger)}
            >
              {/* Play/Pause button in center */}
              <div
                className="absolute inset-0 flex justify-center items-center cursor-pointer"
                onDoubleClick={handleFullScreen}
              >
                {isPlaying ? (
                  <div
                    onClick={togglePlayPause}
                    className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 bg-orange-600/20 backdrop-blur-sm rounded-full transition-transform duration-300 hover:scale-110 border-2 border-white/30"
                  >
                    <Pause className="text-white h-8 w-8 md:h-10 md:w-10 drop-shadow-lg" />
                  </div>
                ) : (
                  <div
                    onClick={togglePlayPause}
                    className="flex items-center justify-center h-16 w-16 md:h-20 md:w-20 bg-orange-600/40 backdrop-blur-sm rounded-full transition-transform duration-300 hover:scale-110 border-2 border-white/30"
                  >
                    <Play className="text-white h-8 w-8 md:h-10 md:w-10 ml-1 drop-shadow-lg" />
                  </div>
                )}
              </div>

              {/* Bottom controls */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                {/* Progress bar container */}
                <div className="relative group w-full mb-2">
                  {/* Thin progress track with thicker hover state */}
                  <div className="h-1 bg-gray-600/40 rounded-full w-full group-hover:h-1.5 transition-all duration-200">
                    {/* Filled part of progress */}
                    <div
                      className="h-full bg-orange-600 rounded-full relative"
                      style={{
                        width: `${(progress / (duration || 100)) * 100}%`,
                      }}
                    >
                      {/* Thumb that appears on hover */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-orange-600 rounded-full scale-0 group-hover:scale-100 transition-transform duration-200 shadow-sm shadow-black/30"></div>
                    </div>
                  </div>

                  {/* Invisible input on top for interaction */}
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={progress}
                    step={0.1}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Control buttons */}
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlayPause}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
                    >
                      {isPlaying ? (
                        <Pause size={18} className="text-white" />
                      ) : (
                        <Play size={18} className="text-white" />
                      )}
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-1 group relative">
                      <button
                        onClick={toggleMuteHandler}
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX size={18} className="text-white" />
                        ) : (
                          <Volume2 size={18} className="text-white" />
                        )}
                      </button>
                      <div className="w-0 overflow-hidden group-hover:w-16 transition-all duration-300 h-6 flex items-center">
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 bg-gray-600/60 rounded-full appearance-none cursor-pointer focus:outline-none"
                          style={{
                            background: `linear-gradient(to right, #f97316 ${
                              (isMuted ? 0 : volume) * 100
                            }%, #4B5563 ${(isMuted ? 0 : volume) * 100}%)`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="text-xs text-white/80 font-medium ml-1">
                      {Math.floor(progress / 60)}:
                      {Math.floor(progress % 60)
                        .toString()
                        .padStart(2, "0")}{" "}
                      / {Math.floor(duration / 60)}:
                      {Math.floor(duration % 60)
                        .toString()
                        .padStart(2, "0")}
                    </div>

                    {/* Skip buttons */}
                    <button
                      onClick={handlePrevVideo}
                      disabled={!hasPrevVideo}
                      className={`p-1.5 rounded-full transition-colors duration-200 ${
                        hasPrevVideo
                          ? "hover:bg-white/10"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <SkipBack size={18} className="text-white" />
                    </button>
                    <button
                      onClick={handleNextVideo}
                      disabled={!hasNextVideo}
                      className={`p-1.5 rounded-full transition-colors duration-200 ${
                        hasNextVideo
                          ? "hover:bg-white/10"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <SkipForward size={18} className="text-white" />
                    </button>
                  </div>

                  {/* Right controls */}
                  <div className="flex gap-1">
                    <button
                      onClick={settingClickHandler}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
                    >
                      {/* Settings button commented out in original code */}
                    </button>
                    <button
                      onClick={pipHandler}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
                    >
                      <PictureInPicture2 size={18} className="text-white" />
                    </button>
                    <button
                      onClick={handleFullScreen}
                      className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200"
                    >
                      {isFullScreen ? (
                        <Minimize size={18} className="text-white" />
                      ) : (
                        <Maximize size={18} className="text-white" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info Section */}
          <div className="mt-6 space-y-6">
            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold px-1 leading-tight text-white">
              {selectedVideo?.title}
            </h1>

            {/* Video stats and actions bar */}
            <div className="flex flex-wrap justify-between items-center gap-3 px-1">
              <div className="flex items-center text-sm text-slate-300">
                <span className="font-medium">
                  {selectedVideo?.views?.toLocaleString() || 0} views
                </span>
                <span className="mx-1.5 text-slate-500">•</span>
                <span>
                  {selectedVideo?.createdAt
                    ? getTimeAgo(selectedVideo.createdAt)
                    : ""}
                </span>
              </div>

              {/* Action buttons - Mobile friendly layout */}
              <div className="flex items-center gap-3 sm:gap-5">
                <button
                  onClick={handleLikeToggle}
                  className="flex items-center gap-1.5 group"
                  disabled={likeLoading}
                >
                  <div className="p-2 rounded-full group-hover:bg-slate-800 transition-colors">
                    {likeLoading ? (
                      <SpringLoader
                        type="dots"
                        color="orange-600"
                        size="small"
                      />
                    ) : (
                      <Heart
                        className={`transition-all ${
                          isLiked
                            ? "fill-orange-500 text-orange-500"
                            : "text-slate-300 group-hover:text-orange-500"
                        }`}
                        size={22}
                      />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isLiked ? "text-orange-500" : "text-slate-300"
                    }`}
                  >
                    {selectedVideo?.likes?.toLocaleString()}
                  </span>
                </button>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsOpen(!isOpen);
                    }}
                    className="flex items-center gap-1.5 group"
                  >
                    <div className="p-2 rounded-full group-hover:bg-slate-800 transition-colors">
                      <Share
                        size={22}
                        className="text-slate-300 group-hover:text-orange-500"
                      />
                    </div>
                    <span className="text-sm font-medium hidden sm:block text-slate-300 group-hover:text-orange-500">
                      Share
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                      }}
                    >
                      <div
                        className="bg-slate-900 rounded-xl shadow-2xl p-5 mx-4 w-full max-w-md border border-slate-800 border-t-orange-600/30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                            <Share size={18} className="text-orange-500" />
                            Share Video
                          </h3>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <ShareCard propId={videoId} type="video" />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsPlaylistModalOpen(true)}
                  className="flex items-center gap-1.5 group"
                >
                  <div className="p-2 rounded-full group-hover:bg-slate-800 transition-colors">
                    <Bookmark
                      size={22}
                      className={`transition-all ${
                        selectedVideo?.isAddedInPlaylist
                          ? "fill-orange-500 text-orange-500"
                          : "text-slate-300 group-hover:text-orange-500"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${
                      selectedVideo?.isAddedInPlaylist
                        ? "text-orange-500"
                        : "text-slate-300 group-hover:text-orange-500"
                    }`}
                  >
                    Save
                  </span>
                </button>

                {isPlaylistModalOpen && (
                  <div
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPlaylistModalOpen(false);
                    }}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="shadow-2xl border border-slate-800 border-t-orange-600/30 rounded-xl overflow-hidden"
                    >
                      <AddToPlaylist
                        videoId={selectedVideo?._id}
                        userId={userDetail?._id}
                        onClose={() => setIsPlaylistModalOpen(false)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Channel info card */}
            <div className="bg-slate-900 rounded-xl p-4 mt-4 border border-slate-800/70 shadow-md">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Channel info */}
                <div className="flex items-center gap-4">
                  <a href={`/profile/${selectedVideo?.owner?.username}`}>

                    <Avatar className="h-12 w-12 hover:shadow-2xl ring-2 ring-orange-600/50  hover:shadow-orange-500  hover:transition-all hover:duration-300 ">
                    <AvatarImage src={selectedVideo?.owner?.avatar} />
                    <AvatarFallback
                      className={`${fallbackColor} text-lg font-bold`}
                    >
                      {selectedVideo?.owner?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  </a>
                  <div className="flex flex-col">
                    <a
                      href={`/profile/${selectedVideo?.owner?.username}`}
                      className="text-base font-semibold text-white hover:text-orange-500 transition-colors"
                    >
                      {selectedVideo?.owner?.fullName}
                    </a>
                    <p className="text-xs text-slate-400 font-medium">
                      {(
                        selectedVideo?.owner?.subscribers || 0
                      ).toLocaleString()}{" "}
                      subscribers
                    </p>
                  </div>
                </div>

                {/* Subscribe button - only show if not own video */}
                {selectedVideo?.owner?._id !== userDetail?._id && (
                  subscriptionIsLoading ? (
                      <div 
                      className={`px-6 rounded-full text-sm font-medium transition-all bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700
                           `}
                      >
                        <SpringLoader type="dot" color="orange-600" size="small"/>
                      </div>
                    ) :(
                  <button
                    onClick={toggleSubscription}
                    className={`px-6  py-2.5 rounded-full text-sm font-medium transition-all
                       ${
                         isSubscribed
                           ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                           : "bg-orange-600 text-white hover:bg-orange-700 shadow-lg"
                       }`}
                    disabled={subscriptionIsLoading}
                  >
                     {isSubscribed ? (
                      "Unsubscribe"
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                    )
                  
                )}
              </div>
            </div>

            {/* Description */}
            <div
              className={`bg-slate-900/80 rounded-xl p-4 mt-2 transition-all overflow-hidden border border-slate-800/50`}
              style={{
                maxHeight: descriptionToggle ? "1000px" : "120px",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-white">Description</h3>
                <button
                  onClick={onDescToggle}
                  className="text-slate-400 hover:text-orange-500 p-1 rounded-full hover:bg-slate-800 transition-all"
                >
                  {descriptionToggle ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronLeft size={18} />
                  )}
                </button>
              </div>
              <p className="text-sm whitespace-pre-wrap text-slate-300">
                {selectedVideo?.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Using memo to prevent unnecessary re-renders
export default memo(VideoPlayer);
