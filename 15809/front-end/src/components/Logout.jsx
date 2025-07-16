import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SpringLoader from "./SpringLoader";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "@/Redux/Slices/Auth";
import { LogOut, AlertCircle, ArrowLeft } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authIsLoading, error } = useSelector((state) => state.auth);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(fetchLogout()).unwrap();
        dispatch({ type: "RESET" });
        // Start countdown before redirecting
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate("/login");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } catch (err) {
        console.error("Error logging out:", err);
        dispatch({ type: "RESET" });
        // Don't navigate automatically on error - let user try again
      }
    };

    performLogout();

    // No cleanup needed for this approach
  }, [dispatch, navigate]);

  // If error occurs, allow manual navigation back to login
  const handleReturnToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-slate-950 to-slate-900 backdrop-blur-sm">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          {error ? (
            <div className="w-full text-center">
              <div className="mb-4 flex justify-center">
                <AlertCircle className="h-16 w-16 text-red-500" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Logout Failed</h2>
              <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg mb-4">
                <p className="text-red-200 text-sm">{error.message || "An error occurred during logout"}</p>
              </div>
              <button 
                onClick={handleReturnToLogin}
                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Login</span>
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-orange-600/20 animate-ping"></div>
                </div>
                <div className="relative flex items-center justify-center bg-slate-800 rounded-full p-4 border border-orange-600/30">
                  <LogOut className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">Logging Out</h2>
              <p className="text-slate-400 text-center mb-6">
                Please wait while we securely log you out...
              </p>
              
              <div className="mb-8">
                <SpringLoader type="bars" color="orange-600" size="small" />
              </div>
              
              {!authIsLoading && countdown > 0 && (
                <div className="text-center text-slate-400">
                  <p>Redirecting in <span className="text-orange-600 font-medium">{countdown}</span> seconds</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logout;
