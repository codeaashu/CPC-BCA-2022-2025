import React from "react";
import emtc from "../assets/emptyContent.png";
import { RefreshCw } from "lucide-react";

function EmptyContent() {
  const handleRefresh = () => {
    window.location.reload();
  };
  
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={emtc} alt="No content available" className="max-h-64 w-auto opacity-90" />
      <button
        onClick={handleRefresh}
        className="mt-4 px-4 py-2 bg-orange-600/10 text-orange-500 rounded-lg hover:bg-orange-600/20 transition-colors flex items-center gap-2 border border-orange-600/20"
      >
        <RefreshCw size={16} className="animate-spin-slow" />
        <span>Refresh</span>
      </button>
    </div>
  );
}

export default EmptyContent;