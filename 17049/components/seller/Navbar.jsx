"use client";

import React from "react";
import { assets } from "../../assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { router } = useAppContext();
  const { logout, isLoggedIn, token } = useAuth();

  React.useEffect(() => {
    if (!token || !isLoggedIn) {
      router.push("/login");
    }
  }, [token, isLoggedIn, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b bg-white shadow-sm sticky top-0 z-50">
      {/* Logo + E-Shop Text */}
      <div
        onClick={() => router.push("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <Image
          className="w-10 h-10"
          src={assets.logo}
          alt="E-Shop Logo"
        />
        <h1 className="text-xl font-bold">
          <span className="text-blue-600">E</span>
          <span className="text-green-600">-Shop</span>
        </h1>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
