import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreatePlaylist } from "@/Redux";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ListMusic, X, Save, Plus } from "lucide-react";

function PlaylistCreate({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { playlistIsLoading, playlistError } = useSelector(
    (state) => state.playlist
  );
  const dispatch = useDispatch();
  const descTextCount = watch("description", "");
  const remainingChars = 250 - (descTextCount?.length || 0);

  const onSubmit = async (data) => {
    try {
      await dispatch(fetchCreatePlaylist(data)).unwrap();
      if (onClose) onClose();
      reset();
    } catch (error) {
      console.error("Failed to create playlist:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-slate-950 border border-slate-800/50 shadow-xl rounded-xl overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600/20 p-2 rounded-lg">
              <ListMusic size={18} className="text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold text-white">Create Playlist</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full h-8 w-8 p-0"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Playlist Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300"
              >
                Playlist Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Playlist name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name cannot exceed 30 characters",
                  },
                })}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder:text-slate-500"
                placeholder="Enter playlist name"
              />
              {errors.name && (
                <p className="text-sm text-orange-500 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-slate-300"
                htmlFor="description"
              >
                Description
              </label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                  maxLength: {
                    value: 250,
                    message: "Description cannot exceed 250 characters",
                  },
                })}
                rows={4}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder:text-slate-500 resize-none"
                placeholder="Enter playlist description"
              />
              <div className="flex justify-between items-center pt-1.5">
                <div>
                  {errors.description && (
                    <p className="text-sm text-orange-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="text-xs text-slate-400 px-1">
                  <span className={remainingChars < 20 ? "text-orange-500" : ""}>
                    {remainingChars}
                  </span> characters remaining
                </div>
              </div>
            </div>

            {/* Error Message */}
            {playlistError && (
              <div className="px-4 py-3 bg-red-900/30 border border-red-700/50 rounded-lg">
                <p className="text-sm text-red-400">{playlistError}</p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800/50">
              <Button
                type="button"
                variant="outline"
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                onClick={() => {
                  onClose();
                  reset();
                }}
                disabled={playlistIsLoading}
              >
                <X size={16} className="mr-1" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={playlistIsLoading}
                className="bg-orange-600 hover:bg-orange-500 text-white"
              >
                {playlistIsLoading ? (
                  <>
                    <span className="animate-spin mr-1">
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={16} className="mr-1" />
                    Create Playlist
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

export default PlaylistCreate;
