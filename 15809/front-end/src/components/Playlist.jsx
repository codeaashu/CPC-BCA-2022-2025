import { fetchUserDetail, fetchUserPlaylist } from "@/Redux";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotFound from "@/Error/NotFound";
import PlaylistCard from "./PlaylistCard";
import { FolderPlus, List, ListMusic, Music, Plus } from "lucide-react";
import EmptyContent from "@/Error/EmptyContent";
import { Button } from "./ui/button";
import PlaylistCreate from "./PlaylistCreate";
import { Skeleton } from "./ui/skeleton";

function Playlist() {
  const dispatch = useDispatch();
  const { playlistData, playlistIsLoading, playlistError } = useSelector(
    (state) => state.playlist
  );
  const { userDetail, isLoading, error } = useSelector((state) => state.user);
  const [playlistPOPCreateActive, setPlaylistPOPCreateActive] = useState(false);

  useEffect(() => {
    if (userDetail?._id) {
      dispatch(fetchUserPlaylist(userDetail._id));
    }
  }, [dispatch, userDetail]);
  
  const handlePlaylistCreatePOP = () => {
    setPlaylistPOPCreateActive(!playlistPOPCreateActive);
  };

  return playlistError ? (
    <NotFound />
  ) : (
    <div className="w-full relative max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="bg-orange-600/20 p-2.5 rounded-lg">
            <ListMusic className="h-6 w-6 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            My Playlists
          </h1>
        </div>
        
        <Button
          onClick={handlePlaylistCreatePOP}
          className="bg-orange-600 hover:bg-orange-500 text-white gap-2 rounded-lg"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">New Playlist</span>
        </Button>
      </div>

      {/* Popup Overlay */}
      {playlistPOPCreateActive && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div 
            className="w-full max-w-md p-4 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <PlaylistCreate onClose={handlePlaylistCreatePOP} />
          </div>
        </div>
      )}

      {/* Playlists Grid */}
      {playlistIsLoading || isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill().map((_, i) => (
            <div key={i} className="bg-slate-900/50 rounded-lg overflow-hidden shadow-lg border border-slate-800/50">
              <div className="aspect-video">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="p-4">
                <Skeleton className="h-5 w-full mb-3" />
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : Array.isArray(playlistData) && playlistData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlistData?.map((playlist) => (
            <div
              key={playlist._id}
              className="transition-all duration-300 hover:-translate-y-1"
            >
              <PlaylistCard data={playlist} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-slate-900/30 border border-dashed border-slate-700 text-center">
          <div className="max-w-md">
            <FolderPlus className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No playlists yet</h3>
            <p className="text-slate-400 mb-6">Create your first playlist by clicking the "New Playlist" button above.</p>
            <EmptyContent />
          </div>
        </div>
      )}
    </div>
  );
}

export default Playlist;
