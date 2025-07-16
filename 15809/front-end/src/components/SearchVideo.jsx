import { fetchVideosBySearch } from "@/Redux/Slices/Video";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VideoCard from "./VideoCard";
import SpringLoader from "./SpringLoader";
import EmptyContent from "@/Error/EmptyContent";
import { ArrowDown, ArrowUp, SlidersHorizontal, Search, Calendar, Eye, Type, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

function SearchVideo() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { videoLoading, videoError, searchResult } = useSelector(
    (state) => state.video
  );
  
  // Get query from URL search params
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  
  // State for filters and sorting
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortType, setSortType] = useState("desc");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch videos when query, page or sorting changes
  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchVideosBySearch({ 
        query: searchQuery,
        page,
        sortBy,
        sortType
      }));
    }
  }, [dispatch, searchQuery, page, sortBy, sortType]);
  
  // Handle filter toggle
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Handle sort change
  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle sort direction if clicking the same sort option
      setSortType(sortType === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortType("desc"); // Default to descending for new sort option
    }
  };
  
  return (
    <div className="search-page px-4 md:px-8 max-w-screen-2xl mx-auto py-6 bg-slate-950 text-white min-h-screen">
      {/* Search header */}
      <div className="search-header mb-8 bg-slate-900/60 p-6 rounded-lg border border-slate-800 shadow-lg">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Search className="w-6 h-6 text-orange-600" />
            {searchQuery ? `Results for "${searchQuery}"` : "Search Videos"}
          </h1>
        </div>
        
        {/* Filters section */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-slate-400">
            {searchResult.docs?.length > 0 ? `${searchResult.docs?.length} results found` : ""}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleFilters}
            className="flex items-center gap-2 bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-orange-500 text-white"
          >
            <SlidersHorizontal size={16} className={showFilters ? "text-orange-600" : ""} />
            Filter & Sort
          </Button>
        </div>
        
        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-slate-900/80 rounded-lg border border-slate-700 transition-all duration-300">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={sortBy === "createdAt" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleSortChange("createdAt")}
                className={`flex items-center gap-1 ${
                  sortBy === "createdAt" 
                    ? "bg-orange-600 hover:bg-orange-700 text-white" 
                    : "bg-slate-800 border-slate-700 hover:border-orange-600 text-white hover:text-orange-500"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" /> 
                Date {sortBy === "createdAt" && (sortType === "asc" ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />)}
              </Button>
              <Button 
                variant={sortBy === "views" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleSortChange("views")}
                className={`flex items-center gap-1 ${
                  sortBy === "views" 
                    ? "bg-orange-600 hover:bg-orange-700 text-white" 
                    : "bg-slate-800 border-slate-700 hover:border-orange-600 text-white hover:text-orange-500"
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> 
                Views {sortBy === "views" && (sortType === "asc" ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />)}
              </Button>
              <Button 
                variant={sortBy === "title" ? "default" : "outline"} 
                size="sm"
                onClick={() => handleSortChange("title")}
                className={`flex items-center gap-1 ${
                  sortBy === "title" 
                    ? "bg-orange-600 hover:bg-orange-700 text-white" 
                    : "bg-slate-800 border-slate-700 hover:border-orange-600 text-white hover:text-orange-500"
                }`}
              >
                <Type className="w-3.5 h-3.5" /> 
                Title {sortBy === "title" && (sortType === "asc" ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />)}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {videoLoading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <SpringLoader />
        </div>
      )}
      
      {/* Error state */}
      {videoError && (
        <div className="error-container p-6 bg-red-900/20 border border-red-900/30 text-red-400 rounded-lg my-6 shadow-lg">
          <p className="font-medium text-lg mb-1">Error loading videos</p>
          <p>{videoError}</p>
        </div>
      )}
      
      {/* Empty state */}
      {!videoLoading && !videoError && searchQuery && searchResult.docs?.length === 0 && (
        <div className="empty-state text-center py-10 bg-slate-900/60 rounded-lg border border-slate-800 p-6">
          <EmptyContent />
          <h2 className="mt-6 text-xl font-semibold text-white">No videos found for "{searchQuery}"</h2>
          <p className="mt-2 text-slate-400">Try different keywords or check your spelling</p>
        </div>
      )}
      
      {/* Search results */}
      {!videoLoading && !videoError && searchResult.docs?.length > 0 && (
        <div className="videos-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {searchResult.docs?.map((video) => (
            <div key={video._id} className="video-container bg-slate-900/40 rounded-lg border border-slate-800 p-2 hover:border-slate-700 transition-all duration-300">
              <VideoCard video={video} />
            </div>
          ))}
        </div>
      )}
      
      {/* Pagination - Only show if we have results */}
      {!videoLoading && !videoError && searchResult.docs?.length > 0 && (
        <div className="pagination flex justify-center items-center mt-10 gap-4">
          <Button 
            variant="outline" 
            size="sm"
            disabled={searchResult?.hasPrevPage === false}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="flex items-center gap-1 bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-orange-500 text-white disabled:opacity-50 disabled:pointer-events-none px-4 py-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <span className="text-sm font-medium text-slate-400">
            Page {searchResult.page || 1} of {searchResult.totalPages || 1}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={searchResult.hasNextPage === false}
            className="flex items-center gap-1 bg-slate-900 border-slate-700 hover:bg-slate-800 hover:text-orange-500 text-white disabled:opacity-50 disabled:pointer-events-none px-4 py-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default SearchVideo;
