import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllChannelVideos, fetchChannelDetail, fetchSubscribedChannels, fetchToggleSubscription } from "@/Redux";
import EmptyContent from "@/Error/EmptyContent";
import { useParams } from "react-router-dom";
import SpringLoader from "./SpringLoader";
import { Bell, BellOff, CheckCircle, Grid, Image, RefreshCw, UserCheck, Users, VideoIcon, Eye, BadgeCheck } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const ChannelProfile = () => {
  const dispatch = useDispatch();
  const username = useParams();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { channelData, channelIsLoading, channelError } = useSelector(
    (state) => state.channel
  );

  const {
    dashboardData,
     dashboardLoading,
    dashboardError,
  } = useSelector((state) => state.dashboard);

  const { subscribedChannels, subscriptionIsLoading, subscriptionError } =
    useSelector((state) => state.subscription);

  const { userDetail, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchChannelDetail(username?.username));
    dispatch(fetchAllChannelVideos(username?.username));
  }, [dispatch, username]);

  const toggleChannelSubscription = () => {
    dispatch(fetchToggleSubscription(channelData?._id)).then(() => {
      if (userDetail?._id) {
        dispatch(fetchSubscribedChannels(userDetail._id));
      }
    });
  };

  useEffect(() => {
    async function checkChannelIsSubscribed() {
      if (subscribedChannels && channelData) {
        const isChannelSubscribed = subscribedChannels.some(
          (channel) => channel._id === channelData._id
        );
        setIsSubscribed(isChannelSubscribed);
      }
    }
    checkChannelIsSubscribed();
  }, [channelData, subscribedChannels]);

  return (
    <div className="max-w-7xl mx-auto bg-slate-950 shadow-xl rounded-lg overflow-hidden w-full border border-slate-800/70">
      {/* Cover Image */}
      <div className="relative h-48 md:h-72 w-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        {channelIsLoading ? (
          <Skeleton className="w-full h-full" />
        ) : channelData?.coverImage ? (
          <img
            src={channelData?.coverImage}
            alt="Channel Cover"
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
            <Image size={40} className="text-slate-600 opacity-50" />
          </div>
        )}
        
        
      </div>
        {/* Avatar */}
        <div className="relative  h-fit w-fit left-6 -top-10 md:left-10">
          {channelIsLoading ? (
            <Skeleton className="w-24 h-24 md:w-28 md:h-28 rounded-full" />
          ) : (
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={channelData?.avatar}
                alt={channelData?.fullName || "Channel avatar"}
                className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-slate-950 shadow-xl object-cover"
                loading="lazy"
              />
              {channelData?.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-orange-600 rounded-full p-1 border-2 border-slate-950">
                  <BadgeCheck size={16} className="text-green" />
                </div>
              )}
            </div>
          )}
        </div>

      {/* Channel Header with Subscribe Button */}
      <div className="relative  px-6 md:px-10 pb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/50">
        {/* Channel Name and Username */}
        <div className="flex flex-col">
          {channelIsLoading ? (
            <>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-40" />
            </>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl font-semibold text-white flex items-center">
                {channelData?.fullName}
              </h2>
              <p className="text-slate-400">
                <span className="text-orange-500">@</span>{channelData?.username}
              </p>
            </>
          )}
        </div>

        {/* Subscription button */}
        <div className="flex items-center">
          {!channelIsLoading && channelData?._id !== userDetail?._id && (
            <button
              className={`px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg transition-all flex items-center gap-2 ${
                isSubscribed
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700"
                  : "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-orange-600/20 hover:from-orange-500 hover:to-orange-600"
              }`}
              onClick={toggleChannelSubscription}
              disabled={subscriptionIsLoading}
            >
              {subscriptionIsLoading ? (
                <SpringLoader type="dots" color="white" size="small" />
              ) : isSubscribed ? (
                <>
                  <UserCheck size={18} className="flex-shrink-0" />
                  <span>Subscribed</span>
                </>
              ) : (
                <>
                  <Bell size={18} className="flex-shrink-0" />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Profile Description and Stats */}
      <div className="border-b border-slate-800/50 bg-slate-900/20">
        {/* Stats Cards - Modern Horizontal Layout */}
        <div className="flex items-center justify-between flex-wrap px-6 py-5 md:px-10 md:py-6 border-b border-slate-800/30">
          <div className="flex flex-wrap gap-6 md:gap-10">
            {/* Subscribers Stat */}
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-slate-800/70 flex items-center justify-center mr-3">
                <Users size={18} className="text-orange-500" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">
                  {channelIsLoading ? <Skeleton className="h-7 w-16" /> : channelData?.subscribersCount || 0}
                </h4>
                <p className="text-slate-400 text-sm">Subscribers</p>
              </div>
            </div>
            
            {/* Following Stat */}
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-slate-800/70 flex items-center justify-center mr-3">
                <Bell size={18} className="text-orange-500" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">
                  {channelIsLoading ? <Skeleton className="h-7 w-16" /> : channelData?.subscribedToCount || 0}
                </h4>
                <p className="text-slate-400 text-sm">Following</p>
              </div>
            </div>
            
            {/* Videos Stat */}
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-slate-800/70 flex items-center justify-center mr-3">
                <VideoIcon size={18} className="text-orange-500" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">
                  {channelIsLoading ? <Skeleton className="h-7 w-16" /> : dashboardData?.length || 0}
                </h4>
                <p className="text-slate-400 text-sm">Videos</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <a href="#videos" className="px-5 py-2.5 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-2 mt-4 md:mt-0">
              <Eye size={16} />
              <span>View Videos</span>
            </a>
          </div>
        </div>
        
        {/* Description - Modern Design */}
        {/* <div className="px-6 py-7 md:px-10 md:py-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            <h3 className="text-base font-semibold text-white">About This Channel</h3>
          </div>
          
          {channelIsLoading ? (
            <div className="pl-3">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : channelData?.description ? (
            <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/30 shadow-inner">
              <p className="text-slate-300 text-sm leading-relaxed">
                {channelData.description}
              </p>
            </div>
          ) : (
            <div className="bg-slate-800/30 rounded-xl p-5 border border-dashed border-slate-700/50 flex flex-col items-center justify-center">
              <p className="text-slate-400 text-sm text-center">This channel hasn't added a description yet.</p>
            </div>
          )}
        </div> */}
      </div>

      {/* Content Section */}
      <div className="py-8 px-6 md:px-10" id="videos">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <VideoIcon size={20} className="text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">Uploaded Videos</h3>
          </div>
          
          {/* {!dashboardLoading && Array.isArray(dashboardData) && dashboardData.length > 0 && (
            <button className="text-sm text-orange-500 hover:text-orange-400 flex items-center gap-1.5">
              <RefreshCw size={14} />
              <span>Refresh</span>
            </button>
          )} */}
        </div>
        
        {/* Video Masonry Layout */}
        <div className="flex flex-wrap -mx-3">
          {dashboardLoading ? (
            // Loading Skeletons - Modern Layout
            Array(6)
              .fill()
              .map((_, i) => (
                <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
                  <div className="bg-slate-800/50 rounded-xl overflow-hidden shadow-lg border border-slate-700/30">
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
                </div>
              ))
          ) : Array.isArray(dashboardData) && dashboardData.length > 0 ? (
            // Video Cards - Modern Layout
            dashboardData.map((video) =>
              video ? (
                <div key={video?._id} className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
                  <div className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <VideoCard video={video} />
                  </div>
                </div>
              ) : null
            )
          ) : (
            // Empty State - Modern Design
            <div className="w-full">
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-800/30 py-12 px-6 flex flex-col items-center justify-center">
                <div className="bg-slate-900/50 p-5 rounded-full mb-4">
                  <VideoIcon size={32} className="text-slate-500" />
                </div>
                <EmptyContent />
                <p className="text-slate-400 mt-4 text-center">This channel hasn't uploaded any videos yet.</p>
                <button className="mt-6 px-5 py-2.5 rounded-lg text-sm font-medium bg-orange-600 hover:bg-orange-500 text-white transition-colors flex items-center gap-2">
                  <RefreshCw size={16} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelProfile;
