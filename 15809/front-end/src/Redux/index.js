import likeReducer, { likeToggleSlice, likedVideoSlice } from "./Slices/Like";
import videoReducer, {
  fetchAllVideos,
  fetchVideoById,
  fetchDeleteVideoById,
  fetchPostVideo,
  fetchRelatedVideos,
  fetchVideoUpdate,
} from "./Slices/Video";
import authReducer, {
  fetchLogin,
  fetchLogout,
  fetchSignUp,
  resetAuthState,
} from "./Slices/Auth";
import commentReducer, {
  fetchCommentsOnVideo,
  createVideoComment,
  fetchLikeOnComment,
  fetchToggleLikeOnComment,
} from "./Slices/Comment";
import historyReducer, { fetchHistoryDetail } from "./Slices/History";
import userReducer, {
  fetchUserDetail,
  fetchUpdateAccount,
  fetchUpdateAvatar,
  fetchUpdateCoverImage,
} from "./Slices/User";
import dashboardReducer, { fetchAllChannelVideos } from "./Slices/Dashboard";
import playlistReducer, {
  fetchUserPlaylist,
  fetchCreatePlaylist,
  fetchAddVideoOnPlaylist,
  fetchRemoveVideoFromPlaylist,
  fetchDeletePlaylistById,
  fetchGetPlaylistById,
  fetchUpdatePlaylistById,
} from "./Slices/Playlist";
import subscriptionReducer, {
  fetchSubscribedChannels,
  fetchChannelSubscribers,
  fetchToggleSubscription,
} from "./Slices/Subscription";
import channelReducer, { fetchChannelDetail } from "./Slices/Channel";

export {
  likeToggleSlice,
  likedVideoSlice,
  fetchAllVideos,
  fetchVideoById,
  fetchRelatedVideos,
  fetchDeleteVideoById,
  fetchPostVideo,
  fetchLogin,
  fetchLogout,
  likeReducer,
  videoReducer,
  authReducer,
  fetchVideoUpdate,
  fetchCommentsOnVideo,
  createVideoComment,
  fetchLikeOnComment,
  fetchToggleLikeOnComment,
  commentReducer,
  historyReducer,
  fetchHistoryDetail,
  userReducer,
  fetchUserDetail,
  fetchUpdateAccount,
  fetchUpdateAvatar,
  fetchUpdateCoverImage,
  dashboardReducer,
  fetchAllChannelVideos,
  playlistReducer,
  fetchUserPlaylist,
  fetchCreatePlaylist,
  fetchAddVideoOnPlaylist,
  fetchRemoveVideoFromPlaylist,
  fetchDeletePlaylistById,
  fetchGetPlaylistById,
  fetchUpdatePlaylistById,
  subscriptionReducer,
  fetchChannelSubscribers,
  fetchSubscribedChannels,
  fetchToggleSubscription,
  channelReducer,
  fetchChannelDetail,
  fetchSignUp,
  resetAuthState,
};
