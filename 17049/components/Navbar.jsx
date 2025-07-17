"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  assets,
  BagIcon,
  BoxIcon,
  CartIcon,
  HomeIcon,
} from "@/assets/assets";

const Image = dynamic(() => import("next/image"), { ssr: false });

const Navbar = () => {
  const { isSeller } = useAppContext();
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const navigate = (path) => {
    if (typeof window !== "undefined") {
      router.push(path);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 bg-white z-50">
      {/* Logo + E-Shop Text */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <Image
          priority
          className="w-10 h-10"
          src={assets.logo}
          alt="logo"
        />
        <h1 className="text-xl font-bold">
          <span className="text-blue-600">E</span>
          <span className="text-green-600">-Shop</span>
        </h1>
      </div>

      {/* Desktop Nav Links */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/" className="hover:text-gray-900 transition">Contact</Link>
        {isSeller && (
          <button
            onClick={() => navigate("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full hover:bg-gray-100 transition"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Right Side */}
      <ul className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/cart")} className="hover:text-gray-900 transition">
              Cart
            </button>
            <button onClick={() => navigate("/my-orders")} className="hover:text-gray-900 transition">
              My Orders
            </button>
            <button
              onClick={logout}
              className="hover:text-gray-900 transition text-sm border px-3 py-1 rounded hover:bg-red-100 text-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 hover:text-gray-900 transition"
            >
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          </div>
        )}
      </ul>

      {/* Mobile Menu */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button
            onClick={() => navigate("/seller")}
            className="text-xs border px-4 py-1.5 rounded-full"
          >
            Seller Dashboard
          </button>
        )}
        {isLoggedIn ? (
          <div className="flex flex-col gap-1 text-sm">
            <button onClick={() => navigate("/")} className="flex items-center gap-2">
              <HomeIcon /> Home
            </button>
            <button onClick={() => navigate("/all-products")} className="flex items-center gap-2">
              <BoxIcon /> Products
            </button>
            <button onClick={() => navigate("/cart")} className="flex items-center gap-2">
              <CartIcon /> Cart
            </button>
            <button onClick={() => navigate("/my-orders")} className="flex items-center gap-2">
              <BagIcon /> Orders
            </button>
            <button onClick={logout} className="text-left text-red-500">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            <button onClick={() => navigate("/login")} className="flex items-center gap-2">
              <Image src={assets.user_icon} alt="user icon" />
              Account
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
