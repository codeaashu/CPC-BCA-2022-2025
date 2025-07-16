import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CardContent, Card, CardTitle } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { formatDate, getTimeAgo } from "@/utils/formateDate";
import { getRandomColor } from "@/utils/getRandomColor";
import { Clock, Dot, Eye, MoreHorizontal, Play } from "lucide-react";
import useOnClickOutside from "@/Hooks/useOnClickOutside";
import MoreOpt from "./MoreOpt";

const VideoCard = ({ video }) => {
  const [fallbackColor, setFallbackColor] = useState("");
  const [toggleMoreOpt, setToggleMoreOpt] = useState(false);
  const moreButtonRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Use an array of refs to check if clicks are inside either the button or the menu
  useOnClickOutside([moreButtonRef, moreMenuRef], () => {
    if (toggleMoreOpt) setToggleMoreOpt(false);
  });

  const handleMoreClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleMoreOpt((prev) => !prev);
  };

  useEffect(() => {
    setFallbackColor(getRandomColor());
  }, []);

  // Format duration for display
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <Card className="w-full h-full rounded-lg bg-slate-900 border-slate-800 shadow-md overflow-hidden group relative hover:shadow-lg hover:border-slate-700 transition-all">
      <Link to={`/video/${video?._id}`} className="block relative">
        {/* Video thumbnail */}
        <AspectRatio ratio={16 / 9} className="w-full bg-slate-800">
          <img
            src={video?.thumbnail}
            alt={video?.title}
            className="rounded-t-lg object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Overlay play button - only visible on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/0 group-hover:bg-slate-900/40 transition-all opacity-0 group-hover:opacity-100 group-hover:scale-105">
            <div className="w-12 h-12 rounded-full bg-orange-600/90 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-all ">
              <Play size={22} className="text-white ml-1" fill="white" />
            </div>
          </div>
          {/* Video duration */}
          {video?.duration && (
            <span className="absolute bottom-2 right-2 bg-slate-900/85 text-slate-100 text-xs px-2 py-1 rounded flex items-center gap-1 font-medium">
              <Clock size={10} className="text-orange-500" />
              {formatDuration(video?.duration)}
            </span>
          )}
        </AspectRatio>
      </Link>
      <CardContent className="flex gap-3 p-3 bg-slate-900">
        <Link to={`/profile/${video?.username}`} className="flex-shrink-0">
          <Avatar className="h-9 w-9 border-2 border-slate-800 hover:border-orange-600/50 transition-all">
            <AvatarImage src={video?.avatar} />
            <AvatarFallback
              className={`${fallbackColor} text-white text-center font-bold text-xs`}
            >
              {video?.owner?.[0]?.toUpperCase() || "V"}
            </AvatarFallback>
          </Avatar>
        </Link>

        {/* Video Details */}
        <div className="w-full">
          <CardTitle className="text-sm font-medium leading-tight line-clamp-2 mb-1.5 text-slate-200">
            {video?.title}
          </CardTitle>

          <Link to={`/profile/${video?.username}`} className="block">
            <p className="text-slate-400 text-xs flex items-center gap-1 hover:text-orange-500 transition-colors">
              {video?.owner}
            </p>
          </Link>
          <div className="flex items-center mt-0.5">
            <div className="flex items-center text-slate-500 text-xs">
              <Eye size={11} className="mr-1 text-slate-500/70" />
              <span>{video?.views || 0} views</span>
            </div>
            <span className="text-slate-600 mx-1.5">
              <Dot size={16} />
            </span>
            <p className="text-slate-500 text-xs">
              {getTimeAgo(video?.createdAt)}
            </p>
          </div>
        </div>

        {/* More option button */}
        <div className="ml-auto flex-shrink-0">
          <button
            ref={moreButtonRef}
            onClick={handleMoreClick}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-800 hover:text-orange-500 transition-colors"
            title="More options"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </CardContent>

      {/* Popup menu - outside CardContent but inside Card */}
      {toggleMoreOpt && (
        <div
          ref={moreMenuRef}
          className="absolute top-12 right-2 z-50 animate-in fade-in slide-in-from-top-5 duration-200"
        >
          <MoreOpt
            onClose={() => setToggleMoreOpt(false)}
            videoId={video?._id}
            videoTitle={video?.title}
            username={video?.username}
          />
        </div>
      )}
    </Card>
  );
};

export default VideoCard;
