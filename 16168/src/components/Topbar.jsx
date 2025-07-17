import React, { useState } from "react";
import logo from "@/assets/images/TrendHub.png";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { RiLoginBoxLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/avatar.png";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut, IoMdLogIn } from "react-icons/io";
import { removeUser } from "@/redux/user/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { RouteProfile } from "@/helpers/RouteName";
import Swal from 'sweetalert2';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    });
    if (!result.isConfirmed) return;
    try {
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/log-out`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message);
      }

      dispatch(removeUser());
      navigate("/");
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center h-16 fixed w-full bg-white shadow-lg px-4 md:px-6 z-30 border-b">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="transform hover:scale-105 transition-duration-300">
            <img src={logo} alt="Logo" className="h-10 md:h-12 w-auto" />
          </Link>
        </div>

        {/* Search Box - Hidden on mobile, visible on larger screens */}
        <div className="hidden md:block md:w-[400px] lg:w-[500px]">
          <SearchBox />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-gray-900 p-1.5 rounded-lg hover:bg-gray-100"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiMenu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          {!user.isLoggedIn ? (
            <Button asChild className="rounded-full px-5 py-4 text-sm hover:scale-105 transition-transform duration-300">
              <Link to="/sign-in" className="flex items-center gap-2">
                <IoMdLogIn className="text-lg" />
                <span>Sign In</span>
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-9 w-9 ring-2 ring-violet-200 hover:ring-violet-300 transition-all duration-300">
                  <AvatarImage src={user?.user?.avatar || usericon} />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel className="font-medium">
                  <p className="text-sm">{user?.user?.name || "Guest"}</p>
                  <p className="text-xs text-gray-500">{user?.user?.email || "No email"}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="py-1.5">
                  <Link to={RouteProfile} className="flex items-center gap-2 text-sm">
                    <FaRegUser className="text-violet-600" /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-sm py-1.5">
                  <IoIosLogOut className="text-red-500" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleMobileMenu}>
          <div 
            className="fixed right-0 top-16 w-64 bg-white h-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4">
              <SearchBox />
            </div>
            <div className="border-t">
              {!user.isLoggedIn ? (
                <Link 
                  to="/sign-in" 
                  className="flex items-center gap-3 p-4 hover:bg-violet-50 transition-colors text-base"
                  onClick={toggleMobileMenu}
                >
                  <IoMdLogIn className="text-lg text-violet-600" />
                  <span>Sign In</span>
                </Link>
              ) : (
                <>
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.user?.avatar || usericon} />
                      </Avatar>
                      <div>
                        <p className="font-medium text-base">{user?.user?.name || "Guest"}</p>
                        <p className="text-gray-500 text-sm">{user?.user?.email || "No email"}</p>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={RouteProfile} 
                    className="flex items-center gap-3 p-4 hover:bg-violet-50 transition-colors text-base"
                    onClick={toggleMobileMenu}
                  >
                    <FaRegUser className="text-violet-600" /> Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="flex items-center gap-3 p-4 w-full text-left hover:bg-violet-50 transition-colors text-base text-red-500"
                  >
                    <IoIosLogOut /> Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
