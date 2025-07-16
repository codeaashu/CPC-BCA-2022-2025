import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "@/Redux/Slices/Auth";
import SpringLoader from "./SpringLoader";
import CookiePermission from "./Permission/CookiePermission";
import { useDebounceClick } from "@/Hooks/useDebounceClick";
import { User, KeyRound, LogIn, AlertCircle, CircleCheckBig } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authData, authIsLoading, authError } = useSelector(
    (state) => state.auth
  );




  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Sanitize input function
  const sanitizeInput = (value) => {
    if (typeof value !== "string") return value;
    // Remove leading/trailing whitespace and escape HTML special chars
    return value.trim().replace(/[<>"'&]/g, "");
  };

  const onSubmit = useDebounceClick(async (data) => {
    try {
      // Sanitize inputs before dispatching
      const sanitizedData = {
        username: sanitizeInput(data.username),
        password: sanitizeInput(data.password)
      };
      
      const result = await dispatch(fetchLogin(sanitizedData));
      if (result?.payload?.user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Error handling is now done through Redux state
    }
  }, 500);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Cookie permission notification - will only show when third-party cookies are blocked */}
      <CookiePermission />

      {/* Left side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-3 overflow-y-auto">
        <div className="w-full max-w-md py-2">
          <div className="bg-slate-900 shadow-2xl rounded-2xl px-5 py-6 mb-3 border border-slate-800 relative">
            {/* Loading overlay */}
            {authIsLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-slate-900/80 backdrop-blur-sm z-10 rounded-2xl">
                <SpringLoader />
              </div>
            )}

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1 text-orange-600">Welcome Back</h2>
              <p className="text-slate-400 text-sm">
                Sign in to continue to your account
              </p>
              {authError && (
                <div className="bg-red-900/30 border border-red-800 text-red-200 px-3 py-2 rounded-lg mt-3 flex items-center justify-center gap-2" role="alert">
                  <AlertCircle size={14} className="text-red-300" />
                  <p className="text-center text-xs">{authError}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    {...register("username", { required: "Username is required" })}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-400 text-xs mt-0.5">
                    {errors.username.message}
                  </p>
                )}
              </div>

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
                    {...register("password", { required: "Password is required" })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-0.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-md text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                  type="submit"
                  disabled={authIsLoading}
                >
                  <LogIn size={18} />
                  Sign In
                </button>
              </div>

              <div className="text-center text-slate-400 text-sm pt-2">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Create Account
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right side decorative panel - only visible on large screens */}
      <div className="hidden lg:block lg:w-1/2 bg-slate-950 p-6 relative overflow-y-auto">
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-br from-orange-600/20 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-radial from-orange-600/10 via-transparent to-transparent"></div>
        
        <div className="min-h-full flex flex-col justify-center relative z-10 py-4">
          <div className="flex items-center mb-5">
            <div className="h-8 w-8 bg-orange-600 rounded-md flex items-center justify-center mr-2">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">InTube</h1>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-3 leading-tight">Welcome to <span className="text-orange-500">InTube</span></h1>
          <p className="text-slate-300 mb-5 text-sm leading-relaxed max-w-lg">Sign in to access your account and continue your journey with us. Explore videos, create content, and connect with the community.</p>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-lg p-5 border border-slate-700/50">
            <h3 className="text-lg font-medium text-white mb-3">Access Your Features</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-slate-300">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600/20 flex items-center justify-center mr-2">
                   <CircleCheckBig className="text-orange-600 "/>
                </span>
                <span className="text-sm">Your personalized content dashboard</span>
              </li>
              <li className="flex items-center text-slate-300">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600/20 flex items-center justify-center mr-2">
                   <CircleCheckBig className="text-orange-600 "/>
                </span>
                <span className="text-sm">Access to your saved videos and playlists</span>
              </li>
              <li className="flex items-center text-slate-300">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600/20 flex items-center justify-center mr-2">
                   <CircleCheckBig className="text-orange-600 "/>
                </span>
                <span className="text-sm">Manage your uploaded content</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute bottom-10 right-10">
          <div className="h-40 w-40 rounded-full bg-orange-600/10 blur-2xl"></div>
        </div>
        <div className="absolute top-10 left-10">
          <div className="h-20 w-20 rounded-full bg-orange-600/10 blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
