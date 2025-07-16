import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChannelVideos, fetchChannelDetail } from "@/Redux";
import EmptyContent from "@/Error/EmptyContent";
import { UserCircle, Users, Video, Film, AtSign } from "lucide-react";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    channelData, channelIsLoading, channelError
  } = useSelector((state) => state.channel);

  const {
    dashboardData,
    isLoading: dashboardLoading,
    error: dashboardError,
  } = useSelector((state) => state.dashboard);

  const {userDetail, isLoading} = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchChannelDetail(userDetail?.username));
    dispatch(fetchAllChannelVideos());
  }, [dispatch]);

  return (
    <div className="max-w-7xl bg-slate-950 shadow-xl overflow-hidden w-full rounded-lg border border-slate-800">
      {/* Cover Image */}
      <div className="relative h-48 md:h-72 w-full bg-slate-800 overflow-hidden">
        {channelIsLoading ? (
          <div className="absolute inset-0 bg-slate-800 animate-pulse"></div>
        ) : (
          <img
            src={channelData?.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
        )}
        
      </div>
        {/* Avatar */}
        <div className="relative -top-14  h-fit w-fit left-6 md:left-10">
          {channelIsLoading ? (
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-slate-800 animate-pulse border-4 border-slate-950"></div>
          ) : (
            <div className="rounded-full p-1.5 backdrop-blur-2xl bg-orange-600/50 shadow-lg shadow-slate-800">
              <img
                src={channelData?.avatar}
                alt="Avatar"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-slate-800 shadow-xl object-cover"
              />
            </div>
          )}
        </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row p-8 pt-0 gap-6 border-b border-slate-800">
        {/* User Info */}
        <div className="md:w-1/3 flex flex-col items-center text-center">
          {channelIsLoading ? (
            <>
              <div className="h-8 w-40 bg-slate-800 animate-pulse rounded mb-2"></div>
              <div className="h-5 w-28 bg-slate-800 animate-pulse rounded"></div>
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{channelData?.fullName}</h2>
              <p className="text-slate-400 flex items-center gap-1.5">
                <AtSign className="w-3.5 h-3.5 text-orange-600" />
                <span className="font-medium">{channelData?.username}</span>
              </p>
            </>
          )}
        </div>

        {/* Stats - Modern Design */}
        <div className="md:w-2/3 flex flex-row gap-4 mt-4 md:mt-0">
          {/* Subscribers Stat */}
          <div className="flex-1 relative p-5 rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-orange-600/30 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-600/10 rounded-full -mr-10 -mt-10"></div>
            {channelIsLoading ? (
              <>
                <div className="h-7 w-16 bg-slate-800 animate-pulse rounded mb-2"></div>
                <div className="h-5 w-24 bg-slate-800 animate-pulse rounded"></div>
              </>
            ) : (
              <>
                <h4 className="text-2xl font-bold text-white mb-1">{channelData?.subscribersCount || 0}</h4>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <p className="text-slate-400 text-sm font-medium">Subscribers</p>
                </div>
              </>
            )}
          </div>
          
          {/* Following Stat */}
          <div className="flex-1 relative p-5 rounded-xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-orange-600/30 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-600/10 rounded-full -mr-10 -mt-10"></div>
            {channelIsLoading ? (
              <>
                <div className="h-7 w-16 bg-slate-800 animate-pulse rounded mb-2"></div>
                <div className="h-5 w-24 bg-slate-800 animate-pulse rounded"></div>
              </>
            ) : (
              <>
                <h4 className="text-2xl font-bold text-white mb-1">{channelData?.subscribedToCount || 0}</h4>
                <div className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-orange-600" />
                  <p className="text-slate-400 text-sm font-medium">Subscribed</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content Section - Modern Design */}
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-600/10 flex items-center justify-center">
              <Film className="text-orange-600 w-5 h-5" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white">Uploaded Videos</h3>
          </div>
          
          <div className="text-xs font-medium rounded-full bg-slate-800 text-slate-300 pt-2 pb-2 pl-3 pr-3 flex flex-row justify-center items-center space-x-1.5">
            <Video className="text-orange-600"/>
            <span className="">
              {dashboardData?.length || 0} videos
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap -mx-2.5">
          {dashboardLoading
            ? Array(6)
                .fill()
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-full sm:w-1/2 lg:w-1/3 px-2.5 mb-5"
                  >
                    <div className="bg-slate-900/70 rounded-lg overflow-hidden shadow-md border border-slate-800 p-3 h-full">
                      <div className="aspect-video w-full bg-slate-800 animate-pulse rounded"></div>
                      <div className="mt-3 space-y-2">
                        <div className="h-5 bg-slate-800 animate-pulse rounded w-3/4"></div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-800 animate-pulse"></div>
                          <div className="h-4 bg-slate-800 animate-pulse rounded w-1/2"></div>
                        </div>
                        <div className="h-4 bg-slate-800 animate-pulse rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))
            : Array.isArray(dashboardData) && dashboardData.length > 0 ? (
              dashboardData.map((video) =>
                video ? (
                  <div key={video?._id} className="w-full sm:w-1/2 lg:w-1/3 px-2.5 mb-5">
                    <div className="h-full bg-slate-900/50 rounded-lg overflow-hidden border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg shadow-md">
                      <VideoCard video={video} />
                    </div>
                  </div>
                ) : null
              )
            ) : (
              <div className="w-full flex justify-center items-center py-10">
                <div className="text-center bg-slate-900/30 rounded-xl border border-dashed border-slate-700 py-12 px-8 w-full max-w-md">
                  <div className="bg-slate-800/70 p-5 rounded-full mb-4 mx-auto w-fit">
                    <Video className="w-6 h-6 text-slate-500" />
                  </div>
                  <EmptyContent />
                  <p className="mt-4 text-slate-400">No videos uploaded yet</p>
                  <button className="mt-5 px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-white text-sm font-medium">
                    Upload your first video
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
