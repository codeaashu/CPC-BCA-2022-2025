import React, { useEffect, useState } from 'react';
import VideoCard from './VideoCard';
import { history } from '../axios';
import { History as HistoryIcon, Clock, RefreshCw } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

const History = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     let isMounted = true;
     const fetchHistory = async () => {
       try {
         const response = await history();
         
         if (isMounted) {
           setVideos(response.data);
           setLoading(false);
         } else {
           console.error('Unexpected response format:', response.data);
           setLoading(false);
         }
         
       } catch (error) {
         if (isMounted) {
           console.error('Error fetching videos:', error);
           setLoading(false);
         }
       }
     };
 
     fetchHistory();
     return () => {
       isMounted = false;
     };
   }, []);

  return (
    <div className="video-container relative w-full">
      {/* Title Section */}
      <div className="mb-8 border-b border-slate-800/80 pb-4">
        <div className="flex items-center mb-1">
          <div className="h-9 w-9 rounded-full bg-orange-600/10 flex items-center justify-center mr-3">
            <Clock size={18} className="text-orange-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white">Watch History</h1>
        </div>
        <p className="text-slate-400 text-sm ml-12">Videos you've watched will appear here</p>
      </div>
      
      {/* Video List */}
      {loading ? (
        <div className="flex items-center justify-center py-6 w-full">
          <RefreshCw size={24} className="text-orange-500 animate-spin mr-3" />
          <p className="text-slate-300">Loading your history...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-16 w-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
            <HistoryIcon size={32} className="text-slate-500" />
          </div>
          <h2 className="text-xl font-medium text-slate-300 mb-2">No watch history found</h2>
          <p className="text-slate-400 text-center max-w-md">
            Videos you watch will appear here. Browse some videos to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {Array.isArray(videos) && videos.map(video => (
            <div key={video._id}>
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
      
      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {Array(8).fill().map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
              <div className="aspect-video w-full bg-slate-800">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-3">
                <div className="flex gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="w-full">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;