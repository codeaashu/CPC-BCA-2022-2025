import React, { useRef, useState, useEffect } from "react";
// import ReactPlayer from 'react-player';

// const VideoPlayer = () => {
//   const playerRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0); // Track video progress
//   const [duration, setDuration] = useState(0); // Track video duration
//   const [isMuted, setIsMuted] = useState(false);
//   const [volume, setVolume] = useState(1); // Default volume
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   useEffect(() => {
//     if (playerRef.current && playerRef.current.getDuration()) {
//       setDuration(playerRef.current.getDuration());
//     }
//   }, [playerRef.current]);

//   const handlePlayPause = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handleProgress = (state) => {
//     setProgress(state.playedSeconds);
//   };

//   const handleSeek = (seconds) => {
//     if (playerRef.current) {
//       playerRef.current.seekTo(seconds);
//     }
//   };

//   const handleVolumeChange = (newVolume) => {
//     setVolume(newVolume);
//   };

//   const handleMuteToggle = () => {
//     setIsMuted(!isMuted);
//   };

//   const handleFullScreenToggle = () => {
//     if (isFullScreen) {
//       document.exitFullscreen();
//     } else {
//       document.documentElement.requestFullscreen();
//     }
//     setIsFullScreen(!isFullScreen);
//   };

//   return (
//     <div className="relative aspect-video"> {/* Container for relative positioning */}
//       <ReactPlayer
//         ref={playerRef}
//         url="http://res.cloudinary.com/pankajuday/video/upload/v1731787164/sfje0tgt1spnvztw4bvk.mp4"
//         width="100%"
//         height="auto" // Maintain aspect ratio
//         playing={isPlaying}
//         playsinline={true}
//         onProgress={handleProgress} // Track progress
//         onReady={() => {
//           if (playerRef.current && playerRef.current.getDuration()) {
//             setDuration(playerRef.current.getDuration());
//           }
//         }}
//         volume={volume}
//         muted={isMuted}
//       />

//       {/* Custom Controls */}
//       <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <button onClick={handlePlayPause}>
//             {isPlaying ? "Pause" : "Play"}
//           </button>
//           {/* Progress Bar */}
//           <input
//             type="range"
//             min={0}
//             max={duration}
//             value={progress}
//             step={0.1}
//             onChange={(e) => handleSeek(parseFloat(e.target.value))}
//             className="w-48"
//           />
//           {/* Current Time / Duration */}
//           <span>{formatTime(progress)} / {formatTime(duration)}</span>

//           <button onClick={handleMuteToggle}>
//             {isMuted ? "Unmute" : "Mute"}
//           </button>
//           <input
//               type="range"
//               min={0}
//               max={1}
//               step={0.1}
//               value={volume}
//               onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
//               className="w-24"
//           />
//         </div>
//         <div>
//           <button onClick={handleFullScreenToggle}>
//             {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper function to format time (e.g., 00:30)
// const formatTime = (seconds) => {
//   if (isNaN(seconds)) {
//     return "00:00";
//   }
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = Math.floor(seconds % 60);
//   const formattedMinutes = String(minutes).padStart(2, '0');
//   const formattedSeconds = String(remainingSeconds).padStart(2, '0');
//   return `${formattedMinutes}:${formattedSeconds}`;
// };

// export default VideoPlayer;

// import React, { useState, useRef, useEffect } from 'react';
// import ReactPlayer from 'react-player';

// const Test = ({ videoUrl }) => {
//   const playerRef = useRef(null);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [previousVolume, setPreviousVolume] = useState(1);
//   const [hasMounted, setHasMounted] = useState(false); // Track component mount

//   // useEffect(() => {
//   //   setHasMounted(true); // Set hasMounted after the initial render
//   // }, []);

//   const handleVolumeChange = (event) => {
//     const newVolume = parseFloat(event.target.value);
//     setVolume(newVolume);
//     if (newVolume > 0) {
//       setIsMuted(false);
//       setPreviousVolume(newVolume);
//     }
//   };

//   const handleMuteToggle = () => {
//     if (!isMuted) {
//       setPreviousVolume(volume);
//       setVolume(0);
//       setIsMuted(true);
//     } else {
//       if (previousVolume > 0) {
//         setVolume(previousVolume);
//       } else {
//         setVolume(1);
//       }
//       setIsMuted(false);
//     }
//   };

//   useEffect(() => {
//     if (playerRef.current && hasMounted) { // Check hasMounted *and* playerRef
//       const player = playerRef.current.getInternalPlayer(); // Get the internal player
//       if (player) { // Check if the internal player is available
//         if (isMuted) {
//           player.setVolume(0); // Use the internal player's setVolume
//         } else {
//           player.setVolume(volume);
//         }
//       }
//     }
//   }, [volume, isMuted, hasMounted]); // hasMounted in the dependency array

//   const handleReady = () => {
//     // No action needed here now
//   };

//   return (
//     <div>
//       <ReactPlayer
//         ref={playerRef}
//         url={videoUrl}
//         width="100%"
//         height="auto"
//         volume={isMuted ? 0 : volume}
//         onReady={handleReady} // Still necessary for other react-player functionality
//       />

//       <input
//         type="range"
//         min={0}
//         max={1}
//         step={0.01}
//         value={volume}
//         onChange={handleVolumeChange}
//         style={{ width: '100px' }}
//       />

//       <button onClick={handleMuteToggle}>{isMuted ? "Unmute" : "Mute"}</button>

//       <p>Volume: {isMuted ? "Muted" : Math.round(volume * 100) + "%"}</p>
//     </div>
//   );
// };

// export default Test;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchVideoByIdSlice, fetchAllVideos } from "./Redux/slices/video/videoSlice";
// import { useParams } from "react-router-dom";
// import VideoPlayer from "./components/VideoPlayer";

// export default function Test() {
//   const videoId = "671ff57a887e39ced6b6fac7"
//   const vid = useParams()
//   const dispatch = useDispatch();
//   const { videos, loading, error } = useSelector((state) => state.video);

//   useEffect(() => {
//     dispatch(fetchAllVideos()); // Fetch videos on mount
//   }, [dispatch]);

//   if (loading) return <p>Loading videos...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="bg-black text-white h-full w-full">
//       {videos.data.docs[0].map((video) => (
//         <div key={video.id}>
//           <h3>{video.title}</h3>
//           <video controls src={video.url} width="400"></video>
//         </div>
//       ))}
//       {/* {...videos} */}
//       {/* <VideoPlayer content={}/> */}
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import { fetchAllVideos, fetchVideoByIdSlice } from "./Redux/slices/video/videoSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// export default function Test() {
//   const {videoId} = useParams()
//     const dispatch = useDispatch();
//     const { selectedVideo, loading, error } = useSelector((state) => state.video);

//     useEffect(async() => {
//         await dispatch(fetchVideoByIdSlice(videoId));
//     }, [dispatch]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;

//     // 1. Check if content is an array before mapping
//     // if (Array.isArray(content) && content.length > 0) {  // <-- Crucial check
//         return (
//             // <div className="h-96 w-96 justify-center items-center">
//             //     {content.data.docs.map((video) => (
//             //         <div key={video._id || video.id || nanoid()}>
//             //             <p>{video.title}</p>
//             //             {video.thumbnail && <img src={video.thumbnail} alt={video.title} />}
//             //             {/* ... other video properties ... */}
//             //         </div>
//             //     ))}
//             // </div>
//             <div>
//               {selectedVideo}
//             </div>
//         );
// }

///////////////////////////////////////////////////

// likes

{
  /* <span onClick={handleLikeToggle} className="cursor-pointer">
{video.likes}{" "}
{liked ? <Heart fill="red" color="red" /> : <Heart />}
</span> */
}

// data
// <span>
// {new Date(video.createdAt).toLocaleDateString("en-US", {
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// })}
// </span>

import SpringLoader from "./components/SpringLoader";

export default function Test() {
  return <SpringLoader />;
}

// const dispatch = useDispatch();
// const { playlistIsLoading, playlistError } = useSelector(
//   (state) => state.playlist
// );

// const {
//   register,
//   handleSubmit,
//   formState: { errors },
// } = useForm();

// const onSubmit = async (data) => {
//   try {
//     await dispatch(fetchCreatePlaylist(data)).unwrap();
//     if (onClose) onClose();
//   } catch (error) {
//     console.error("Failed to create playlist:", error);
//   }
// };

// return (
//   <Card className="w-full max-w-md mx-auto">
//     <CardContent className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">Create Playlist</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Name Input */}
//         <div className="space-y-2">
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Playlist Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             {...register("name", {
//               required: "Playlist name is required",
//               minLength: {
//                 value: 3,
//                 message: "Name must be at least 3 characters",
//               },
//             })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter playlist name"
//           />
//           {errors.name && (
//             <p className="text-sm text-red-500">{errors.name.message}</p>
//           )}
//         </div>

//         {/* Description Input */}
//         <div className="space-y-2">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <Textarea
//             id="description"
//             {...register("description", {
//               required: "Description is required",
//               minLength: {
//                 value: 10,
//                 message: "Description must be at least 10 characters",
//               },
//             })}
//             rows={4}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter playlist description"
//           />
//           {errors.description && (
//             <p className="text-sm text-red-500">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* Error Message */}
//         {playlistError && (
//           <p className="text-sm text-red-500">{playlistError}</p>
//         )}

//         {/* Buttons */}
//         <div className="flex justify-end gap-3 pt-4">
//           <Button
//             type="button"
//             variant="ghost"
//             onClick={onClose}
//             disabled={playlistIsLoading}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={playlistIsLoading}>
//             {playlistIsLoading ? "Creating..." : "Create"}
//           </Button>
//         </div>
//       </form>
//     </CardContent>
//   </Card>
// );




// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import VideoCard from "./VideoCard";
// import SpringLoader from "./SpringLoader";
// // import { EmptyContent } from "../Error/EmptyContent";
// import { Button } from "./ui/button";
// import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
// // import { fetchVideosBySearch } from "../Redux/Slices/Video";
// import NotFound from "@/Error/NotFound";

// const SearchVideo = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Extract query parameters
//   const searchParams = new URLSearchParams(location.search);
//   const query = searchParams.get("query") || "";
//   const currentPage = parseInt(searchParams.get("page") || "1", 10);
//   const sortBy = searchParams.get("sortBy") || "createdAt";
//   const sortType = searchParams.get("sortType") || "desc";
  
//   // State management
//   const [showFilters, setShowFilters] = useState(false);

//   // Fetch videos from Redux state
//   const { searchResults, videoLoading, videoError, totalPages } = useSelector((state) => state.video);

//   useEffect(() => {
//     // Dispatch search action
//     // dispatch(fetchVideosBySearch({ query, page: currentPage, sortBy, sortType }));
//   }, [query, currentPage, sortBy, sortType, dispatch]);

//   // Handle pagination
//   const handlePageChange = (page) => {
//     const newParams = new URLSearchParams(location.search);
//     newParams.set("page", page.toString());
//     navigate(`/videos?${newParams.toString()}`);
//   };

//   // Handle sort change
//   const handleSortChange = (e) => {
//     const [newSortBy, newSortType] = e.target.value.split("-");
//     const newParams = new URLSearchParams(location.search);
//     newParams.set("sortBy", newSortBy);
//     newParams.set("sortType", newSortType);
//     newParams.set("page", "1"); // Reset to page 1 when sort changes
//     navigate(`/videos?${newParams.toString()}`);
//   };

//   // Pagination component
//   const Pagination = () => {
//     if (totalPages <= 1) return null;
    
//     // Create an array of page numbers
//     const getPageNumbers = () => {
//       const pages = [];
      
//       if (totalPages <= 7) {
//         // Show all pages if there are 7 or fewer
//         for (let i = 1; i <= totalPages; i++) {
//           pages.push(i);
//         }
//       } else {
//         // Always include first page
//         pages.push(1);
        
//         if (currentPage > 3) {
//           pages.push('...');
//         }
        
//         // Pages around current page
//         const startPage = Math.max(2, currentPage - 1);
//         const endPage = Math.min(totalPages - 1, currentPage + 1);
        
//         for (let i = startPage; i <= endPage; i++) {
//           pages.push(i);
//         }
        
//         if (currentPage < totalPages - 2) {
//           pages.push('...');
//         }
        
//         // Always include last page
//         pages.push(totalPages);
//       }
      
//       return pages;
//     };
    
    
//     return (
//       <div className="flex justify-center mt-8 space-x-2">
//         <Button 
//           variant="outline" 
//           size="icon"
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//         >
//           <ChevronLeft size={16} />
//         </Button>
        
//         {getPageNumbers().map((page, index) => (
//           page === '...' ? (
//             <span key={`ellipsis-${index}`} className="px-3 py-2">...</span>
//           ) : (
//             <Button
//               key={page}
//               variant={currentPage === page ? "default" : "outline"}
//               onClick={() => handlePageChange(page)}
//               className="w-10 h-10"
//             >
//               {page}
//             </Button>
//           )
//         ))}
        
//         <Button 
//           variant="outline" 
//           size="icon"
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           <ChevronRight size={16} />
//         </Button>
//       </div>
//     );
//   };

//   if (videoLoading) {
//     return <SpringLoader />;
//   }

//   return (
//     <div className="container mx-auto p-4 pt-20">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">
//           {query ? `Search Results: "${query}"` : "All Videos"}
//         </h1>
        
//         <div className="flex items-center space-x-2">
//           <Button 
//             variant="ghost" 
//             size="sm"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <SlidersHorizontal size={18} className="mr-1" /> 
//             Filter
//           </Button>
          
//           <select
//             value={`${sortBy}-${sortType}`}
//             onChange={handleSortChange}
//             className="p-2 rounded-md border border-gray-300 text-sm"
//           >
//             <option value="createdAt-desc">Newest First</option>
//             <option value="createdAt-asc">Oldest First</option>
//             <option value="views-desc">Most Views</option>
//             <option value="title-asc">Title (A-Z)</option>
//           </select>
//         </div>
//       </div>
      
//       {showFilters && (
//         <div className="mb-6 p-4 border rounded-md bg-gray-50">
//           <h2 className="font-semibold mb-2">Advanced Filters</h2>
//           {/* Add additional filters here as needed */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             <div>
//               <label className="block text-sm mb-1">Duration</label>
//               <select className="w-full p-2 rounded-md border">
//                 <option value="">Any length</option>
//                 <option value="short">Under 4 minutes</option>
//                 <option value="medium">4-20 minutes</option>
//                 <option value="long">Over 20 minutes</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-sm mb-1">Upload Date</label>
//               <select className="w-full p-2 rounded-md border">
//                 <option value="">Any time</option>
//                 <option value="hour">Last hour</option>
//                 <option value="day">Today</option>
//                 <option value="week">This week</option>
//                 <option value="month">This month</option>
//                 <option value="year">This year</option>
//               </select>
//             </div>
            
//             <div className="flex items-end">
//               <Button className="w-full">Apply Filters</Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {videoError && (
//         <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
//           <p className="text-red-700">Error: {videoError}</p>
//         </div>
//       )}

//       {searchResults?.docs?.length === 0 && !videoLoading && !videoError ? (
//         <NotFound 
//           title={`No videos found${query ? ` matching "${query}"` : ''}`}
//           message="Try different search terms or browse our featured content"
//         />
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {searchResults?.map((video) => (
//             <VideoCard key={video._id} video={video} />
            
//           ))}
//         </div>
//       )}
      
//       <Pagination />
//     </div>
//   );
// };

// export default SearchVideo;