import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle, ListPlus, Music, Plus, Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddVideoOnPlaylist, fetchUserPlaylist } from "@/Redux";
import { showErrorToast, showSuccessToast } from "@/Notification/Toast";
import SpringLoader from "./SpringLoader";
import { useForm } from "react-hook-form";

function AddToPlaylist({ videoId, userId, onClose }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [addedPlaylistName, setAddedPlaylistName] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      playlistId: "",
    },
  });

  const dispatch = useDispatch();
  const { playlistData, playlistIsLoading, playlistError } = useSelector(
    (state) => state.playlist
  );

  useEffect(() => {
    try {
      if (videoId && userId) {
        // Always refresh playlist data when component mounts
        dispatch(fetchUserPlaylist(userId));
      }
    } catch (error) {
      showErrorToast(error?.message || "Failed to load playlists");
    }
  }, [videoId, userId, dispatch]);

  // Set default selected playlist if video is already in any playlist
  useEffect(() => {
    if (videoId && playlistData?.length > 0) {
      // Find if video is already in any playlist
      const playlistWithVideo = playlistData.find(playlist => 
        playlist.videos?.some(v => v._id === videoId || v === videoId)
      );
      
      if (playlistWithVideo) {
        setValue("playlistId", playlistWithVideo._id);
      }
    }
  }, [videoId, playlistData, setValue]);

  const onSubmitForm = async (data) => {
    if (!userId) {
      showErrorToast("Please login to add to playlist");
      return;
    }

    if (!data.playlistId || !videoId) {
      showErrorToast("Invalid playlist or video selection");
      return;
    }

    try {
      // Check if video is already in the selected playlist
      const selectedPlaylist = playlistData.find(p => p._id === data.playlistId);
      const isVideoAlreadyInPlaylist = selectedPlaylist?.videos?.some(v => v._id === videoId || v === videoId);
      
      if (isVideoAlreadyInPlaylist) {
        showErrorToast("This video is already in the selected playlist");
        return;
      }
      
      await dispatch(fetchAddVideoOnPlaylist({ 
        videoId, 
        playlistId: data.playlistId 
      })).unwrap();
      
      // Find the playlist name for success message
      if (selectedPlaylist) {
        setAddedPlaylistName(selectedPlaylist.name);
      }
      
      // Show success state for 1.8 seconds before closing
      setIsSuccess(true);
      setTimeout(() => {
        reset();
        onClose();
      }, 1800);
      
    } catch (error) {
      const errorMessage = error?.message || "Failed to add video to playlist";
      if (errorMessage.toLowerCase().includes("already exists")) {
        showErrorToast("This video is already in the selected playlist");
      } else {
        showErrorToast(errorMessage);
      }
    }
  };

  const selectedPlaylist = watch("playlistId");

  // If successfully added to playlist, show success state
  if (isSuccess) {
    return (
      <div className="h-auto w-80 sm:w-96 bg-slate-950 p-5 rounded-xl shadow-2xl max-w-md border border-slate-800 border-t-green-500/30 animate-in fade-in zoom-in-95 duration-300 ">
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <div className="p-5 bg-gradient-to-br from-green-900/40 to-green-900/10 rounded-full mb-5 animate-bounce-slow relative">
            <CheckCircle size={45} className="text-green-500 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-green-500/20 animate-ping"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2 animate-in slide-in-from-bottom duration-500 delay-75">Successfully Added!</h2>
          <p className="text-slate-300 animate-in slide-in-from-bottom duration-500 delay-150">
            Video added to <span className="font-medium text-green-500">{addedPlaylistName}</span>
          </p>
          
          <div className="flex items-center justify-center mt-4 space-x-1">
            <span className="h-1.5 w-1.5 bg-slate-600 rounded-full animate-bounce delay-75"></span>
            <span className="h-1.5 w-1.5 bg-slate-600 rounded-full animate-bounce delay-150"></span>
            <span className="h-1.5 w-1.5 bg-slate-600 rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto w-80 sm:w-96 bg-slate-950 p-5 rounded-xl shadow-2xl max-w-md border border-slate-800 border-t-orange-600/30 animate-in fade-in zoom-in-95 duration-300 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <div className="flex items-center justify-center h-7 w-7 bg-orange-600/20 rounded-full mr-2.5">
            <Plus size={15} className="text-orange-600" />
          </div>
          <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Save to playlist
          </span>
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors group relative"
          aria-label="Close"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          <span className="absolute -bottom-8 right-0 bg-slate-800 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity text-slate-200 whitespace-nowrap">Close dialog</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        {playlistData?.length === 0 && !playlistIsLoading ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full mb-4">
                <ListPlus size={30} className="text-orange-500" />
              </div>
              <div className="absolute top-0 left-0 w-full h-full rounded-full bg-orange-600/10 animate-ping"></div>
            </div>
            <h3 className="text-white font-medium mb-2">No playlists available</h3>
            <p className="text-slate-400 text-sm px-6">Create a playlist first to organize and save your favorite videos</p>
            <button 
              className="mt-4 px-4 py-2 rounded-full text-sm font-medium text-orange-50 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 transition-all shadow-lg shadow-orange-900/20 flex items-center"
              onClick={onClose}
            >
              <Plus size={16} className="mr-1.5" />
              Create Playlist
            </button>
          </div>
        ) : (
          <div className="mb-6">
            <p className="flex items-center mb-4 text-sm font-medium text-white">
              <Video size={15} className="text-orange-500 mr-1.5" />
              Select a playlist to add this video:
            </p>
            
            <div className="space-y-2.5 overflow-y-auto max-h-56 pr-2 scrollbar-thin scrollbar-thumb-orange-600/30 scrollbar-track-slate-900/30 hover:scrollbar-thumb-orange-600/50">
              {playlistIsLoading ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <SpringLoader type="dots" color="orange-600" size="small" />
                  <span className="text-sm text-slate-400 mt-2">Loading playlists...</span>
                </div>
              ) : (
                playlistData?.map((playlist) => (
                  <label
                    key={playlist._id}
                    className="flex items-center p-3 cursor-pointer hover:bg-gradient-to-r hover:from-slate-900 hover:to-slate-900/70 rounded-lg transition-all group relative"
                  >
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        value={playlist._id}
                        {...register("playlistId", {
                          required: "Please select a playlist",
                        })}
                        className="peer sr-only"
                        id={`playlist-${playlist._id}`}
                        
                      />
                      <div className="w-5 h-5 border-2 border-slate-600 peer-checked:border-orange-500 rounded-full flex-shrink-0 mr-3 transition-colors"></div>
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full absolute left-1.25 scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-white font-medium text-sm group-hover:text-orange-300 transition-colors">{playlist.name}</span>
                      <div className="flex items-center mt-0.5">
                        <Music size={12} className="text-slate-500 mr-1" />
                        <span className="text-xs text-slate-500">{playlist.videos?.length || 0} videos</span>
                      </div>
                    </div>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-600/0 group-hover:bg-orange-600/10 rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-200">
                      <Plus size={14} className="text-orange-500 opacity-0 group-hover:opacity-100" />
                    </span>
                  </label>
                ))
              )}
            </div>
            
            {errors.playlistId && (
              <div className="bg-orange-950/20 border border-orange-900/20 rounded-md px-3 py-2 mt-3 animate-in fade-in slide-in-from-top duration-300">
                <p className="text-sm text-orange-500 flex items-center">
                  <AlertCircle size={14} className="mr-1.5 flex-shrink-0" />
                  {errors.playlistId.message}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-700/50 rounded-lg text-sm font-medium text-slate-300 bg-transparent hover:bg-slate-800/50 hover:text-white transition-all focus:outline-none focus:ring-1 focus:ring-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedPlaylist || isSubmitting || playlistData?.length === 0}
            className={`px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 transition-all shadow-md shadow-orange-900/10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${
              !selectedPlaylist || isSubmitting || playlistData?.length === 0 ? "opacity-50 cursor-not-allowed from-orange-700/50 to-orange-600/50 shadow-none" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <SpringLoader type="dots" color="white" size="small" />
                <span className="ml-1.5">Adding...</span>
              </span>
            ) : (
              <span className="flex items-center">
                <Plus size={16} className="mr-1.5" />
                Add to Playlist
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddToPlaylist;
