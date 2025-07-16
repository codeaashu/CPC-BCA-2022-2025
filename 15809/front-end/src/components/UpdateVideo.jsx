import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { fetchVideoUpdate, fetchVideoById } from "@/Redux";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Save, Loader2, Upload, X, PencilLine, FileVideo, ImageIcon, Film, AlertCircle } from "lucide-react";
import SpringLoader from "./SpringLoader";
import { Textarea } from "./ui/textarea";

function UpdateVideo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { videoLoading, videoError, 
    selectedVideo
   } = useSelector((state) => state.video);
  
  const { videoId } = useParams();
  
  // File upload states
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  
  // File input ref
  const thumbnailInputRef = useRef(null);
  
  // Form setup
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      description: "",
    }
  });
  
  // Fetch video details on component mount
  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoById(videoId));
    }
  }, [dispatch, videoId]);
  
  // Update form when video details are loaded
  useEffect(() => {
    if (selectedVideo) {
      reset({
        title: selectedVideo.title || "",
        description: selectedVideo.description || "",
      });
      
      // Set thumbnail preview if available
      if (selectedVideo.thumbnail) {
        setThumbnailPreview(selectedVideo.thumbnail);
      }
    }
  }, [selectedVideo, reset]);
  
  // Handle thumbnail file change
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };
  
  // Clear selected thumbnail
  const clearThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(selectedVideo?.thumbnail || "");
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };
  
  // Handle form submission
  const onSubmit = (formData) => {
    const updateData = new FormData();
    
    // Add form fields to FormData
    updateData.append("title", formData.title);
    updateData.append("description", formData.description);
    
    // Add thumbnail if selected
    if (thumbnailFile) {
      updateData.append("thumbnail", thumbnailFile);
    }
    
    dispatch(fetchVideoUpdate({ data: updateData, videoId }))
      .unwrap()
      .then(() => {
        
        navigate(`/video/${videoId}`); // Navigate to video page
      })
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-slate-950 min-h-screen text-white">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <div className="bg-orange-600/20 p-2.5 rounded-lg">
          <PencilLine className="h-6 w-6 text-orange-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Update Video</h1>
      </div>
      
      {videoLoading && (
        <div className="flex justify-center items-center py-10">
          <SpringLoader />
        </div>
      )}
      
      {videoError && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-900/30 rounded-lg flex items-start gap-3 text-red-400">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading video</p>
            <p className="text-sm opacity-90 mt-1">{videoError}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-slate-900/50 p-6 rounded-lg border border-slate-800 shadow-lg">
        <div className="space-y-2 pb-2 mb-2 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <FileVideo className="w-4 h-4 text-orange-600" />
            <h2 className="text-lg font-medium text-white">Video Details</h2>
          </div>
          <p className="text-xs text-slate-400">Update information about your video</p>
        </div>
        
        {/* Video Title */}
        <div className="form-group">
          <label htmlFor="title" className="flex items-center gap-1.5 text-sm font-medium mb-2 text-white">
            <Film className="w-4 h-4 text-orange-600" />
            Video Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-md text-white
            focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
            placeholder:text-slate-500 transition-all"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter video title"
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-2">{errors.title.message}</p>
          )}
        </div>
        
        {/* Video Description */}
        <div className="form-group">
          <label htmlFor="description" className="flex items-center gap-1.5 text-sm font-medium mb-2 text-white">
            <PencilLine className="w-4 h-4 text-orange-600" />
            Description
          </label>
          <Textarea
            id="description"
            rows="5"
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-md text-white
            focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
            placeholder:text-slate-500 transition-all resize-none"
            {...register("description", { required: "Description is required" })}
            placeholder="Enter video description"
          />
          {errors.description && (
            <p className="text-red-400 text-xs mt-2">{errors.description.message}</p>
          )}
        </div>
        
        {/* Thumbnail */}
        <div className="form-group pt-2 border-t border-slate-800">
          <div className="flex items-center gap-1.5 mb-4">
            <ImageIcon className="w-4 h-4 text-orange-600" />
            <label className="text-sm font-medium text-white">Thumbnail</label>
          </div>
          
          <div className="thumbnail-preview mb-6 bg-slate-900/70 p-4 rounded-lg border border-dashed border-slate-700">
            {thumbnailPreview ? (
              <div className="relative group">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail Preview" 
                  className="w-full max-w-md h-auto rounded-md border border-slate-700 object-cover aspect-video mx-auto shadow-lg" 
                />
                {thumbnailFile && (
                  <button 
                    type="button"
                    onClick={clearThumbnail}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 
                    shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                    title="Clear selection"
                  >
                    <X size={16} />
                  </button>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-md"></div>
              </div>
            ) : (
              <div className="w-full max-w-md h-48 bg-slate-900 border border-slate-800 rounded-md flex flex-col items-center justify-center gap-2 mx-auto">
                <Upload size={36} className="text-slate-600" />
                <p className="text-sm text-slate-500">No thumbnail selected</p>
              </div>
            )}
          </div>
          
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <label htmlFor="thumbnail" className="flex items-center gap-1.5 text-sm font-medium mb-2.5 text-white">
              <Upload className="w-4 h-4 text-orange-600" />
              Upload New Thumbnail
            </label>
            <input
              id="thumbnail"
              type="file"
              ref={thumbnailInputRef}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 
              file:rounded-md file:border-0 file:text-sm file:font-medium 
              file:bg-orange-600/10 file:text-orange-600 text-slate-300
              file:hover:bg-orange-600/20 cursor-pointer bg-slate-900 border border-slate-700 rounded-md p-1.5"
              onChange={handleThumbnailChange}
              accept="image/*"
            />
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
              Recommended: 1280x720 (16:9 aspect ratio)
            </p>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
          <Button 
            type="submit" 
            disabled={videoLoading} 
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-6 rounded-md transition-colors disabled:bg-orange-600/50 disabled:cursor-not-allowed"
          >
            {videoLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Update Video</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateVideo;
