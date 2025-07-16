import React, { useEffect, useState } from "react";
import { getTimeAgo } from "@/utils/formateDate";
import { getRandomColor } from "@/utils/getRandomColor";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { MoreHorizontalIcon, ThumbsUp, Heart, MessageSquare, AlertTriangle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLikeOnComment, fetchToggleLikeOnComment } from "@/Redux";
import { fetchLikeStatus, setLikeLoadingState } from "@/Redux/Slices/Comment";
import { useDebounceClick } from "@/Hooks/useDebounceClick";
import SpringLoader from "./SpringLoader";

function VideoCommentCard({ data, videoId }) {
  const [fallbackColor, setFallbackColor] = useState("");
  // const [isLiked, setIsLiked] = useState(false)
  const {
    commentData,
    commentLoading,
    commentError,
    likedCommentError,
    likedCommentLoading,
    likedCommentData,likedComments, likeLoadingStates
  } = useSelector((state) => state.comment);
  const isLiked = likedComments[data._id];
  const isLoading = likeLoadingStates[data._id];

  const dispatch = useDispatch();
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  useEffect(() => {
    setFallbackColor(getRandomColor());
    async function fetchLC(){
      if (data?._id) {
        await dispatch(fetchLikeOnComment(data?._id)).unwrap();
      }
    }
    fetchLC()
    
  }, []);

  useEffect(() => {
    // Only fetch like status if we don't have it yet
    if (data._id && likedComments[data._id] === undefined) {
      dispatch(fetchLikeStatus(data._id));
    }
  }, [data._id, dispatch, likedComments]);

  // const handleToggleLikeOncomment = async () => {
  //   try {
  //     if (data?._id) {
  //       setIsLikeLoading(true);
  //        await dispatch(fetchToggleLikeOnComment(data?._id));
  //       setIsLikeLoading(false);
  //     }
  //   } catch (error) {
  //     return error.message;
  //   }
  // };

  const handleToggleLikeOncomment = useDebounceClick(async () => {
    try {
        dispatch(setLikeLoadingState({ commentId: data._id, isLoading: true }));
        await dispatch(fetchToggleLikeOnComment(data._id)).unwrap();
      

    } catch (error) {
        console.error(error);
    }
},500);



  return (
    <Card className="w-full bg-slate-950 border-slate-800 hover:border-slate-700 shadow-md transition-all duration-300 overflow-hidden group hover:bg-slate-900/30">
      <CardContent className="p-5">
        <div className="flex gap-4">
          {/* Avatar section */}
          <Avatar className="h-10 w-10 ring-2 ring-slate-800 group-hover:ring-orange-600/20 transition-all duration-300">
            <AvatarImage src={data?.owner?.avatar} alt={data?.owner} />
            <AvatarFallback
              className={`${fallbackColor} text-white text-center font-bold`}
            >
              {data?.owner?.username?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Comment content section */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm text-white group-hover:text-orange-200 transition-colors duration-300">
                {data?.owner?.username || "Anonymous"}
              </span>
              <span className="text-xs text-slate-500 flex items-center">
                <span className="h-1 w-1 rounded-full bg-slate-700 mx-1.5"></span>
                {data?.createdAt ? getTimeAgo(data?.createdAt) : ""}
              </span>
            </div>

            {/* Comment text */}
            <p className="text-sm text-slate-300 leading-relaxed">
              {data?.content || (
                <span className="text-slate-500 italic flex items-center">
                  <AlertTriangle size={14} className="mr-1 text-slate-500" />
                  Comment content unavailable
                </span>
              )}
            </p>

            {/* Like button */}
            <div className="flex items-center gap-3 pt-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 px-2 text-slate-500 hover:text-white hover:bg-slate-900 rounded-md transition-colors ${
                  isLiked ? 'text-orange-500' : ''
                }`}
                onClick={handleToggleLikeOncomment}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <SpringLoader type="dots" color="orange-600" size="small" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Heart
                      className={`h-4 w-4 mr-1.5 transition-all duration-300 ${
                        isLiked ? "fill-orange-500 text-orange-500 scale-110" : ""
                      } `}
                    />
                    <span className="text-xs">
                      {isLiked ? "Liked" : "Like"}
                    </span>
                  </div>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-slate-500 hover:text-white hover:bg-slate-900 rounded-md transition-colors"
              >
                <MessageSquare className="h-4 w-4 mr-1.5" />
                <span className="text-xs">Reply</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default VideoCommentCard;
