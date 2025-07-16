import React from "react";
import nf from "../assets/404.png";
import { useNavigate } from "react-router-dom";
import { Home, RefreshCw, Search } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-slate-950">
      <div className="flex flex-col items-center justify-center text-center max-w-lg p-6 md:p-8 bg-slate-900/80 border border-slate-800 rounded-xl shadow-xl">
        <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mb-6">
          <Search size={28} className="text-orange-600" />
        </div>
        
        <div className="relative">
          <img 
            src={nf} 
            alt="404 Not Found" 
            className="w-full max-w-sm mx-auto rounded-lg shadow-md border border-slate-800" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent rounded-lg pointer-events-none"></div>
        </div>
        
        <h2 className="text-3xl font-bold mt-6 mb-2 text-white">Page Not Found</h2>
        <div className="w-16 h-1 bg-orange-600 rounded-full my-3 mx-auto"></div>
        <p className="text-slate-300 mb-8">The content you are looking for doesn't exist or has been moved.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full mt-2">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>Go Home</span>
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg shadow-lg transition-colors border border-slate-700 flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            <span>Refresh Page</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;