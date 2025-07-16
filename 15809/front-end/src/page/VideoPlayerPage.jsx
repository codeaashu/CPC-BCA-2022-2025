import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronUp, Film, MessageSquare, AlertTriangle } from "lucide-react";

// Components
import VideoPlayer from "../components/VideoPlayer";
import VideoCard from "../components/VideoCard";
import SpringLoader from "@/components/SpringLoader";
import VideoComments from "@/components/VideoComments";
import VideoCommentCard from "@/components/VideoCommentCard";
import { Button } from "@/components/ui/button";
import NotFound from "@/Error/NotFound";

// Redux Actions
import {
  fetchCommentsOnVideo,
  fetchRelatedVideos,
} from "@/Redux/";

// Custom Skeleton Component (to avoid external dependency)
import { Skeleton } from "@/components/ui/skeleton";

const VideoPlayerPage = () => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const [isCommentsVisible, setIsCommentsVisible] = useState(true);

  // Redux selectors
  const {
    relatedVideos,
    relatedVideosLoading,
    relatedVideosError,
    videoError,
  } = useSelector((state) => state.video);

  const { commentData, commentLoading, commentError } = useSelector(
    (state) => state.comment
  );

  // Scroll to top and fetch data when video ID changes
  useEffect(() => {
    const scrollOptions = { 
      top: 0, 
      behavior: 'smooth'
    };
    
    window.scrollTo(scrollOptions);
    
    if (videoId) {
      dispatch(fetchRelatedVideos(videoId));
      dispatch(fetchCommentsOnVideo(videoId));
    }
  }, [videoId, dispatch]);

  return (
    <div className="w-full max-w-7xl mx-auto bg-slate-950 text-white px-4 md:px-6">
      <div className="flex flex-col lg:flex-row lg:gap-8 py-6">
        {/* Main Content - Video Player */}
        {videoError === null ? (
          <div className="lg:w-2/3 w-full mb-6 lg:mb-0 animate-in fade-in duration-500">
            {/* Video Player Component */}
            <VideoPlayer />
            
            {/* Comments Section */}
            <div className="w-full mt-6 space-y-4">
              <VideoComments />
              
              {/* Comments Toggle Button */}
              <div className="flex justify-center items-center relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-orange-600/30"></div>
                </div>
                
                <Button 
                  onClick={() => setIsCommentsVisible(!isCommentsVisible)}
                  variant="outline" 
                  className="relative rounded-full px-4 py-1 border-orange-600/50 bg-slate-900 hover:bg-slate-800 text-orange-500 hover:text-orange-400 text-sm font-medium flex items-center gap-2"
                >
                  {isCommentsVisible ? (
                    <>
                      <ChevronUp size={16} />
                      Hide Comments
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} />
                      Show Comments
                    </>
                  )}
                </Button>
              </div>

              {/* Comments List */}
              {isCommentsVisible && (
                <div className="animate-in slide-in-from-top-2 duration-300">
                  {commentLoading ? (
                    <div className="space-y-4 py-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4 bg-slate-900/50 p-4 rounded-lg">
                          <Skeleton circle width={40} height={40} />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Skeleton width={120} height={16} />
                              <Skeleton width={60} height={12} />
                            </div>
                            <Skeleton width="100%" height={24} />
                            <div className="flex gap-3 mt-3">
                              <Skeleton width={60} height={20} />
                              <Skeleton width={60} height={20} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : commentError ? (
                    <div className="text-center py-6 bg-red-900/10 border border-red-900/20 rounded-lg">
                      <AlertTriangle className="h-12 w-12 text-red-500/70 mx-auto mb-2" />
                      <p className="text-red-400 font-medium">
                        Error loading comments
                      </p>
                      <p className="text-red-300/70 text-sm mt-1">
                        {commentError?.message || "Please try again later"}
                      </p>
                    </div>
                  ) : commentData?.docs?.length > 0 ? (
                    <div className="space-y-4">
                      {commentData.docs.map((comment, index) => (
                        <div 
                          key={comment._id} 
                          className={`animate-in fade-in-50 duration-300 delay-${Math.min(index * 100, 500)}`}
                        >
                          <VideoCommentCard data={comment} videoId={videoId} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-slate-900/30 rounded-lg border border-slate-800">
                      <MessageSquare className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-white mb-1">No comments yet</h3>
                      <p className="text-slate-400">Be the first to share your thoughts!</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="relative w-full py-8">
            <NotFound />
          </div>
        )}

        {/* Sidebar - Related Videos */}
        <div className="lg:w-1/3 w-full animate-in fade-in slide-in-from-right-5 duration-500 delay-300">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Film className="text-orange-500 h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">Related Videos</h3>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-180px)] overflow-y-auto pr-1 scrollbar scrollbar-thin scrollbar-thumb-orange-600/30 scrollbar-track-slate-900/30 hover:scrollbar-thumb-orange-600/50">
              {relatedVideosLoading ? (
                // Loading skeletons for related videos
                Array(5)
                  .fill()
                  .map((_, i) => (
                    <div key={i} className="flex space-x-3 bg-slate-900/30 p-3 rounded-lg">
                      <Skeleton height={90} width={160} className="flex-shrink-0 rounded-md" />
                      <div className="flex-1 py-1">
                        <Skeleton width="90%" height={18} className="mb-2" />
                        <Skeleton width="70%" height={14} className="mb-2" />
                        <Skeleton width="50%" height={14} />
                      </div>
                    </div>
                  ))
              ) : relatedVideos && relatedVideos.length > 0 ? (
                // Actual related videos
                relatedVideos.map(
                  (video, index) =>
                    video && (
                      <div
                        key={video._id}
                        className={`transition-all duration-200 hover:bg-slate-900/70 bg-slate-900/30 rounded-lg p-3 border border-slate-800 hover:border-slate-700 delay-${Math.min(index * 100, 500)}`}
                      >
                        <VideoCard video={video} />
                      </div>
                    )
                )
              ) : (
                // Empty or error state
                <div className="text-center py-8 bg-slate-900/30 rounded-lg border border-slate-800">
                  {relatedVideosError ? (
                    <>
                      <AlertTriangle className="h-10 w-10 text-orange-500/70 mx-auto mb-2" />
                      <p className="text-orange-400">Error loading related videos</p>
                      <p className="text-slate-400 text-sm mt-1">Please try again later</p>
                    </>
                  ) : (
                    <>
                      <Film className="h-12 w-12 text-slate-700 mx-auto mb-2" />
                      <p className="text-slate-400">No related videos found</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
