import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 py-6 bg-white mt-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-10 max-w-7xl mx-auto">
        {/* Left: Logo + Copy */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Image
            className="hidden md:block"
            src={assets.logo}
            alt="E-Shop Logo"
            width={60} // 🔽 reduced size
            height={20}
            priority
          />
          <div className="hidden md:block h-7 w-px bg-gray-400/50" />
          <p className="text-xs md:text-sm text-gray-500 text-center md:text-left">
            © 2025 anuj.dev. All rights reserved.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-3">
          <a href="#" aria-label="Facebook">
            <Image
              src={assets.facebook_icon}
              alt="Facebook Icon"
              width={24}
              height={24}
              className="hover:opacity-80 transition"
            />
          </a>
          <a href="#" aria-label="Twitter">
            <Image
              src={assets.twitter_icon}
              alt="Twitter Icon"
              width={24}
              height={24}
              className="hover:opacity-80 transition"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <Image
              src={assets.instagram_icon}
              alt="Instagram Icon"
              width={24}
              height={24}
              className="hover:opacity-80 transition"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
