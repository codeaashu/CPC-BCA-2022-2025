import { useLocation, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const error = location.state?.error || "An unexpected error occurred.";

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[50vh] bg-slate-950 text-center p-8 md:p-12">
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-8 md:p-10 shadow-xl max-w-lg w-full">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-orange-600/20 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={40} className="text-orange-600" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">Oops!</h1>
          <div className="w-16 h-1 bg-orange-600 rounded-full my-4"></div>
          <p className="text-xl text-slate-300 mb-8">{error}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Home size={18} />
              <span>Go Home</span>
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg shadow-lg flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
