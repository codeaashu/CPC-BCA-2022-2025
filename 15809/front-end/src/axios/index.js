import axios from "axios";
import { showSuccessToast, showErrorToast } from "../Notification/Toast";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const multipartEndpoints = ["/users/register", "/videos", "/users/avatar", "/users/cover-image", "/videos/"];

axiosInstance.interceptors.request.use(
  (config) => {
    // Only set Content-Type for requests with a body
    if (["post", "put", "patch"].includes(config.method)) {
      if (multipartEndpoints.some((endpoint) => config.url.includes(endpoint))) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Show success toast for specific actions
    if (["post", "delete", "patch"].includes(response.config.method)) {
      const successMessage = response.data?.message || "Operation successful";
      if (["/likes/toggle", "/comments", "/subscriptions", "/playlist", "/videos","/login"].some((endpoint) => response.config.url.includes(endpoint))) {
        showSuccessToast(successMessage);
      }
    }

    return response;
  },
  (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.message || "An error occurred";
      showErrorToast(errorMessage);
      if (error.response.status === 401) {
        const isApiCall = error.config.url.includes("/api/v1/") || error.config.headers["Accept"] === "application/json";
        if (!isApiCall && window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      // return Promise.reject(error);
    } else {
      showErrorToast(error || "Network error");
    }
    return Promise.reject(error);
  }
);

// Health Check

export const healthCheck = async () => {
  try {
    const response = await axiosInstance.get("/healthcheck");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Video
export const getAllVideos = async (page) => {
  try {
    const response = await axiosInstance.get(`/videos?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVideosBySearch = async (
  query = "",
  page = 1,
  sortBy = "createdAt",
  sortType = "desc"
) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      sortBy,
      sortType,
    });

    // Only add query parameter if it exists
    if (query) {
      queryParams.append("query", query);
    }

    const response = await axiosInstance.get(`/videos?${queryParams}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/videos/${videoId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postVideo = async (data) => {
  try {
    const response = await axiosInstance.post(`/videos`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteVideoById = async (videoId) => {
  try {
    const response = await axiosInstance.delete(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};


// Auth
export const isLogin = async () => {
  try {
    const response = await axiosInstance.get("/users/islogin");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data) => {
  try {
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      username: data.username,
      password: data.password,
    });
   
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get("/users/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Like
export const likeToggle = async (videoId) => {
  try {
    const response = await axiosInstance.post(`/likes/toggle/v/${videoId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const likedVideo = async () => {
  try {
    const response = await axiosInstance.get("/likes/videos");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const history = async () => {
  try {
    const response = await axiosInstance.get("/users/history");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Comment

export const getCommentsOnVideo = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/comments/${videoId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllCommentsOnVideo = async (videoId) => {
  try {
    const response = await axiosInstance.get(`/comments/${videoId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const createComment = async (videoId, data) => {
  try {
    const response = await axiosInstance.post(`/comments/${videoId}`, data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getLikedComment = async (commentId) => {
  try {
    const response = await axiosInstance.get(`/likes/comment/${commentId}`);

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const likeToggleOnComment = async (commentId) => {
  try {
    const response = await axiosInstance.post(`/likes/toggle/c/${commentId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// USER

export const userDetail = async () => {
  try {
    const response = await axiosInstance.get("/users/current-user");
    return response.data;
  } catch (error) {
    return error;
  }
};

export const channelVideos = async (username) => {
  try {
    const response = await axiosInstance.get(`/dashboard/videos/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

// below all functions work for playlist functionality

export const createPlaylist = async (data) => {
  try {
    const response = await axiosInstance.post(`/playlist`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const userPlaylist = async (userId) => {
  try {
    const response = await axiosInstance.get(`/playlist/user/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.get(`/playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const updatePlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.patch(`/playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const deletePlaylistById = async (playlistId) => {
  try {
    const response = await axiosInstance.delete(`/playlist/${playlistId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addVideoOnPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/playlist/add/${videoId}/${playlistId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const removeVideoFromPlaylist = async (videoId, playlistId) => {
  try {
    const response = await axiosInstance.patch(
      `/playlist/remove/${videoId}/${playlistId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Subscriptions

export const getSubscribedChannels = async (userId) => {
  try {
    const response = await axiosInstance.get(`/subscriptions/u/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getUserChannelSubscribers = async (userId) => {
  try {
    const response = await axiosInstance.get(`/subscriptions/c/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const toggleSubscription = async (userId) => {
  try {
    const response = await axiosInstance.post(`/subscriptions/c/${userId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
export const getChannel = async (username) => {
  try {
    const response = await axiosInstance.get(`/users/c/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
};


//  update 

export const updateAccount = async(data)=>{
  try {
    const response = await axiosInstance.patch("/users/update-account",data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateAvatar = async(data)=>{
  try {
    const response = await axiosInstance.patch("/users/avatar",data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const updateCoverImage = async(data)=>{
  try {
    const response = await axiosInstance.patch("/users/cover-image",data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const updateVideo = async(data,videoId)=>{
  try {
    const response = await axiosInstance.patch(`/videos/${videoId}`,data);
    return response.data;
  } catch (error) {
    throw error;
  }
}




export default axiosInstance;
