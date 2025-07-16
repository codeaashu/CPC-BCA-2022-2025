import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVideos } from '@/Redux/Slices/Video';
import VideoCard from '@/components/VideoCard';
import ErrorPage from '@/Error/ErrorPage';
import { Skeleton } from '@/components/ui/skeleton';
import SpringLoader from '@/components/SpringLoader';
import { ChevronLeft, ChevronRight, Film, AlertTriangle } from 'lucide-react';

const VideoList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  
  // Get state from Redux
  const { 
    content,
    videoLoading,
    videoError
  } = useSelector((state) => state.video);
  
  // Extract pagination data
  const videos = content?.data?.docs || [];
  const totalPages = content?.data?.totalPages || 1;
  const hasPrevPage = content?.data?.hasPrevPage || false;
  const hasNextPage = content?.data?.hasNextPage || false;

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Fetch videos from Redux
    dispatch(fetchAllVideos(page));
  }, [page, dispatch]);

  return (
    <div className="w-full max-w-7xl mx-auto bg-slate-950 text-white px-4 py-8 md:px-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6 text-orange-600" />
          <h1 className="text-2xl font-bold text-white">Featured Videos</h1>
        </div>
      </div>
      
      {videoError ? (
        <div className="bg-slate-900/50 border border-red-900/30 rounded-lg p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500/70 mx-auto mb-3" />
          <h2 className="text-xl font-medium text-red-400 mb-2">Failed to load videos</h2>
          <p className="text-slate-400 mb-6">{videoError?.message || "Please try again later"}</p>
        </div>
      ) : (
        <>
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {videoLoading ? (
              Array(6).fill().map((_, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
                  <div className="h-[200px] w-full bg-slate-800/30" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-slate-800/30 w-[70%] rounded-md" />
                    <div className="h-4 bg-slate-800/30 w-[50%] rounded-md" />
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-6 w-6 rounded-full bg-slate-800/30" />
                      <div className="h-4 w-24 bg-slate-800/30 rounded-md" />
                    </div>
                  </div>
                </div>
              ))
            ) : videos.length > 0 ? (
              videos.map((video) => (
                <div 
                  key={video._id} 
                  className="bg-slate-900/30 border border-slate-800 hover:border-slate-700 rounded-lg overflow-hidden shadow-md transition-colors duration-200"
                >
                  <VideoCard video={video} />
                </div>
              ))
            ) : (
              <div className="col-span-full bg-slate-900/50 border border-slate-800 rounded-lg p-10 text-center">
                <Film className="h-12 w-12 text-slate-700 mx-auto mb-3" />
                <h2 className="text-xl font-medium text-white mb-2">No videos found</h2>
                <p className="text-slate-400">Check back later for new content</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 py-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={!hasPrevPage || videoLoading}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-slate-300 bg-slate-900/50 px-4 py-2 rounded-md border border-slate-800">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={!hasNextPage || videoLoading}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {videoLoading && (
            <div className="flex justify-center items-center gap-2 my-4 py-2">
              <div className="h-2 w-2 rounded-full bg-orange-600"></div>
              <div className="h-2 w-2 rounded-full bg-orange-600"></div>
              <div className="h-2 w-2 rounded-full bg-orange-600"></div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoList;

