import React, { useEffect, useState } from "react";
import nic from "../assets/noInternetConnection.png";
import { cacheImage } from "../utils/imageCache";
import CachedImage from "../components/CachedImage";
import { WifiOff, RefreshCw } from "lucide-react";

function NoInternetConnected() {
  const [isCaching, setIsCaching] = useState(true);

  useEffect(() => {
    const cacheNoInternetImage = async () => {
      try {
        console.log("Caching no internet connection image");
        await cacheImage("noInternet", nic);
      } catch (error) {
        console.warn("Failed to cache offline image:", error);
      } finally {
        setIsCaching(false);
      }
    };

    cacheNoInternetImage();
  }, []);
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-slate-950 text-white">
      <div className="text-center p-8 max-w-md bg-slate-900/80 border border-slate-800 rounded-xl shadow-xl">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 rounded-full bg-orange-600/20 flex items-center justify-center">
            <WifiOff className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-white">No Internet Connection</h2>

        <div className="relative rounded-lg overflow-hidden border border-slate-800 mb-6 flex justify-center items-center">
          {/* <CachedImage
            src={nic}
            alt="No Internet Connection"
            cacheKey="noInternet"
            className="h-64 w-auto object-contain mx-auto"
            onError={(e) => console.error("Failed to load image:", e)}
          /> */}
          <WifiOff className="h-52 w-52 text-orange-600"/>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/30 pointer-events-none"></div>
        </div>

        <p className="mb-8 text-slate-300">
          Please check your network connection and try again.
        </p>

        <button
          onClick={handleRefresh}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 mx-auto shadow-lg"
        >
          <RefreshCw className="h-5 w-5" />
          <span>Refresh Page</span>
        </button>
      </div>
    </div>
  );
}

export default NoInternetConnected;
