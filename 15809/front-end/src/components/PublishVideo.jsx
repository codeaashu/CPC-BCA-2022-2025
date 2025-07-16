import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostVideo } from "@/Redux";
import { Textarea } from "./ui/textarea";
import { Upload, FileText, Image } from "lucide-react";

const PublishVideo = () => {
  const dispatch = useDispatch();
  const { videoLoading, videoError } = useSelector((state) => state.video);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);

    await dispatch(fetchPostVideo(formData)).unwrap();
    reset();

    console.log(formData);
  };

  return (
    <div className="min-h-screen w-full p-3 md:p-6 flex items-center justify-center bg-slate-900">
      <div className="w-full max-w-[1000px] p-6 md:p-8 bg-slate-950 shadow-xl rounded-lg border border-slate-800">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-white flex items-center justify-center gap-3">
          <Upload className="w-6 h-6 text-orange-600" />
          <span>Publish Video</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
            {/* Left Side - File Uploads */}
            <div className="w-full lg:flex-1 space-y-6">
              {/* Video File */}
              <div className="p-4 md:p-6 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 transition-colors group">
                <label
                  htmlFor="videoFile"
                  className="flex items-center gap-2 text-base md:text-lg font-medium mb-3 text-white cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-orange-600" />
                  <span>Video File</span>
                </label>
                <input
                  type="file"
                  id="videoFile"
                  {...register("videoFile", {
                    required: "Video file is required",
                  })}
                  accept="video/*"
                  className="w-full text-sm md:text-base text-slate-300 file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border-0 file:text-sm file:font-medium 
                  file:bg-orange-600/10 file:text-orange-600 
                  hover:file:bg-orange-600/20 cursor-pointer"
                />
                {errors.videoFile && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.videoFile.message}
                  </p>
                )}
              </div>

              {/* Thumbnail */}
              <div className="p-4 md:p-6 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 transition-colors group">
                <label
                  htmlFor="thumbnail"
                  className="flex items-center gap-2 text-base md:text-lg font-medium mb-3 text-white cursor-pointer"
                >
                  <Image className="w-5 h-5 text-orange-600" />
                  <span>Thumbnail</span>
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  {...register("thumbnail", {
                    required: "Thumbnail is required",
                  })}
                  accept="image/*"
                  className="w-full text-sm md:text-base text-slate-300 file:mr-4 file:py-2 file:px-4 
                  file:rounded-md file:border-0 file:text-sm file:font-medium 
                  file:bg-orange-600/10 file:text-orange-600 
                  hover:file:bg-orange-600/20 cursor-pointer"
                />
                {errors.thumbnail && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Side - Text Fields */}
            <div className="w-full lg:flex-1 space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-base md:text-lg font-medium mb-3 text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-colors placeholder:text-slate-500"
                  placeholder="Enter video title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-base md:text-lg font-medium mb-3 text-white"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-orange-600 transition-colors placeholder:text-slate-500"
                  rows="5"
                  placeholder="Enter video description"
                ></Textarea>
                {errors.description && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={videoLoading}
              className="w-full md:w-auto px-8 py-3 bg-orange-600 text-white rounded-md font-medium 
              hover:bg-orange-700 transition-colors disabled:bg-orange-600/50 disabled:cursor-not-allowed 
              min-w-[200px] flex items-center justify-center gap-2"
            >
              {videoLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Publish Video</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {videoError && (
          <div className="mt-6 text-center text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-md text-sm md:text-base">
            Error: {videoError}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishVideo;
