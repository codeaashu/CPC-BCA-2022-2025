import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "react-router-dom";
import { getRandomColor } from "@/utils/getRandomColor";
import defaultImg from "../assets/playlist.png";
import { getTimeAgo } from "@/utils/formateDate";
import { ListMusic, Play } from "lucide-react";

const PlaylistCard = ({ data }) => {
  const [fallbackColor, setFallbackColor] = useState("");

  useEffect(() => {
    setFallbackColor(getRandomColor());
  }, []);

  return (
    <Card className="w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800/50 hover:border-slate-700/70 shadow-lg group transition-all duration-300 hover:shadow-xl">
      <Link to={`/playlist/${data?._id}`} className="block">
        <CardContent className="p-0">
          {/* Playlist Thumbnail with Hover Effect */}
          <div className="relative">
            <AspectRatio ratio={16 / 9} className="bg-slate-900 overflow-hidden">
              <img
                src={data?.videos?.[0]?.thumbnail || defaultImg}
                alt={data?.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
                loading="lazy"
              />
              
              {/* Play Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-slate-950/80 to-slate-900/40">
                <div className="bg-orange-600 rounded-full p-3 shadow-lg transform group-hover:scale-110 transition-transform duration-300 hover:bg-orange-500">
                  <Play size={24} className="text-white" fill="white" />
                </div>
              </div>
              
              {/* Video Count Badge */}
              <div className="absolute top-2 left-2 bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm text-slate-200 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                <ListMusic size={12} className="text-orange-600" />
                <span>{data?.totalVideos || 0} videos</span>
              </div>
            </AspectRatio>
          </div>

          {/* Playlist Info */}
          <div className="p-4 border-t border-slate-800/50">
            <CardTitle className="text-sm font-medium text-white leading-tight line-clamp-1 mb-2 group-hover:text-orange-500 transition-colors">
              {data?.name}
            </CardTitle>

            {/* Author Info */}
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7 ring-2 ring-slate-800 group-hover:ring-orange-600/30 transition-all">
                <AvatarImage src={data?.owner?.avatar} />
                <AvatarFallback className={`${fallbackColor} text-white text-xs font-bold`}>
                  {data?.owner?.username?.[0]?.toUpperCase() || "P"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col">
                <p className="text-slate-300 text-xs font-medium group-hover:text-slate-200 transition-colors">
                  {data?.owner?.fullName}
                </p>
                <p className="text-slate-500 text-xs flex items-center gap-1">
                  <span className="w-1 h-1 bg-slate-600 rounded-full inline-block"></span>
                  {getTimeAgo(data?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default PlaylistCard;
