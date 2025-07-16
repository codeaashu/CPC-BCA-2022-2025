import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateAccount, fetchUpdateAvatar, fetchUpdateCoverImage, fetchUserDetail } from "@/Redux";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import SpringLoader from "./SpringLoader";
import { Camera, Save, X, User, Mail, ImageIcon, Upload, AlertCircle } from "lucide-react";
import { showSuccessToast, showErrorToast } from "@/Notification/Toast";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { isLoading, error, userDetail } = useSelector(state => state.user);
  
  // Tab state
  const [activeTab, setActiveTab] = useState("account"); // "account", "avatar", "cover"
  
  // File upload states
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  
  // File input refs
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  
  // Forms
  const accountForm = useForm({
    defaultValues: {
      fullName: "",
      email: ""
    }
  });
  
  const { register, handleSubmit, reset, formState: { errors } } = accountForm;
  
  // Load user details on component mount
//   useEffect(() => {
//     dispatch(fetchUserDetail());
//   }, [dispatch]);
  
  // Load user details on component mount
  useEffect(() => {
    dispatch(fetchUserDetail());
  }, [dispatch]);

  // Update form when user details are loaded
  useEffect(() => {
    if (userDetail) {
      // Update account form data
      reset({
        fullName: userDetail.fullName || "",
        email: userDetail.email || ""
      });
      
      // Set previews if available
      if (userDetail.avatar) {
        setAvatarPreview(userDetail.avatar);
      }
      
      if (userDetail.coverImage) {
        setCoverPreview(userDetail.coverImage);
      }
    }
  }, [userDetail, reset]);
  
  // Handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle account form submission
  const onAccountSubmit = (data) => {
    dispatch(fetchUpdateAccount(data))
      .unwrap()
      .then(() => {
        showSuccessToast("Account details updated successfully");
        dispatch(fetchUserDetail()); // Refresh user data
      })
      .catch((err) => {
        showErrorToast(err?.message || "Failed to update account details");
      });
  };
  
  // Handle avatar file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };
  
  // Handle cover file change
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    }
  };
  
  // Submit avatar update
  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    
    if (!avatarFile) {
      showErrorToast("Please select an image");
      return;
    }
    
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    
    dispatch(fetchUpdateAvatar(formData))
      .unwrap()
      .then(() => {
        showSuccessToast("Avatar updated successfully");
        dispatch(fetchUserDetail()); // Refresh user data
        setAvatarFile(null);
        if (avatarInputRef.current) {
          avatarInputRef.current.value = "";
        }
      })
      .catch((err) => {
        showErrorToast(err?.message || "Failed to update avatar");
      });
  };
  
  // Submit cover image update
  const handleCoverSubmit = (e) => {
    e.preventDefault();
    
    if (!coverFile) {
      showErrorToast("Please select an image");
      return;
    }
    
    const formData = new FormData();
    formData.append("coverImage", coverFile);
    
    dispatch(fetchUpdateCoverImage(formData))
      .unwrap()
      .then(() => {
        showSuccessToast("Cover image updated successfully");
        dispatch(fetchUserDetail()); // Refresh user data
        setCoverFile(null);
        if (coverInputRef.current) {
          coverInputRef.current.value = "";
        }
      })
      .catch((err) => {
        showErrorToast(err?.message || "Failed to update cover image");
      });
  };
  
  // Clear selected avatar
  const clearAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(userDetail?.avatar || "");
    if (avatarInputRef.current) {
      avatarInputRef.current.value = "";
    }
  };
  
  // Clear selected cover image
  const clearCover = () => {
    setCoverFile(null);
    setCoverPreview(userDetail?.coverImage || "");
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  return (
    <div className="update-profile-container max-w-4xl mx-auto pt-24 px-4 pb-12 bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2">
        <User className="w-8 h-8 text-orange-500" /> 
        Update Profile
      </h1>
      
      {/* Tab Navigation */}
      <div className="tab-navigation flex mb-8 border-b border-slate-700 overflow-x-auto no-scrollbar">
        <button 
          className={`py-3 px-6 font-medium flex items-center gap-2 transition-all ${activeTab === "account" 
            ? "border-b-2 border-orange-500 text-orange-500" 
            : "text-slate-300 hover:text-white"}`}
          onClick={() => handleTabChange("account")}
        >
          <User size={18} />
          Account Details
        </button>
        <button 
          className={`py-3 px-6 font-medium flex items-center gap-2 transition-all ${activeTab === "avatar" 
            ? "border-b-2 border-orange-500 text-orange-500" 
            : "text-slate-300 hover:text-white"}`}
          onClick={() => handleTabChange("avatar")}
        >
          <Camera size={18} />
          Profile Picture
        </button>
        <button 
          className={`py-3 px-6 font-medium flex items-center gap-2 transition-all ${activeTab === "cover" 
            ? "border-b-2 border-orange-500 text-orange-500" 
            : "text-slate-300 hover:text-white"}`}
          onClick={() => handleTabChange("cover")}
        >
          <ImageIcon size={18} />
          Cover Image
        </button>
      </div>
      
      {isLoading && <SpringLoader />}
      
      {/* Error Display */}
      {error && (
        <div className="error-message bg-red-900/30 text-red-400 p-5 rounded-lg mb-6 flex items-start gap-3 border border-red-800/50">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      {/* Account Details Form */}
      {activeTab === "account" && (
        <div className="account-details-form bg-slate-800/80 p-6 rounded-xl shadow-md border border-slate-700">
          <form onSubmit={handleSubmit(onAccountSubmit)} className="space-y-6">
            <div className="form-group">
              <label htmlFor="fullName" className="text-sm font-medium mb-2 text-slate-200 flex items-center gap-2">
                <User size={16} className="text-orange-500" /> Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="w-full p-3 border border-slate-700 rounded-lg 
                           bg-slate-900/80 text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full name is required",
                  pattern:{
                    value: /^[A-Za-z]+(?: [A-Za-z]+)*$/ ,
                    message: "Please enter a valid full name. Only [A-Za-z] and spaces are allowed. @,#,$..etc characters, [0-9], or extra spaces are not permitted."
                  }
                 })}
              />
              {errors.fullName && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.fullName.message}
                </p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="text-sm font-medium mb-2 text-slate-200 flex items-center gap-2">
                <Mail size={16} className="text-orange-500" /> Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 border border-slate-700 rounded-lg 
                           bg-slate-900/80 text-white
                           focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Enter your email address"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.email.message}
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white py-3 px-6 rounded-lg transition-all disabled:opacity-70 shadow-lg shadow-orange-900/20"
            >
              <Save size={18} /> Update Account Details
            </Button>
          </form>
        </div>
      )}
      
      {/* Avatar Update Form */}
      {activeTab === "avatar" && (
        <div className="avatar-form bg-slate-800/80 p-6 rounded-xl shadow-md border border-slate-700">
          <div className="avatar-preview mb-8 flex flex-col items-center justify-center">
            {avatarPreview ? (
              <div className="relative group">
                <img 
                  src={avatarPreview} 
                  alt="Avatar Preview" 
                  className="w-40 h-40 rounded-full object-cover border-4 border-slate-700 shadow-md" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-full transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Camera size={32} className="text-white" />
                </div>
                {avatarFile && (
                  <button 
                    onClick={clearAvatar}
                    className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-all"
                    title="Clear selection"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full bg-slate-700 flex items-center justify-center shadow-md">
                <Camera size={40} className="text-slate-400" />
              </div>
            )}
            <h3 className="mt-4 text-lg font-medium text-white">
              {userDetail?.fullName || "Your Profile"}
            </h3>
            <p className="text-slate-400 text-sm">
              {userDetail?.email || "Update your profile picture"}
            </p>
          </div>
          
          <form onSubmit={handleAvatarSubmit} className="space-y-5">
            <div className="form-group">
              <label htmlFor="avatar" className="text-sm font-medium mb-2 text-slate-200 flex items-center gap-2">
                <Upload size={16} className="text-orange-500" /> Select Profile Picture
              </label>
              <div className="mt-2 flex items-center justify-center w-full">
                <label htmlFor="avatar" className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={24} className="text-orange-500 mb-2" />
                    <p className="text-sm text-slate-300">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF (max. 5MB)</p>
                  </div>
                  <input
                    id="avatar"
                    type="file"
                    ref={avatarInputRef}
                    className="hidden"
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Recommended: Square image, 300x300px or larger for best quality
              </p>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                type="submit" 
                disabled={isLoading || !avatarFile} 
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition-all disabled:opacity-70 disabled:hover:bg-orange-600"
              >
                <Save size={18} /> Update Profile Picture
              </Button>
            </div>
          </form>
        </div>
      )}
      
      {/* Cover Image Update Form */}
      {activeTab === "cover" && (
        <div className="cover-image-form bg-slate-800/80 p-6 rounded-xl shadow-md border border-slate-700">
          <div className="cover-preview mb-8">
            {coverPreview ? (
              <div className="relative group overflow-hidden rounded-xl shadow-md border border-slate-700">
                <img 
                  src={coverPreview} 
                  alt="Cover Preview" 
                  className="w-full h-56 object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                  <Camera size={36} className="text-white opacity-80" />
                </div>
                {coverFile && (
                  <button 
                    onClick={clearCover}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-all"
                    title="Clear selection"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            ) : (
              <div className="w-full h-56 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl flex flex-col items-center justify-center shadow-md">
                <ImageIcon size={40} className="text-slate-500 mb-2" />
                <p className="text-slate-400 text-sm font-medium">No cover image selected</p>
              </div>
            )}
          </div>
          
          <form onSubmit={handleCoverSubmit} className="space-y-5">
            <div className="form-group">
              <label htmlFor="coverImage" className="text-sm font-medium mb-2 text-slate-200 flex items-center gap-2">
                <Upload size={16} className="text-orange-500" /> Select Cover Image
              </label>
              <div className="mt-2 flex items-center justify-center w-full">
                <label htmlFor="coverImage" className="cursor-pointer flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={24} className="text-orange-500 mb-2" />
                    <p className="text-sm text-slate-300">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG (max. 10MB)</p>
                  </div>
                  <input
                    id="coverImage"
                    type="file"
                    ref={coverInputRef}
                    className="hidden"
                    onChange={handleCoverChange}
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-3 text-center">
                Recommended: 1200x300px, landscape orientation for best display on your channel
              </p>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                type="submit" 
                disabled={isLoading || !coverFile} 
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg transition-all disabled:opacity-70 disabled:hover:bg-orange-600"
              >
                <Save size={18} /> Update Cover Image
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
