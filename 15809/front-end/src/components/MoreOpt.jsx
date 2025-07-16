import { Share2, ListPlus, Bookmark, Flag, Edit } from "lucide-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import AddToPlaylist from "./AddToPlaylist";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "@/Notification/Toast";

export default function MoreOpt({ onClose, videoId, videoTitle, username }) {
  const menuRef = useRef(null);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const { userDetail, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Function to handle sharing via Web Share API
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (window.navigator.share) {
        await window.navigator.share({
          title: videoTitle || "Check out this video",
          url: `${window.location.origin}/video/${videoId}`,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        window.navigator.clipboard.writeText(
          `${window.location.origin}/video/${videoId}`
        );
        // Using a more modern approach than alert
        showSuccessToast("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      showErrorToast("Failed to share: " + (error.message || "Unknown error"));
    }
    // Only close after action completes
    if (onClose) onClose();
  };
  // Handle save to playlist
  const handleSaveToPlaylist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userDetail?._id) {
      showErrorToast("Please login to add to playlist");
      return;
    }
    setIsPlaylistModalOpen(true);
  };

  // Handle watch later
  const handleWatchLater = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement watch later functionality
    showSuccessToast("Added to Watch Later!");
    if (onClose) onClose();
  };

  // Handle report
  const handleReport = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement report functionality
    showSuccessToast("Report feature will be implemented soon!");
    if (onClose) onClose();
  };
// Handle navigation of update video details
const handleVideoUpdateNavigation = (e)=>{
  e.preventDefault();
  e.stopPropagation();
  navigate(`/update-video/${videoId}`)
}
  return (
    <div
      ref={menuRef}
      className="origin-top-right rounded-lg shadow-xl bg-slate-950 border border-slate-800 focus:outline-none z-[1000] overflow-hidden"
      role="menu"
      aria-orientation="vertical"
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "220px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <ul className="py-1.5">
        <li className="px-1.5">
          <button
            type="button"
            onClick={handleShare}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            role="menuitem"
          >
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-orange-500">
              <Share2 size={16} />
            </div>
            <span>Share</span>
          </button>
        </li>
        <li className="px-1.5 mt-0.5">
          <button
            type="button"
            onClick={handleSaveToPlaylist}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            role="menuitem"
          >
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-orange-500">
              <ListPlus size={16} />
            </div>
            <span>Save to playlist</span>
          </button>
        </li>
        {/* <li className="px-1.5 mt-0.5">
          <button
            type="button"
            onClick={handleWatchLater}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            role="menuitem"
          >
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-orange-500">
              <Bookmark size={16} />
            </div>
            <span>Watch later</span>
          </button>
        </li> */}
        {/* <li className="px-1.5 mt-0.5">
          <button
            type="button"
            onClick={handleReport}
            className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
            role="menuitem"
          >
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-orange-500">
              <Flag size={16} />
            </div>
            <span>Report</span>
          </button>
        </li> */}
        {userDetail?.username === username && (
          <li className="px-1.5 mt-0.5">
            <button
              type="button"
              onClick={handleVideoUpdateNavigation}
              className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 rounded-md transition-colors"
              role="menuitem"
            >
              <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-orange-500">
                <Edit size={16} />
              </div>
              <span>Update</span>
            </button>
          </li>
        )}
      </ul>
      {isPlaylistModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsPlaylistModalOpen(false);
            if (onClose) onClose();
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="animate-fade-in"
          >
            <AddToPlaylist
              videoId={videoId}
              userId={userDetail?._id}
              onClose={() => {
                setIsPlaylistModalOpen(false);
                if (onClose) onClose();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
