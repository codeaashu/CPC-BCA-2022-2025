import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignUp, resetAuthState } from "@/Redux";
import SpringLoader from "./SpringLoader";
import { Upload, CheckCircle, PlayCircle, User, AtSign, KeyRound, ImageIcon, AlertTriangle, CircleCheckBig } from "lucide-react";

// Utility functions for sanitization
const sanitizeInput = (value) => {
  if (typeof value !== "string") return value;
  // Remove leading/trailing whitespace and escape HTML special chars
  return value.trim().replace(/[<>"'&]/g, "");
};

// Password strength check
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, feedback: "" };
  
  let score = 0;
  const feedback = [];
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Complexity checks
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Add uppercase letter");
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Add lowercase letter");
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push("Add number");
  
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push("Add special character");
  
  return { 
    score: Math.min(5, score), 
    feedback: feedback.slice(0, 2).join(", ")
  };
};

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authIsLoading, authError, success } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: "" });
  const [formComplete, setFormComplete] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange"
  });

  // Watch for file changes to create previews
  const avatarFile = watch("avatar");
  const coverImageFile = watch("coverImage");
  const password = watch("password");
  
  // Update password strength when password changes
  useEffect(() => {
    if (password) {
      setPasswordStrength(getPasswordStrength(password));
    } else {
      setPasswordStrength({ score: 0, feedback: "" });
    }
  }, [password]);
  
  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [avatarFile]);
  
  useEffect(() => {
    if (coverImageFile && coverImageFile.length > 0) {
      const file = coverImageFile[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [coverImageFile]);

  const onSubmit = async (data) => {
    try {
      // Sanitize all string inputs
      const sanitizedData = {
        fullName: sanitizeInput(data.fullName),
        email: sanitizeInput(data.email),
        username: sanitizeInput(data.username),
        password: sanitizeInput(data.password),
        avatar: data.avatar,
        coverImage: data.coverImage,
      };
      
      const formData = new FormData();
      formData.append("fullName", sanitizedData.fullName);
      formData.append("email", sanitizedData.email);
      formData.append("username", sanitizedData.username);
      formData.append("password", sanitizedData.password);
      
      // Make sure files are valid before appending
      if (sanitizedData.avatar && sanitizedData.avatar.length > 0 && sanitizedData.avatar[0].size > 0) {
        formData.append("avatar", sanitizedData.avatar[0]);
      } else {
        console.warn("Avatar file is missing or empty");
        return; // Prevent form submission with invalid files
      }
      
      if (sanitizedData.coverImage && sanitizedData.coverImage.length > 0 && sanitizedData.coverImage[0].size > 0) {
        formData.append("coverImage", sanitizedData.coverImage[0]);
      } else {
        console.warn("Cover image file is missing or empty");
        return; // Prevent form submission with invalid files
      }

      // Send the form data to the server
      dispatch(fetchSignUp(formData));
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  useEffect(() => {
    if (success) {
      reset(); 
      dispatch(resetAuthState()); 
      navigate("/login"); 
    }
  }, [success, dispatch, navigate, reset]);
  
  // Check if all form fields are complete
  useEffect(() => {
    const checkFormCompletion = async () => {
      if (currentStep === 2) {
        const step1Valid = await trigger(["fullName", "username", "email"], { shouldFocus: false });
        const step2Valid = await trigger(["password", "confirmPassword"], { shouldFocus: false });
        const step3Valid = avatarPreview && coverImagePreview;
        
        setFormComplete(step1Valid && step2Valid && step3Valid);
      }
    };
    
    checkFormCompletion();
  }, [currentStep, trigger, avatarPreview, coverImagePreview]);

  // Check if current step fields are valid
  const checkStepValidity = async (step) => {
    let fieldsToValidate = [];
    switch(step) {
      case 0:
        fieldsToValidate = ["fullName", "username", "email"];
        break;
      case 1:
        fieldsToValidate = ["password", "confirmPassword"];
        break;
      case 2:
        fieldsToValidate = ["avatar", "coverImage"];
        break;
      default:
        return false;
    }
    
    const result = await trigger(fieldsToValidate);
    return result;
  };

  // Handle next step button click
  const handleNextStep = async () => {
    const isStepValid = await checkStepValidity(currentStep);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle back button click
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };


  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-3 overflow-y-auto">
        <div className="w-full max-w-lg py-2">
          <div className="bg-slate-900 shadow-2xl rounded-2xl px-5 py-4 mb-3 border border-slate-800">
            <div className="text-center mb-3">
              <h2 className="text-2xl font-bold mb-1 text-orange-600">Create Account</h2>
              <p className="text-slate-400 text-sm">
                Join our community and enjoy all features
              </p>
              {authError && (
                <div className="bg-red-900/30 border border-red-800 text-red-200 px-3 py-2 rounded-lg mt-2 flex items-center justify-center gap-2" role="alert">
                  <AlertTriangle size={14} className="text-red-300" />
                  <p className="text-center text-xs">{authError}</p>
                </div>
              )}
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-center mb-5">
              <div className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === 0 
                    ? 'bg-orange-600 ring-2 ring-orange-500/50' 
                    : currentStep > 0 
                      ? 'bg-orange-600' 
                      : 'bg-slate-700'
                } text-white shadow-md transition-all duration-300 text-sm font-medium`}>
                  1
                </div>
                <div className={`w-8 h-0.5 ${currentStep >= 1 ? 'bg-orange-600' : 'bg-slate-700'} transition-all duration-300`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === 1 
                    ? 'bg-orange-600 ring-2 ring-orange-500/50' 
                    : currentStep > 1 
                      ? 'bg-orange-600' 
                      : 'bg-slate-700'
                } text-white shadow-md transition-all duration-300 text-sm font-medium`}>
                  2
                </div>
                <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-orange-600' : 'bg-slate-700'} transition-all duration-300`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep === 2 
                    ? 'bg-orange-600 ring-2 ring-orange-500/50' 
                    : currentStep > 2 
                      ? 'bg-orange-600' 
                      : 'bg-slate-700'
                } text-white shadow-md transition-all duration-300 text-sm font-medium`}>
                  3
                </div>
              </div>
            </div>
            
            {/* Step Labels */}
            <div className="flex justify-center mb-4 text-xs text-slate-400 space-x-5">
              <div className={`${currentStep === 0 ? 'text-orange-500 font-medium' : ''}`}>Profile</div>
              <div className={`${currentStep === 1 ? 'text-orange-500 font-medium' : ''}`}>Security</div>
              <div className={`${currentStep === 2 ? 'text-orange-500 font-medium' : ''}`}>Media</div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2 min-h-[300px]">
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <>
                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1" htmlFor="fullName">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <User size={16} className="absolute left-2.5 text-slate-400" />
                        <input
                          className={`appearance-none block w-full pl-8 pr-3 py-1.5 border ${errors.fullName ? 'border-red-500' : 'border-slate-700'} rounded-md bg-slate-800 text-slate-200 leading-tight focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition duration-200`}
                          id="fullName"
                          type="text"
                          placeholder="Mohan Kumar"
                          {...register("fullName", {
                            required: "Full Name is required",
                            minLength: { value: 2, message: "Full Name must be at least 2 characters" },
                            maxLength: { value: 50, message: "Full Name must be less than 50 characters" },
                            pattern: {
                              value: /^[a-zA-Z\s.'-]+$/,
                              message: "Full Name contains invalid characters",
                            },
                            validate: value => sanitizeInput(value) === value || "Full Name contains invalid characters"
                          })}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1" htmlFor="username">
                        Username
                      </label>
                      <div className="relative flex items-center">
                        <User size={16} className="absolute left-2.5 text-slate-400" />
                        <input
                          className={`appearance-none block w-full pl-8 pr-3 py-1.5 border ${errors.username ? 'border-red-500' : 'border-slate-700'} rounded-md bg-slate-800 text-slate-200 leading-tight focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition duration-200`}
                          id="username"
                          type="text"
                          placeholder="username123"
                          {...register("username", {
                            required: "Username is required",
                            minLength: { value: 3, message: "Username must be at least 3 characters" },
                            maxLength: { value: 20, message: "Username must be less than 20 characters" },
                            pattern: {
                              value: /^[a-zA-Z0-9_.-]+$/,
                              message: "Username can only contain letters, numbers, underscores, dots, and hyphens",
                            },
                            validate: value => sanitizeInput(value) === value || "Username contains invalid characters"
                          })}
                        />
                      </div>
                      {errors.username && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {errors.username.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1" htmlFor="email">
                        Email
                      </label>
                      <div className="relative flex items-center">
                        <AtSign size={16} className="absolute left-2.5 text-slate-400" />
                        <input
                          className={`appearance-none block w-full pl-8 pr-3 py-1.5 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-md bg-slate-800 text-slate-200 leading-tight focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition duration-200`}
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Invalid email address",
                            },
                            validate: value => sanitizeInput(value) === value || "Email contains invalid characters"
                          })}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {/* Step 2: Security */}
                {currentStep === 1 && (
                  <>
                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1" htmlFor="password">
                        Password
                      </label>
                      <div className="relative flex items-center">
                        <KeyRound size={16} className="absolute left-2.5 text-slate-400" />
                        <input
                          className={`appearance-none block w-full pl-8 pr-3 py-1.5 border ${errors.password ? 'border-red-500' : 'border-slate-700'} rounded-md bg-slate-800 text-slate-200 leading-tight focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition duration-200`}
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "Password must be at least 8 characters" },
                            maxLength: { value: 64, message: "Password must be less than 64 characters" },
                            validate: value =>
                              /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) || 
                              "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                          })}
                        />
                      </div>
                      
                      {/* Password strength meter */}
                      {password && (
                        <div className="mt-1.5">
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((level) => (
                                <div 
                                  key={level}
                                  className={`h-1.5 w-5 rounded-sm ${
                                    passwordStrength.score >= level
                                    ? level <= 2 
                                      ? 'bg-red-500' 
                                      : level <= 4 
                                        ? 'bg-orange-500' 
                                        : 'bg-green-500'
                                    : 'bg-slate-700'
                                  }`}
                                ></div>
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">
                              {passwordStrength.score <= 2 && passwordStrength.score > 0
                                ? "Weak" 
                                : passwordStrength.score <= 4 
                                  ? "Medium" 
                                  : passwordStrength.score === 5 
                                    ? "Strong" 
                                    : ""}
                            </span>
                          </div>
                          {passwordStrength.feedback && (
                            <p className="text-xs text-orange-400">
                              Tip: {passwordStrength.feedback}
                            </p>
                          )}
                        </div>
                      )}
                      
                      {errors.password && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <div className="relative flex items-center">
                        <KeyRound size={16} className="absolute left-2.5 text-slate-400" />
                        <input
                          className={`appearance-none block w-full pl-8 pr-3 py-1.5 border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700'} rounded-md bg-slate-800 text-slate-200 leading-tight focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent transition duration-200`}
                          id="confirmPassword"
                          type="password"
                          placeholder="Password"
                          {...register("confirmPassword", {
                            required: "Please confirm your password",
                            validate: value => 
                              value === watch("password") || "Passwords do not match"
                          })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 flex space-x-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-full flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-md text-base font-medium text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {/* Step 3: Profile Images */}
                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1" htmlFor="avatar">
                        Profile Picture
                      </label>
                      <div className={`flex ${avatarPreview ? 'flex-col' : 'items-center justify-center'} px-3 py-2 border border-dashed border-slate-700 rounded-md bg-slate-800/50 hover:bg-slate-800 transition duration-300`}>
                        {avatarPreview ? (
                          <div className="w-full mb-2">
                            <div className="relative w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-orange-600">
                              <img 
                                src={avatarPreview} 
                                alt="Profile Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex justify-center">
                              <label htmlFor="avatar" className="cursor-pointer inline-flex items-center justify-center px-3 py-1 bg-orange-600 rounded-md font-medium text-xs text-white hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-200">
                                <span>Change Photo</span>
                                <input 
                                  id="avatar" 
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  {...register("avatar", {
                                    required: "Profile picture is required",
                                    validate: files =>
                                      files && files[0] && files[0].type.startsWith("image/") || "File must be an image"
                                  })}
                                />
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <Upload className="h-6 w-6 text-slate-500" />
                            <div className="flex flex-col items-start ml-3 flex-1">
                              <label htmlFor="avatar" className="cursor-pointer inline-flex items-center justify-center px-3 py-1 bg-orange-600 rounded-md font-medium text-xs text-white hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-200">
                                <span>Upload Profile</span>
                                <input 
                                  id="avatar" 
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  {...register("avatar", {
                                    required: "Profile picture is required",
                                    validate: files =>
                                      files && files[0] && files[0].type.startsWith("image/") || "File must be an image"
                                  })}
                                />
                              </label>
                              <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.avatar && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {errors.avatar.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-slate-300 text-xs font-medium mb-1" htmlFor="coverImage">
                        Cover Image
                      </label>
                      <div className={`flex ${coverImagePreview ? 'flex-col' : 'items-center justify-center'} px-3 py-2 border border-dashed border-slate-700 rounded-md bg-slate-800/50 hover:bg-slate-800 transition duration-300`}>
                        {coverImagePreview ? (
                          <div className="w-full mb-2">
                            <div className="relative w-full h-24 mx-auto mb-2 rounded-md overflow-hidden border-2 border-orange-600">
                              <img 
                                src={coverImagePreview} 
                                alt="Cover Preview" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex justify-center">
                              <label htmlFor="coverImage" className="cursor-pointer inline-flex items-center justify-center px-3 py-1 bg-orange-600 rounded-md font-medium text-xs text-white hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-200">
                                <span>Change Cover</span>
                                <input 
                                  id="coverImage" 
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  {...register("coverImage", {
                                    required: "Cover image is required",
                                    validate: files =>
                                      files && files[0] && files[0].type.startsWith("image/") || "File must be an image"
                                  })}
                                />
                              </label>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full">
                            <ImageIcon className="h-6 w-6 text-slate-500" />
                            <div className="flex flex-col items-start ml-3 flex-1">
                              <label htmlFor="coverImage" className="cursor-pointer inline-flex items-center justify-center px-3 py-1 bg-orange-600 rounded-md font-medium text-xs text-white hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-200">
                                <span>Upload Cover</span>
                                <input 
                                  id="coverImage" 
                                  type="file"
                                  accept="image/*"
                                  className="sr-only"
                                  {...register("coverImage", {
                                    required: "Cover image is required",
                                    validate: files =>
                                      files && files[0] && files[0].type.startsWith("image/") || "File must be an image"
                                  })}
                                />
                              </label>
                              <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.coverImage && (
                        <p className="text-red-400 text-xs mt-0.5">
                          {errors.coverImage.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 flex space-x-4">
                      <button
                        type="button"
                        onClick={handlePrevStep}
                        className="w-full flex justify-center py-2 px-4 border border-slate-600 rounded-md shadow-md text-base font-medium text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-500 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white 
                        ${formComplete ? 'bg-orange-600 hover:bg-orange-700' : 'bg-slate-600 cursor-not-allowed'}
                        focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all duration-300`}
                        type="submit"
                        disabled={authIsLoading || !formComplete}
                      >
                        {authIsLoading ? (
                          <span className="inline-flex items-center">
                            <SpringLoader/>
                          </span>
                        ) : formComplete ? 'Create Account' : 'Complete All Fields'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>

          <div className="text-center text-slate-400 mt-4 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Right side decorative panel - only visible on large screens */}
      {/* <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-orange-600/20  flex-col to-transparent items-center justify-center p-8">
        <div className="max-w-lg">
          <PlayCircle size={80} className="text-orange-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-center text-white mb-4">
            Join our Video Platform
          </h1>
          <p className="text-slate-300 text-center mb-8">
            Share your creativity with the world. Connect with creators and discover amazing content.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <CheckCircle size={28} className="text-orange-500 mx-auto mb-2" />
              <p className="text-white font-medium">Unlimited Videos</p>
            </div>
            <div className="text-center">
              <CheckCircle size={28} className="text-orange-500 mx-auto mb-2" />
              <p className="text-white font-medium">HD Streaming</p>
            </div>
            <div className="text-center">
              <CheckCircle size={28} className="text-orange-500 mx-auto mb-2" />
              <p className="text-white font-medium">Global Community</p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="hidden md:block md:w-1/2 bg-gradient-to-tr from-orange-600/30 to-transparent p-12">
        <div className="h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-6">Welcome to <span className="text-orange-500">InTube</span></h1>
          <p className="text-blue-100 mb-8 text-lg">Join our community and start sharing your videos with the world.</p>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-medium text-white mb-4">Why sign up?</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-blue-50 space-x-2">
                <CircleCheckBig className="text-orange-600"/>
                <span>Upload and share your videos</span>
              </li>
              <li className="flex items-center text-blue-50 space-x-2 ">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600/20 flex items-center justify-center mr-2">
                   <CircleCheckBig className="text-orange-600 "/>
                </span>
                <span>Create playlists and collections</span>
              </li>
              <li className="flex items-center text-blue-50 space-x-2">
                 <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600/20 flex items-center justify-center mr-2">
                   <CircleCheckBig className="text-orange-600 "/>
                </span>
                <span>Follow your favorite creators</span>
              </li>
              <li className="flex items-center text-blue-50 space-x-2">
                 <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600/20 flex items-center justify-center mr-2">
                   <CircleCheckBig className="text-orange-600 "/>
                </span>
                <span>Comment and interact with content</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
