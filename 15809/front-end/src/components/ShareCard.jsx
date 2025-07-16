import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
  Facebook,
  Mail,
  Share2,
  Video,
  PlaySquare,
} from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/Notification/Toast";

const ShareCard = ({ propId, type = "video" }) => {
  const params = useParams();
  const [copied, setCopied] = useState(false);
  const baseURL = window.location.origin;

  // Get ID based on type and props/params
  const id = propId || (type === "video" ? params.videoId : params.playlistId);
  const shareURL = `${baseURL}/${type}/${id}`;

  // Share message based on content type
  const shareMessage =
    type === "playlist"
      ? "Check out this awesome playlist!"
      : "Check out this awesome video!";

  // Reset copy status after 3 seconds
  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [copied]);

  function handleCopy() {
    navigator.clipboard
      .writeText(shareURL)
      .then(() => {
        setCopied(true);
        showSuccessToast("Link copied to clipboard");
      })
      .catch(() => showErrorToast("Failed to copy link"));
  }

  return (
    <div className="flex flex-col gap-4 bg-slate-950 p-5 rounded-lg border border-slate-800 shadow-lg">
      {/* Content type indicator with icon */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-slate-300">
          {type === "playlist" ? (
            <>
              <PlaySquare size={18} className="text-orange-600" />
              <span className="font-medium">Share this playlist</span>
            </>
          ) : (
            <>
              <Video size={18} className="text-orange-600" />
              <span className="font-medium">Share this video</span>
            </>
          )}
        </div>
        <Share2 size={18} className="text-orange-600" />
      </div>

      {/* First row of share options */}
      <div className="grid grid-cols-3 gap-3">
        {/* Twitter Share */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareMessage
          )}&url=${encodeURIComponent(shareURL)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-slate-900 text-white rounded-md flex items-center justify-center hover:bg-slate-800 border border-slate-700 transition-all group"
          aria-label="Share on Twitter"
        >
          <Twitter size={18} className="text-[#1DA1F2] group-hover:scale-110 transition-transform" />
          <span className="ml-2 text-sm font-medium">Twitter</span>
        </a>

        {/* WhatsApp Share */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            shareMessage + " " + shareURL
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-slate-900 text-white rounded-md flex items-center justify-center hover:bg-slate-800 border border-slate-700 transition-all group"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle size={18} className="text-[#25D366] group-hover:scale-110 transition-transform" />
          <span className="ml-2 text-sm font-medium">WhatsApp</span>
        </a>

        {/* LinkedIn Share */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareURL
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-slate-900 text-white rounded-md flex items-center justify-center hover:bg-slate-800 border border-slate-700 transition-all group"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} className="text-[#0A66C2] group-hover:scale-110 transition-transform" />
          <span className="ml-2 text-sm font-medium">LinkedIn</span>
        </a>
      </div>

      {/* Second row of share options */}
      <div className="grid grid-cols-2 gap-3">
        {/* Facebook Share */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareURL
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-slate-900 text-white rounded-md flex items-center justify-center hover:bg-slate-800 border border-slate-700 transition-all group"
          aria-label="Share on Facebook"
        >
          <Facebook size={18} className="text-[#1877F2] group-hover:scale-110 transition-transform" />
          <span className="ml-2 text-sm font-medium">Facebook</span>
        </a>

        {/* Email Share */}
        <a
          href={`mailto:?subject=${encodeURIComponent(
            shareMessage
          )}&body=${encodeURIComponent(
            `I thought you might like this ${type}: ${shareURL}`
          )}`}
          className="p-2.5 bg-slate-900 text-white rounded-md flex items-center justify-center hover:bg-slate-800 border border-slate-700 transition-all group"
          aria-label="Share via Email"
        >
          <Mail size={18} className="text-orange-600 group-hover:scale-110 transition-transform" />
          <span className="ml-2 text-sm font-medium">Email</span>
        </a>
      </div>

      {/* Copy Link */}
      <div className="mt-1 flex items-center group relative">
        <div className="flex-1 bg-slate-900 border-y border-l border-slate-700 rounded-l-md p-3 overflow-hidden text-sm text-slate-300 truncate">
          {shareURL}
        </div>
        <button
          onClick={handleCopy}
          className={`p-3 ${
            copied 
              ? "bg-orange-600 hover:bg-orange-700" 
              : "bg-slate-800 hover:bg-slate-700"
          } border-y border-r border-slate-700 rounded-r-md transition-colors duration-200`}
          aria-label="Copy link"
        >
          {copied ? (
            <Check size={18} className="text-white" />
          ) : (
            <Copy size={18} className="text-slate-300" />
          )}
        </button>
        
        {/* Tooltip */}
        <div 
          className={`absolute -top-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity duration-300 ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          Copied!
        </div>
      </div>
    </div>
  );
};

export default ShareCard;
