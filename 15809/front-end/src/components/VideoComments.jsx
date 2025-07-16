import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { getRandomColor } from "@/utils/getRandomColor";
import { fetchUserDetail } from "@/Redux";
import { useParams } from "react-router-dom";
import { createVideoComment } from "@/Redux/Slices/Comment";
import { MessageSquare, Send, X, AlertCircle } from "lucide-react";
import { showErrorToast } from "@/Notification/Toast";
import SpringLoader from "./SpringLoader";
import VideoCommentCard from "./VideoCommentCard";

const CommentForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { videoId } = useParams();
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: ""
    }
  });

  const { userDetail } = useSelector((state) => state.user);
  const { commentLoading, commentError } = useSelector((state) => state.comment);
  
  const commentContent = watch("content", "");
  const remainingChars = 250 - (commentContent?.length || 0);
  const charactersUsed = (commentContent?.length || 0) / 250 * 100;
  const [fallbackColor, setFallbackColor] = useState("");
  
  // Character limit warning levels
  const charLimitClass = remainingChars < 10 ? "text-orange-500" : 
                        remainingChars < 50 ? "text-orange-400" : "text-slate-400";

  const handleFormSubmit = async (data) => {
    if (!userDetail?._id) {
      showErrorToast("Please login to comment");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await dispatch(createVideoComment({ videoId, content: data.content.trim() })).unwrap();
      reset();
      setIsFocused(false);
    } catch (error) {
      showErrorToast(error?.message || "Failed to post comment");
      console.error("Failed to create comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setFallbackColor(getRandomColor());
    if (!userDetail?._id) {
      dispatch(fetchUserDetail());
    }
  }, [dispatch, userDetail]);

  return (
    <Card className="w-full border-slate-800 bg-slate-950 shadow-lg">
      <CardContent className="p-5">
        <div className="flex items-center mb-2">
          <MessageSquare className="h-4 w-4 mr-2 text-orange-600" />
          <h3 className="text-sm font-medium text-white">Add a comment</h3>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex gap-4">
          <Avatar className="h-10 w-10 flex-shrink-0 ring-2 ring-slate-800">
            <AvatarImage src={userDetail?.avatar} alt="User" />
            <AvatarFallback className={`${fallbackColor} text-white text-center font-bold`}>
              {userDetail?.username?.[0]?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div className={`relative rounded-lg ${isFocused ? 'bg-slate-900/60 p-1' : ''} transition-all duration-200`}>
              <div className="m-1 p-2">
                <Textarea
                placeholder="Add a comment..."
                className={`resize-none transition-all duration-200 border-slate-800 bg-slate-900 focus:bg-slate-900 text-white rounded-md 
                  ${isFocused ? "min-h-[100px] pb-8" : "min-h-[40px]"}
                  placeholder:text-slate-400 placeholder:opacity-80
                  scrollbar-thin scrollbar-thumb-orange-600/30 scrollbar-track-slate-900/30 hover:scrollbar-thumb-orange-600/50
                `}
                onFocus={() => setIsFocused(true)}
                disabled={isSubmitting || commentLoading}
                {...register("content", {
                  required: "Comment cannot be empty",
                  minLength: {
                    value: 3,
                    message: "Comment must be at least 3 characters",
                  },
                  maxLength: {
                    value: 250,
                    message: "Comment cannot exceed 250 characters",
                  },
                })}
              />
              </div>
              
              {isFocused && (
                <div className="absolute bottom-1 right-3 flex items-center gap-1.5">
                  <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        charactersUsed > 90 ? 'bg-orange-500' : 
                        charactersUsed > 75 ? 'bg-orange-400' : 'bg-slate-400'
                      }`} 
                      style={{width: `${Math.min(charactersUsed, 100)}%`}}
                    ></div>
                  </div>
                  <span className={`text-xs ${charLimitClass}`}>
                    {remainingChars}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              {errors.content && (
                <div className="flex items-start gap-1.5">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <p className="text-sm text-orange-500">{errors.content.message}</p>
                </div>
              )}
              
              {!errors.content && (
                <div className="flex-1"></div>
              )}
              
              {isFocused && (
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    type="button"
                    className="px-3 py-1.5 h-auto text-sm border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white rounded-md transition-colors"
                    onClick={() => {
                      reset();
                      setIsFocused(false);
                    }}
                    disabled={isSubmitting || commentLoading}
                  >
                    <X className="h-4 w-4 mr-1.5" />
                    Cancel
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || commentLoading}
                    className={`px-4 py-1.5 h-auto text-sm font-medium bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors flex items-center gap-1.5 ${
                      (isSubmitting || commentLoading) ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting || commentLoading ? (
                      <>
                        <SpringLoader type="dots" color="white" size="small" />
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Post
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

function VideoComments() {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { commentData = [], commentLoading } = useSelector((state) => state.comment);
  
  // Fetch comments for this video when component mounts
  useEffect(() => {
    if (videoId) {
      // Assuming there's a fetchVideoComments action in the Redux store
      // dispatch(fetchVideoComments(videoId));
    }
  }, [videoId, dispatch]);
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2 px-1">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-orange-600" />
          Comments 
          {commentData.length > 0 && (
            <span className="ml-2 text-sm text-slate-400">({commentData.length})</span>
          )}
        </h2>
      </div>
      
      <CommentForm />
      
      {commentLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="w-full bg-slate-950 border-slate-800 shadow-md overflow-hidden animate-pulse">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800"></div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-24 bg-slate-800 rounded"></div>
                      <div className="h-3 w-12 bg-slate-800 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-800 rounded"></div>
                      <div className="h-3 w-3/4 bg-slate-800 rounded"></div>
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <div className="h-7 w-14 bg-slate-800 rounded"></div>
                      <div className="h-7 w-14 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {!commentLoading && commentData.length === 0 && (
        <div className="text-center py-10 bg-slate-900/30 rounded-lg border border-slate-800">
          <MessageSquare className="h-12 w-12 mx-auto text-slate-600 mb-3" />
          <h3 className="text-lg font-medium text-white mb-1">No comments yet</h3>
          <p className="text-slate-400">Be the first to share your thoughts!</p>
        </div>
      )}
      
      {!commentLoading && commentData.length > 0 && (
        <div className="space-y-4 overflow-y-auto max-h-[800px] pr-1 scrollbar-thin scrollbar-thumb-orange-600/30 scrollbar-track-slate-900/30 hover:scrollbar-thumb-orange-600/50">
          {commentData.map((comment, index) => (
            <div 
              key={comment._id} 
              className={`animate-fade-in-up delay-${Math.min(index * 100, 500)}`}
            >
              <VideoCommentCard 
                data={comment} 
                videoId={comment.video}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoComments;
